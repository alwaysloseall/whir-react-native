import React, { useState, useEffect } from 'react'
import {
  StatusBar,
  BackHandler,
  ToastAndroid,
  Linking,
  Platform,
} from 'react-native'
import {
  NavigationContainer,
  NavigationContainerProps,
} from '@react-navigation/native'
import { Provider as AntdProvider } from '@ant-design/react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { navigationRef } from '../RootNavigation'

interface BasicNavigationContainerProps extends NavigationContainerProps {
  preventBackPressDefault?: boolean
  onExitApp?: () => void | Promise<void>
}

const PERSISTENCE_KEY = 'NAVIGATION_STATE'

export default function BasicNavigationContainer({
  preventBackPressDefault,
  children,
  onExitApp,
  ...props
}: BasicNavigationContainerProps) {
  const [isMainScreen, setIsMainScreen] = useState(false)
  const [pressBackTime, setPressBackTime] = useState(0)
  const [isReady, setIsReady] = React.useState(__DEV__ ? false : true)
  const [initialState, setInitialState] = React.useState()

  useEffect(() => {
    if (preventBackPressDefault) return

    const onBackPress = () => {
      /** 被其他界面劫持 */
      // @ts-ignore
      if (global.backPressSetting) {
        return true
      }

      if (!isMainScreen) {
        return false
      }

      const currentTime = Date.now()
      if (currentTime - pressBackTime < 2000) {
        const ExitApp = onExitApp?.()
        // @ts-ignore
        if (ExitApp?.then) {
          ExitApp?.then(BackHandler.exitApp)
        } else {
          BackHandler.exitApp()
        }
        return true
      } else {
        ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT)
        setPressBackTime(currentTime)
        return true
      }
    }
    BackHandler.addEventListener('hardwareBackPress', onBackPress)
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress)
  }, [isMainScreen, pressBackTime, preventBackPressDefault])

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL()

        if (Platform.OS !== 'web' && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY)
          const state = savedStateString
            ? JSON.parse(savedStateString)
            : undefined

          if (state !== undefined) {
            setInitialState(state)
          }
        }
      } finally {
        setIsReady(true)
      }
    }

    if (!isReady) {
      restoreState()
    }
  }, [isReady])

  if (!isReady) {
    return null
  }

  return (
    // @ts-ignore
    <AntdProvider>
      <StatusBar
        hidden={false}
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <NavigationContainer
        //@ts-ignore
        ref={navigationRef}
        initialState={initialState}
        onStateChange={state => {
          const { routes } = state
          if (routes.length === 1) {
            setIsMainScreen(true)
          } else {
            setIsMainScreen(false)
          }
          AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
        }}
        {...props}>
        {children}
      </NavigationContainer>
    </AntdProvider>
  )
}

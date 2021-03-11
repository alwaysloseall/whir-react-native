import { BackHandler } from 'react-native'

let backPressCallback

export const addBackPressListener = (callback, intercept = true) => {
  if (intercept) {
    // @ts-ignore
    global.backPressSetting = true
  }
  backPressCallback = callback
  BackHandler.addEventListener('hardwareBackPress', callback)
}

export const removeBackPressListener = () => {
  // @ts-ignore
  global.backPressSetting = false
  BackHandler.removeEventListener('hardwareBackPress', backPressCallback)
}

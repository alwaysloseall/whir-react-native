import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { fixStyleSheet } from '@whir-react-native/utils'
import { useNavigation } from '@react-navigation/native'

export default props => {
  const navigation = useNavigation()

  const backHandle = () => {
    navigation.goBack()
  }

  const defaultBackBtn = <Image source={require('./back.png')} />
  const {
    style,
    logo,
    backBtn = defaultBackBtn,
    title,
    headerRight,
    onBack = backHandle,
    rightPressHandle,
  } = props

  return (
    <>
      <View style={[styles.container, style]}>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => {
              onBack && onBack()
            }}>
            {typeof backBtn === 'string' ? (
              <Text style={styles.lrText}>{backBtn}</Text>
            ) : (
              backBtn
            )}
          </TouchableOpacity>
          <View style={styles.title}>
            {typeof title === 'string' ? (
              <Text style={[styles.titleText, logo && styles.logoTitle]}>
                {title}
              </Text>
            ) : (
              title
            )}
          </View>
          <View style={styles.headerRight}>
            {typeof headerRight === 'string' ? (
              <Text
                style={styles.lrText}
                onPress={() => {
                  rightPressHandle && rightPressHandle()
                }}>
                {headerRight}
              </Text>
            ) : (
              headerRight
            )}
          </View>
        </View>
      </View>
    </>
  )
}

const styles = fixStyleSheet({
  container: {
    height: 130,
    paddingTop: 24,
    backgroundColor: '#0092ef',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  logo: {
    position: 'absolute',
    left: 20,
    zIndex: 999,
  },
  backBtn: {
    position: 'absolute',
    left: 0,
    padding: 24,
    zIndex: 999,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
  titleText: {
    textAlign: 'center',
    flex: 1,
    fontSize: 32,
    color: '#fff',
  },
  logoTitle: {
    // fontSize: 40,
    paddingLeft: 24,
  },
  headerRight: {
    position: 'absolute',
    right: 5,
    zIndex: 999,
    alignItems: 'center',
  },
  lrText: {
    fontSize: 32,
    color: '#fff',
    padding: 24,
    textAlign: 'center',
  },
})

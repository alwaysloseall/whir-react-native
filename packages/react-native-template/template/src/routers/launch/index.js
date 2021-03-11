import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { fixStyleSheet } from '@whir-react-native/utils'

export default ({ navigation }) => {
  useEffect(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Signin' }],
    })
  }, [])

  return <View></View>
}

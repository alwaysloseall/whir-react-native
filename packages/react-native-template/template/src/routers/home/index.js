import React from 'react'
import { Text, View } from 'react-native'
import { TouchFix } from '@whir-react-native/components'

export default ({ navigation }) => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    }}>
    <Text style={{ width: 48 }}>Home</Text>
    <TouchFix onPress={() => navigation.navigate('Blank')}>
      <Text style={{ width: 100 }}>Go Blank Page</Text>
    </TouchFix>
  </View>
)

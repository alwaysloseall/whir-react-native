import AsyncStorage from '@react-native-community/async-storage'

export const goback = (navigation, name) => {
  AsyncStorage.getItem('NAVIGATION_STATE').then(res => {
    let key = JSON.parse(res).routes.find(item => item.name === name).key
    navigation.navigate({ key })
  })
}

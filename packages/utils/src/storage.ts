import AsyncStorage from '@react-native-community/async-storage'

function clear() {
  return AsyncStorage.clear()
}

function get(key) {
  return AsyncStorage.getItem(key)
}

function set(key, value) {
  return AsyncStorage.setItem(key, value)
}

function remove(key) {
  return AsyncStorage.removeItem(key)
}

function multiGet(keys) {
  return AsyncStorage.multiGet(keys).then(stores => {
    const data = {}
    stores.forEach((result, i, store) => {
      data[store[i][0]] = store[i][1]
    })
    return data
  })
}

function multiRemove(...keys) {
  return AsyncStorage.multiRemove([...keys])
}

const Storage = {
  clear,
  get,
  set,
  remove,
  multiGet,
  multiRemove,
}

export default Storage

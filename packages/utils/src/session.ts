import Storage from './storage'

const USER_INFO = 'USER_INFO'

const setUser = user => {
  return Storage.set(USER_INFO, JSON.stringify(user))
}
const getUser = async () => {
  const userInfo = await Storage.get(USER_INFO)
  return JSON.parse(userInfo || '{}')
}
const getToken = async () => {
  const user = await getUser()
  if (user) return user.token
  else return ''
}
const removeUser = () => {
  Storage.remove(USER_INFO)
  return
}

export { setUser, getUser, getToken, removeUser }

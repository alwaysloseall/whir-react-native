import { Toast } from '@ant-design/react-native'
import Logger from '../Logger'

export const errorHandler = (err, dispatch) => {
  console.log(err)
  err.preventDefault()
  if (err.message) {
    Toast.fail(err.message)
    Logger.error(err)
  }
  // console.log('服务端鉴权失败，清理session')
  // dispatch({
  //   type: 'session/logout',
  // })
  // RootNavigation.reset({
  //   index: 0,
  //   routes: [{ name: 'login' }],
  // })
}

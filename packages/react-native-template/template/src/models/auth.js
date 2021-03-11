import modelExtend from 'dva-model-extend'
import { Portal, Toast } from '@ant-design/react-native'

// import * as api from "../services/auth";
import { basicModel, setUser, removeUser, getUser, toast } from '@whir-react-native/utils'

const delay = (ms, response = {}) =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve(response)
    }, ms)
  )

export default modelExtend(basicModel, {
  namespace: 'auth',
  state: {
    current: {},
  },
  effects: {
    *signin({ payload }, { call, put, select, take }) {
      const key = Toast.loading('正在登录…')
      yield delay(2000)
      Portal.remove(key)
    },
  },
})

// @ts-nocheck
import React from 'react'
import { create } from 'dva-core'
import createLoading from 'dva-loading'
import { Provider } from 'react-redux'
import { errorHandler } from './api'
import { Storage } from './storage'
import './ErrorUtils'

const DVA_STORAGE_STATE = 'DVA_STORAGE_STATE'

let isInit = false

export const createDvaApp = ({
  models,
  App,
  onError,
  saveState = true,
}: {
  models: Array<any>
  App: () => JSX.Element
  onError?: (err, dispatch) => void
  saveState?: boolean
}) => {
  // APP初始化的时候会把所有模型的 initState 收集起来，以便于注销账号的时候重置 store
  let initialState = {}

  // 创建 dva
  const app = create({
    initialState: {},
    onError: onError || errorHandler,
    onStateChange:
      saveState &&
      (state => {
        if (__DEV__ && isInit) {
          Storage.set(DVA_STORAGE_STATE, JSON.stringify(state))
        }
      }),
    onReducer:
      saveState &&
      (reducer => {
        return (state, action) => {
          const newState = reducer(state, action)
          if (action.type.indexOf(DVA_STORAGE_STATE) !== -1 && __DEV__) {
            isInit = true
            if (action.payload.state) {
              return { ...state, ...action.payload.state }
            }
          }
          return newState
        }
      }),
  })

  // 加载插件：effect loading
  app.use(createLoading())

  // 加载models
  models.forEach(m => {
    initialState[m.namespace] = m.state
    app.model(m)
  })

  // 启动 dva
  app.start()

  if (__DEV__ && saveState) {
    Storage.get(DVA_STORAGE_STATE).then(res => {
      const state = JSON.parse(res)
      app._store.dispatch({
        type: DVA_STORAGE_STATE,
        payload: {
          state,
        },
      })
    })
  }

  // 获取 dva 最终产生的 redux store
  const store = app._store

  // @ts-ignore
  global.g_app = app

  return _ => (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

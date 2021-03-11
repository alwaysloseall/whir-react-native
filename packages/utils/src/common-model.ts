import modelExtend from 'dva-model-extend'

export interface ListPageStore<T> {
  list?: Array<T>
  pagination?: any
}

const UPDATESTATE = 'updateState'
const LISTUPDATE = 'listUpdate'

const basicModel = {
  reducers: {
    [UPDATESTATE](state: any, { payload }: any) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}

const listPageModel = modelExtend(basicModel, {
  state: {
    list: [],
    pagination: {
      current: 1,
      total: 0,
      pageSize: 10,
    },
  },

  reducers: {
    [LISTUPDATE](state, { payload }) {
      const { list, pagination } = payload
      return {
        ...state,
        list: list || [],
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      }
    },
  },
})

const listEffect = api =>
  function* ({ payload }, { call, put }) {
    yield put({
      type: LISTUPDATE,
      payload: {
        pagination: {
          current: Number(payload.pageNum),
          pageSize: Number(payload.pageSize),
        },
      },
    })
    const { data } = yield call(api, payload)
    yield put({
      type: LISTUPDATE,
      payload: {
        list: data?.records,
        pagination: {
          total: data?.total || 0,
        },
      },
    })
  }

export { basicModel, UPDATESTATE, listPageModel, LISTUPDATE, listEffect }

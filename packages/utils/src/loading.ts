// @ts-ignore
import { Portal, Toast } from '@ant-design/react-native'

let loadingCount = 0
let timer
let toastKey

export const showLoading = title => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  } else if (loadingCount === 0) {
    toastKey = Toast.loading(title, 0, () => {}, true)
  }
  loadingCount++
}

export const hideLoading = () => {
  loadingCount--
  if (loadingCount === 0) {
    timer = setTimeout(() => {
      timer = null
      Portal.remove(toastKey)
    }, 100)
  }
}

import * as React from 'react'

export const navigationRef = React.createRef()

export function navigate(name, params) {
  // @ts-ignore
  navigationRef.current?.navigate(name, params)
}

export function reset(options) {
  // @ts-ignore
  navigationRef.current?.reset(options)
}

export default {
  navigationRef,
  navigate,
  reset,
}

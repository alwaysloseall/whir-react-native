export const delay = (ms: number, response = {}) =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve(response)
    }, ms)
  )

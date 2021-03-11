import Logger from './Logger'

if (!__DEV__) {
  global.ErrorUtils.setGlobalHandler(async e => {
    const { message, name, fileName, lineNumber, stack } = e
    Logger.error(e)
    throw e
  })
}

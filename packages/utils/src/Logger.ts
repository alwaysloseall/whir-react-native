import RNFS from 'react-native-fs'
import moment from 'moment'

const { ExternalCachesDirectoryPath } = RNFS

export const logsDir = ExternalCachesDirectoryPath + `/logs`

RNFS.exists(logsDir).then(res => {
  if (!res) {
    RNFS.mkdir(logsDir)
  }
})

export const log = async text => {
  text = `${moment().format('YYYY-MM-DD HH:mm:ss')}：\n${text}\n\n`
  let filePath = logsDir + `/${moment().format('YYYY-MM-DD')}.log`
  const isExists = await RNFS.exists(filePath)
  if (!isExists) {
    await RNFS.writeFile(filePath, text)
  } else {
    const content = await RNFS.readFile(filePath)
    await RNFS.writeFile(filePath, text + content)
    // await RNFS.appendFile(filePath, text)
  }
}

export const error = async error => {
  const { message, name, url, fileName, lineNumber, stack } = error
  await log(`${name}：${message}${url ? '\n url：' + url : ''}`)
}

export default {
  log,
  error,
}

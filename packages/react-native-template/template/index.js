import { AppRegistry } from 'react-native'
import { createDvaApp } from '@whir-react-native/utils'
import appConfig from './src/index'
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => createDvaApp(appConfig))

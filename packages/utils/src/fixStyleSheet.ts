import { StyleSheet, Dimensions, PixelRatio } from 'react-native'

// const fixRule = ["width", "height", "fontSize", "margin", "marginTop", "marginBottom", "marginLeft", "marginRight", "padding", "paddingTop"];
const rules = ['opacity', 'flex']
const fixRule = (key: string, value: any) => {
  return typeof value === 'number' && !rules.includes(key)
}
const setPX = (value: number, baseWidth: number = 750) => {
  const { width } = Dimensions.get('window')
  return (value * width) / baseWidth
}

interface objectMap {
  [key: string]: any
}

function fixStyleSheet<
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>
>(styles: T | StyleSheet.NamedStyles<T>, options?: { baseWidth?: number }): T {
  let newStyles: any = {}
  Object.keys(styles).forEach(key => {
    let newSubStyle: any = {}
    let value = (styles as objectMap)[key]
    Object.keys(value).forEach(subKey => {
      if (fixRule(subKey, value[subKey])) {
        newSubStyle[subKey] = setPX(value[subKey], options?.baseWidth)
      } else if (typeof value[subKey] === 'object') {
        if (value[subKey]['pixelRatio']) {
          newSubStyle[subKey] = value[subKey]['value'] / PixelRatio.get()
        } else {
          newSubStyle[subKey] = value[subKey]['value']
        }
      } else {
        newSubStyle[subKey] = value[subKey]
      }
    })
    newStyles[key] = newSubStyle
  })
  return StyleSheet.create(newStyles)
}

export { setPX, fixStyleSheet }

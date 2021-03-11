import React from 'react'
import {
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  View,
} from 'react-native'

interface PropsType extends TouchableWithoutFeedbackProps {
  children?: any
  onMove: () => void
  onPress?: (e: any) => void
}

let locationX
let locationY

export default ({
  onPress = () => {},
  onMove = () => {},
  children,
  ...props
}: PropsType) => {
  const [opacity, setOpacity] = React.useState(1)
  const onPressInHandler = e => {
    locationX = e.nativeEvent.locationX
    locationY = e.nativeEvent.locationY
    setOpacity(0.3)
  }

  const onPressHandler = e => {
    const x = e.nativeEvent.locationX
    const y = e.nativeEvent.locationY
    setOpacity(1)
    locationX !== x && onMove()
    locationX === x && locationY === y && onPress(e)
  }

  return (
    <TouchableWithoutFeedback
      {...props}
      delayPressIn={0}
      delayPressOut={0}
      onPressIn={onPressInHandler}
      onPressOut={onPressHandler}>
      <View style={{ opacity }}>{children}</View>
    </TouchableWithoutFeedback>
  )
}

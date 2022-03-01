import React, { useEffect } from 'react'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { Toggle } from '../Toggle'
// import { styles } from './styles'

interface WidgetProps {
  width: number
  height: number
  refresh?: boolean
}

export const Widget: React.FC<WidgetProps> = ({ height, width, refresh }) => {
  const progress = useSharedValue(0)
  const style = useAnimatedStyle(() => ({
    opacity: progress.value,
    width: interpolate(progress.value, [0, 1], [width - 5, width]),
    height: interpolate(progress.value, [0, 1], [height - 5, height]),
  }))
  useEffect(() => {
    progress.value = progress.value ? withTiming(0) : withTiming(1)
  }, [refresh])

  return (
    <Animated.View
      style={[
        {
          backgroundColor: 'white',
          borderRadius: 17,
          height,
          width,
          shadowOpacity: 0.01,
          shadowOffset: {
            width: 1,
            height: 0,
          },
          padding: 20,
          alignItems: 'flex-end',
        },
        style,
      ]}>
      <Toggle></Toggle>
    </Animated.View>
  )
}

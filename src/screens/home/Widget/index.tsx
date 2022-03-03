import React, { useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { ReText } from 'react-native-redash'
import { SvgProps } from 'react-native-svg'

import { Toggle } from '../Toggle'
// import { styles } from './styles'

export interface WidgetProps {
  width: number
  height: number
  refresh?: boolean
  Illustration?: React.FC<SvgProps>
  number?: number
  backgroundColorImage?: string
}

export const Widget: React.FC<WidgetProps> = ({
  height,
  width,
  refresh,
  Illustration,
  number = 10,
  backgroundColorImage = '#A9BFFF',
}) => {
  const progress = useSharedValue(0)
  const text = useDerivedValue(() => {
    return `${Math.floor(progress.value * number)}%`
  })
  const style = useAnimatedStyle(() => ({
    opacity: progress.value,
    width: interpolate(progress.value, [0, 1], [width - 5, width]),
    height: interpolate(progress.value, [0, 1], [height - 5, height]),
  }))
  const imageStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      { scaleX: interpolate(progress.value, [0, 1], [0.6, 1]) },
      { scaleY: interpolate(progress.value, [0, 1], [0.6, 1]) },
    ],
  }))
  useEffect(() => {
    progress.value = progress.value
      ? withTiming(0, { duration: 1500 })
      : withTiming(1, { duration: 1500 })
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
          padding: 15,
          justifyContent: 'space-between',
        },
        style,
      ]}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 50,
          justifyContent: 'space-between',
        }}>
        {Illustration && (
          <Animated.View
            style={[
              {
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
                width: 50,
                borderRadius: 30,
                backgroundColor: backgroundColorImage,
              },
              imageStyle,
            ]}>
            <Illustration></Illustration>
          </Animated.View>
        )}
        <Toggle></Toggle>
      </View>
      <ReText
        style={{ fontSize: 20, color: '#072F50', fontWeight: '200' }}
        text={text}></ReText>
    </Animated.View>
  )
}

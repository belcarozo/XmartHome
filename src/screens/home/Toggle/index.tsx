import React, { useState } from 'react'
import { Pressable, View } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

interface ToggleProps {}

export const Toggle: React.FC<ToggleProps> = () => {
  const [toggle, setToggle] = useState(0)
  const offset = useSharedValue(0)
  const size = useSharedValue(13)
  const style = useAnimatedStyle(() => {
    return {
      width: size.value,
      height: size.value,
      transform: [{ translateX: offset.value }],
      backgroundColor: interpolateColor(
        offset.value,
        [0, 13],
        ['#DEEDF8', 'white'],
      ),
    }
  })
  const backgroundStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        offset.value,
        [0, 13],
        ['#94BDD3', '#32958C'],
      ),
    }
  })
  return (
    <Pressable
      onPress={() => {
        setToggle(Math.abs(toggle - 1))
        offset.value = withTiming(toggle ? 0 : 13)
        size.value = withTiming(toggle ? 13 : 14)
      }}>
      <Animated.View
        style={[
          {
            borderRadius: 17,
            width: 35,
            height: 21,
            shadowOpacity: 0.01,
            justifyContent: 'center',
            paddingHorizontal: 4,
          },
          backgroundStyle,
        ]}>
        <Animated.View
          style={[
            {
              borderRadius: 10,
              width: 13,
              height: 13,
              shadowOpacity: 0.3,
              shadowOffset: { width: 1, height: 0 },
            },
            style,
          ]}></Animated.View>
      </Animated.View>
    </Pressable>
  )
}

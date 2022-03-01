import React from 'react'
import { Pressable } from 'react-native'
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

interface ToggleProps {}

export const Toggle: React.FC<ToggleProps> = () => {
  const offset = useSharedValue(0)
  const size = useSharedValue(13)
  const style = useAnimatedStyle(() => {
    return {
      width: size.value,
      height: size.value,
      transform: [{ translateX: interpolate(offset.value, [0, 1], [0, 13]) }],
    }
  })
  const backgroundStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        offset.value,
        [0, 1],
        ['#AED0D5', '#7EAE9F'],
      ),
    }
  })
  return (
    <Pressable
      onPress={() => {
        offset.value = withTiming(offset.value ? 0 : 1)
        size.value = withTiming(offset.value ? 13 : 14)
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
              shadowOffset: {
                width: 1,
                height: 0,
              },
            },
            style,
          ]}></Animated.View>
      </Animated.View>
    </Pressable>
  )
}

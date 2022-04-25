import React, { useState } from 'react'
import { Pressable } from 'react-native'
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { mix } from 'react-native-redash'
import Svg, { Path } from 'react-native-svg'

const AnimatedPath = Animated.createAnimatedComponent(Path)

interface PlusToCheckProps {}

export const PlusToCheck: React.FC<PlusToCheckProps> = () => {
  const checked = useSharedValue(1)
  const [stroke, setStroke] = useState<string>('#92A4D8')
  const animatedProps = useAnimatedProps(() => {
    const path = `
    M${mix(checked.value, 13, 1)} ${mix(checked.value, 2, 6.90909)}L${mix(
      checked.value,
      4.75,
      13,
    )} ${mix(checked.value, 11, 6.90909)}M${mix(
      checked.value,
      4.75,
      6.90909,
    )} ${mix(checked.value, 11, 1)}L${mix(checked.value, 1, 6.90909)} ${mix(
      checked.value,
      6.90909,
      12.81818,
    )}
    `
    return {
      d: path,
    }
  })
  return (
    <Pressable
      style={{
        backgroundColor: 'white',
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: stroke,
        borderWidth: 2,
        padding: 10,
        borderRadius: 2,
      }}
      onPress={() => {
        setStroke(checked.value ? '#2E4EFF' : '#92A4D8')
        checked.value = withTiming(checked.value ? 0 : 1)
      }}>
      <Svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <AnimatedPath
          animatedProps={animatedProps}
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </Pressable>
  )
}

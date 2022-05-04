import React, { useState } from 'react'
import { Pressable } from 'react-native'
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { mix } from 'react-native-redash'
import Svg, { Path } from 'react-native-svg'
import X from '../../../assets/icons/plus.svg'

// />
// M6 14L18 2M8 2L18 2M6 14L18 2L18 12

//XL
// M2 14L14 2M2 2L8 8L14 14M18 2 L18 14L24 14

const AnimatedPath = Animated.createAnimatedComponent(Path)

interface XLProps {}

export const XL: React.FC<XLProps> = () => {
  const checked = useSharedValue(1)
  const [stroke, setStroke] = useState<string>('#92A4D8')
  const animatedProps = useAnimatedProps(() => {
    const path = `
    M${mix(checked.value, 8, 2)} ${mix(checked.value, 14, 14)}L${mix(
      checked.value,
      20,
      14,
    )} ${mix(checked.value, 2, 2)}M${mix(checked.value, 10, 2)} ${mix(
      checked.value,
      2,
      2,
    )}L${mix(checked.value, 20, 14)} ${mix(checked.value, 2, 14)}M${mix(
      checked.value,
      20,
      18,
    )} ${mix(checked.value, 2, 2)}L${mix(checked.value, 20, 18)} ${mix(
      checked.value,
      11,
      14,
    )}L${mix(checked.value, 20, 24)} ${mix(checked.value, 11, 14)}
    `
    return {
      d: path,
    }
  })
  return (
    <Pressable
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
      }}
      onPress={() => {
        setStroke(checked.value ? '#ff197b' : '#92A4D8')
        checked.value = withTiming(checked.value ? 0 : 1)
      }}>
      {/* <X /> */}
      <Svg width="320" height="120" viewBox="0 0 28 16" fill="none">
        <AnimatedPath
          animatedProps={animatedProps}
          stroke={stroke}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </Pressable>
  )
}

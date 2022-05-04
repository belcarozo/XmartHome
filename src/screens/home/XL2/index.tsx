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
// M8 14L20 2M10 2L20 2M8 14L20 2L20 12

//XL
// M2 14L14 2M2 2L8 8L14 14M18 2 L18 14L24 14

const AnimatedPath = Animated.createAnimatedComponent(Path)

interface XL2Props {}

export const XL2: React.FC<XL2Props> = () => {
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
      2,
      14,
    )}L${mix(checked.value, 20, 24)} ${mix(checked.value, 12, 14)}
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

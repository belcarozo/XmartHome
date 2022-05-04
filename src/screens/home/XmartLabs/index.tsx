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

const AnimatedPath = Animated.createAnimatedComponent(Path)

interface XmartLabsProps {}

export const XmartLabs: React.FC<XmartLabsProps> = () => {
  const checked = useSharedValue(1)
  const [stroke, setStroke] = useState<string>('#92A4D8')
  const animatedProps = useAnimatedProps(() => {
    const path = `
    M${mix(checked.value, 2, 2)} ${mix(checked.value, 14, 14)}L${mix(
      checked.value,
      14,
      14,
    )} ${mix(checked.value, 2, 2)}M${mix(checked.value, 4, 2)} ${mix(
      checked.value,
      2,
      2,
    )}L${mix(checked.value, 14, 8)} ${mix(checked.value, 2, 8)}L${mix(
      checked.value,
      14,
      14,
    )} ${mix(checked.value, 11, 14)}
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
      <X />
      {/* <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <AnimatedPath
          animatedProps={animatedProps}
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg> */}
    </Pressable>
  )
}

import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler'
import { SharedValue } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/reanimatedWrapper'
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { ReText, snapPoint } from 'react-native-redash'
import { SvgProps } from 'react-native-svg'
import { PlusToCheck } from '../PlusToCheck'

import { Toggle } from '../Toggle'
// import { styles } from './styles'

export interface WidgetProps {
  width: number
  height?: number
  refresh?: boolean
  Illustration?: React.FC<SvgProps>
  number?: number
  backgroundColorImage?: string
  onGestureEvent?: any
  index?: number
  activeCard?: any
  offsets?: { y: SharedValue<number> }[]
}

export const Widget: React.FC<WidgetProps> = ({
  index = -1,
  height = 100,
  width,
  refresh,
  Illustration,
  number = 10,
  backgroundColorImage = '#A9BFFF',
  activeCard,
  offsets,
}) => {
  const prevPoint = useSharedValue(offsets![index].y.value)
  const actualPoint = useSharedValue(offsets![index].y.value)
  const progress = useSharedValue(0)
  const active = useSharedValue(false)
  const totalHeight = height + 20
  type Offset = {
    x: number
    y: number
  }
  const x = useSharedValue(0)
  const y = useSharedValue(0)
  const snapPoints = offsets?.map(item => item.y.value)
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    Offset
  >({
    onStart: (_, ctx) => {
      activeCard.value = index
      active.value = true
      ctx.x = x.value
      ctx.y = y.value
      prevPoint.value = offsets![index].y.value
      actualPoint.value = offsets![index].y.value
    },
    onActive: ({ translationX, translationY, velocityX }, ctx) => {
      x.value = ctx.x + translationX
      y.value = ctx.y + translationY

      actualPoint.value = snapPoint(
        y.value + offsets![index].y.value,
        velocityX,
        snapPoints!,
      )
      //sospecho que el problema es que estoy tratando de comparar
      //cosas que aun no estan en el array
      //como puedo solucionar esto?

      // if (actualPoint.value !== prevPoint.value) {
      //   const i = offsets?.findIndex(item => item.y.value === actualPoint.value)
      //   console.log(i, actualPoint.value, prevPoint.value, offsets)
      //   if (i !== undefined && i !== -1) {
      //     offsets![i].y.value = prevPoint.value
      //     prevPoint.value = actualPoint.value
      //   }
      // }
    },
    onEnd: ({ velocityX }) => {
      activeCard.value = -1
      active.value = false
      x.value = withSpring(0)

      // offsets![index].y.value = withSpring(
      //   snapPoint(y.value + offsets![index].y.value, velocityX, snapPoints!),
      // )
      offsets![index].y.value = withSpring(actualPoint.value)
      y.value = withSpring(0)
      // prevPoint.value = offsets![index].y.value
      // actualPoint.value = offsets![index].y.value
    },
  })
  const text = useDerivedValue(() => {
    return `${Math.floor(progress.value * number)}%`
  })
  const style = useAnimatedStyle(() => {
    if (active.value) {
      // console.log(
      //   `la card ${index} tiene ${y.value} de valor de y, ${
      //     offsets![index].y.value
      //   } de offset`,
      // )
    }
    return {
      opacity: progress.value,
      shadowOffset: { height: withTiming(active.value ? 6 : 2), width: 0 },
      width: interpolate(progress.value, [0, 1], [width - 5, width]),
      height: interpolate(progress.value, [0, 1], [height - 5, height]),
      zIndex: activeCard.value === index ? 100 : 1,
      position: 'absolute',
      top: 0,
      left: 0,
      transform: [
        { translateX: x.value },
        { translateY: y.value + offsets![index].y.value },
        { scaleX: withTiming(active.value ? 1.02 : 1) },
        { scaleY: withTiming(active.value ? 1.02 : 1) },
      ],
    }
  })
  const checked = useSharedValue(0)
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
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View
        style={[
          {
            zIndex: index === 0 ? 101 : 1,
            marginHorizontal: 20,
            backgroundColor: 'white',
            borderRadius: 17,
            height,
            width,
            shadowOpacity: 0.1,
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
                  width: 50,
                  borderRadius: 30,
                  backgroundColor: backgroundColorImage,
                },
                imageStyle,
              ]}>
              <Illustration />
            </Animated.View>
          )}
          <PlusToCheck />
          <Toggle />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <ReText
            style={{
              fontSize: 20,
              color: '#072F50',
              fontWeight: '200',
            }}
            text={text}></ReText>
        </View>
      </Animated.View>
    </PanGestureHandler>
  )
}

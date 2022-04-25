import React, { useEffect, useState } from 'react'
import {
  Button,
  StatusBar,
  Text,
  useWindowDimensions,
  View,
} from 'react-native'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import Thermometer from '../../assets/icons/learn.svg'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'
import { Widget, WidgetProps } from './Widget'
import { DragToSort } from './DragToSort'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler'
import { clamp } from 'react-native-redash'

interface HomeProps {
  //props
}

export const Home: React.FC<HomeProps> = ({}) => {
  const { width, height } = useWindowDimensions()
  // const widgetSize = width / 2 - 30
  const widgetSize = width - 40
  const activeCard = useSharedValue(-1)
  const totalHeight = 120
  const [refresh, toggleRefresh] = useState(false)
  const data: WidgetProps[] = [
    {
      width: widgetSize,
      refresh,
      Illustration: Thermometer,
      number: 26,
    },
    {
      width: widgetSize,
      refresh,
      Illustration: Thermometer,
      number: 97,
      backgroundColorImage: 'lavender',
    },
    {
      width: widgetSize,
      refresh,
      Illustration: Thermometer,
      number: 55,
      backgroundColorImage: '#FEE2FA',
    },
    {
      width: widgetSize,
      refresh,
      Illustration: Thermometer,
      number: 72,
      backgroundColorImage: '#C5E2DB',
    },
  ]
  const offsets = data.map((_, index) => ({
    y: useSharedValue(totalHeight * index),
  }))

  const renderItem = ({
    item,
    index,
  }: {
    item: WidgetProps
    index: number
  }) => {
    return (
      <Widget
        {...item}
        index={index}
        activeCard={activeCard}
        offsets={offsets}
      />
    )
  }
  const title = useSharedValue(0)
  useEffect(() => {
    title.value = title.value ? withTiming(0) : withTiming(1)
  }, [refresh])
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: title.value,
  }))
  return (
    <SafeAreaView style={{ backgroundColor: '#DDE3FF', flex: 1 }}>
      <StatusBar barStyle={'dark-content'} />
      <Animated.View style={animatedStyle}>
        <Text
          style={{
            fontWeight: '200',
            fontSize: 24,
            color: '#072F50',
            marginHorizontal: 20,
            paddingBottom: 20,
          }}>
          MY HOME
        </Text>
        <DragToSort data={data} renderItem={renderItem} numColumns={1} />
      </Animated.View>
      <Button title={'Toggle'} onPress={() => toggleRefresh(!refresh)}></Button>
    </SafeAreaView>
  )
}

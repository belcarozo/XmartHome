import { transform } from '@babel/core'
import React, { useEffect, useState } from 'react'
import { Button, Text, useWindowDimensions, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import Thermometer from '../../assets/icons/learn.svg'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'
import { Widget, WidgetProps } from './Widget'
import { FlatList } from 'react-native-gesture-handler'

interface HomeProps {
  //props
}

export const Home: React.FC<HomeProps> = ({}) => {
  const { width } = useWindowDimensions()
  const widgetSize = width / 2 - 30
  const [refresh, toggleRefresh] = useState(false)
  const data: WidgetProps[] = [
    {
      height: widgetSize,
      width: widgetSize,
      refresh,
      Illustration: Thermometer,
      number: 26,
    },
    {
      height: widgetSize,
      width: widgetSize,
      refresh,
      Illustration: Thermometer,
      number: 97,
      backgroundColorImage: 'lavender',
    },
    {
      height: widgetSize,
      width: widgetSize,
      refresh,
      Illustration: Thermometer,
      number: 55,
      backgroundColorImage: '#FEE2FA',
    },
    {
      height: widgetSize,
      width: widgetSize,
      refresh,
      Illustration: Thermometer,
      number: 72,
      backgroundColorImage: '#C5E2DB',
    },
  ]
  const renderItem = ({ item }: { item: WidgetProps }) => {
    return <Widget {...item} />
  }
  const title = useSharedValue(0)
  useEffect(() => {
    title.value = title.value ? withTiming(0) : withTiming(1)
  }, [refresh])
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: title.value,
  }))
  return (
    <SafeAreaView
      style={{ backgroundColor: '#DDE3FF', flex: 1, paddingHorizontal: 20 }}>
      <Animated.View style={animatedStyle}>
        <Text
          style={{
            fontWeight: '200',
            fontSize: 24,
            color: '#072F50',
            paddingVertical: 20,
          }}>
          MY HOME
        </Text>
      </Animated.View>
      <FlatList
        renderItem={renderItem}
        data={data}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: 20,
        }}></FlatList>
      <Button title={'Toggle'} onPress={() => toggleRefresh(!refresh)}></Button>
    </SafeAreaView>
  )
}

import React from 'react'
import { Text, useWindowDimensions, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Thermometer from '../../assets/icons/thermometer.svg'
import { styles } from './styles'
import { Widget } from './Widget'

interface HomeProps {
  //props
}

export const Home: React.FC<HomeProps> = ({}) => {
  const { width } = useWindowDimensions()
  const widgetSize = width / 2 - 40
  return (
    <SafeAreaView style={{backgroundColor: '#DAECF5', flex: 1, paddingHorizontal: 20}}>
      <Text style={{padding: 20, fontWeight: '200', fontSize: 24, color: '#485962'}}>MY HOME</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Widget height={widgetSize} width={widgetSize}/>
        <Widget height={widgetSize} width={widgetSize}/>
      </View>
    </SafeAreaView>
  )
}

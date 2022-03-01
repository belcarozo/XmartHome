import React, { useState } from 'react'
import { Button, Text, useWindowDimensions, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'
import { Widget } from './Widget'

interface HomeProps {
  //props
}

export const Home: React.FC<HomeProps> = ({}) => {
  const { width } = useWindowDimensions()
  const widgetSize = width / 2 - 30
  const [refresh, toggleRefresh] = useState(false)
  return (
    <SafeAreaView
      style={{ backgroundColor: '#DAECF5', flex: 1, paddingHorizontal: 20 }}>
      <Text
        style={{
          padding: 20,
          fontWeight: '200',
          fontSize: 24,
          color: '#485962',
        }}>
        MY HOME
      </Text>
      <View
        style={{
          flexDirection: 'row',
          paddingBottom: 30,
        }}>
        <Widget height={widgetSize} width={widgetSize} refresh={refresh} />
        <View style={{ paddingLeft: 20 }}>
          <Widget height={widgetSize} width={widgetSize} refresh={refresh} />
        </View>
      </View>
      <Widget height={100} width={width - 40} refresh={refresh} />
      <Button title={'Toggle'} onPress={() => toggleRefresh(!refresh)}></Button>
    </SafeAreaView>
  )
}

import React from 'react'
import { View } from 'react-native'
import { Toggle } from '../Toggle'
// import { styles } from './styles'

interface WidgetProps {
  width: number
  height: number
}

export const Widget: React.FC<WidgetProps> = ({ height, width }) => {
  return (
    <View style={{ 
        backgroundColor: 'white', 
        borderRadius: 17, 
        height, 
        width, 
        shadowOpacity: 0.01, 
        shadowOffset: { width: 1, height: 0 },
        padding: 20,
      }}>
        <Toggle></Toggle>
      </View>
  )
}
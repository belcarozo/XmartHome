import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '../screens/home'
import { Routes } from './Routes'


const Stack = createNativeStackNavigator<any>()

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={Routes.Home} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator

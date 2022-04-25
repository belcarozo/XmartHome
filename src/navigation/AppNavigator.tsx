import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '../screens/home'
import { HomeScreen } from '../screens/homeScreen'
import { Routes } from './Routes'
import {
  AnimationExample,
  API,
  Aurora,
  Breathe,
  Filters,
  Gooey,
  GraphsScreen,
  Hue,
  Matrix,
  Glassmorphism,
  Neumorphism,
  PerformanceDrawingTest,
  Wallpaper,
  Vertices,
  Wallet,
} from '../screens/skia'

const Stack = createNativeStackNavigator<any>()

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={Routes.Home} component={Home} />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: '🎨 Skia',
          }}
        />
        <Stack.Screen name="API" component={API} />
        <Stack.Screen name="Breathe" component={Breathe} />
        <Stack.Screen name="Filters" component={Filters} />
        <Stack.Screen name="Gooey" component={Gooey} />
        <Stack.Screen name="Hue" component={Hue} />
        <Stack.Screen
          name="Matrix"
          component={Matrix}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="Aurora"
          component={Aurora}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="Glassmorphism"
          component={Glassmorphism}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen name="Neumorphism" component={Neumorphism} />
        <Stack.Screen
          name="Wallpaper"
          component={Wallpaper}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen name="Wallet" component={Wallet} />
        <Stack.Screen name="Graphs" component={GraphsScreen} />
        <Stack.Screen name="Animation" component={AnimationExample} />
        <Stack.Screen name="Performance" component={PerformanceDrawingTest} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator

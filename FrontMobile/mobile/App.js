import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import Home from './screens/Home'
import Details from './screens/Details'
import store from './store/store'


export default function App() {

  const Stack = createNativeStackNavigator()
  return (
   <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name='Home' component={Home}></Stack.Screen>
      <Stack.Screen name='WorkTime' component={WorkTime}></Stack.Screen>
      <Stack.Screen name='Details' component={Details}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
   </Provider>
  )
}

const styles = StyleSheet.create({})
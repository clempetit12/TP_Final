import { StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import store from './store/store';
import WorkTime from './screens/WorkTime';
import { Provider } from 'react-redux';
import Details from './screens/Details';
import LoginPage from './screens/LoginPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LoginPage'>
      <Stack.Screen name="LoginPage" component={LoginPage} options={{ title: 'Login' }}/>
        <Stack.Screen name='WorkTime' component={WorkTime} options={{ title: 'WorkTime' }} />
        <Stack.Screen name='Details' component={Details} options={{ title: 'Détails' }} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});
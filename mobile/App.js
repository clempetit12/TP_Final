import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import store from './store/store';
import WorkTime from './screens/WorkTime';
import Details from './screens/Details';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="WorkTime" component={WorkTime} options={{ title: 'WorkTime' }} />
          <Tab.Screen name="Details" component={Details} options={{ title: 'Détails' }} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

import React from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import NewPizza from './Screens/NewPizza';
import TakeOrder from './Screens/TakeOrder';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="NewPizza" component={NewPizza} />
        <Stack.Screen name="TakeOrder" component={TakeOrder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

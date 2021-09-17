import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './views/Home'
import Episode from './views/Episode'

const Stack = createNativeStackNavigator();

const MainRoute = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Home" component={Home}  options={{ headerShown: false }}/>
      <Stack.Screen name="Episodes" component={Episode} options={{ headerShown: true}}/>
    </Stack.Navigator>
  );
}

export default MainRoute;

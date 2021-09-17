import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import Home from './views/Home'
import Episode from './views/Episode'
import EpisodeCharacter, { RouteProps } from './views/EpisodeCharacter'

const Stack = createNativeStackNavigator();

const MainRoute = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Episodes" component={Episode} options={{ headerShown: true }} />
      <Stack.Screen
        name="EpisodeCharacter" component={EpisodeCharacter}
        options={({ route } : any) => ({
          title: route.params.episode
        })}
      />
    </Stack.Navigator>
  );
}

export default MainRoute;

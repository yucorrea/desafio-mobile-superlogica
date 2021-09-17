import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './views/Home'
import Episode from './views/Episode'
import EpisodeCharacter from './views/EpisodeCharacter'

import { Feather } from "@expo/vector-icons";
import theme from './global/styles/theme';
import { View } from 'react-native';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();


const icons = {
  Home: {
    lib: Feather,
    name: "home"
  },
  Episodes: {
    lib: Feather,
    name: "play"
  },
  Locations: {
    lib: Feather,
    name: "map-pin"
  }
}

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Episodes" component={Episode} options={{ headerShown: true }} />
      <Stack.Screen
        name="EpisodeCharacter" component={EpisodeCharacter}
        options={({ route }: any) => ({
          title: route.params.episode
        })}
      />
    </Stack.Navigator>
  )
}

const MainRoute = () => {
  return (
    <BottomTab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {

        //@ts-ignore
        const { lib: Icon, name } = icons[route.name];

        return <Icon name={name} size={size} color={color} />
      },
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: theme.colors.text,
    })}

    >
      <BottomTab.Screen
        name="Home"
        component={HomeStack}
        options={{ title: "Personagens", headerShown: false }}
      />

      <BottomTab.Screen name="Episodes"
        component={View}
        options={{ title: "Episódios" }}
      />

      <BottomTab.Screen
        name="Locations"
        component={View}
        options={{ title: "Localizações" }}
      />
    </BottomTab.Navigator>
  );
}

export default MainRoute;

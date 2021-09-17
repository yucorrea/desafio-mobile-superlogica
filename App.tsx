import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {Provider} from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import AppLoading from 'expo-app-loading';

import { 
  useFonts, 
  Inter_300Light,
  Inter_400Regular, 
  Inter_600SemiBold 
} from '@expo-google-fonts/inter';

import MainRoute from './src/routes';
import { Persistor, Store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import theme from './src/global/styles/theme';

export default function App() {

  let [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_400Regular, 
    Inter_600SemiBold 
  });

  if(!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <Provider store={Store}>
    <PersistGate loading={null} persistor={Persistor}>

      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <MainRoute />
        </NavigationContainer>
      </ThemeProvider>
    </PersistGate>
    </Provider>
  );
}

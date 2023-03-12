/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Login from './Components/Login';
import Navigation from './Routes/Navigation';


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
      <Navigation />
  );
}

export default App;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  useColorScheme,
} from 'react-native';
import Navigation from './Routes/Navigation';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
      <Navigation />
  );
}

export default App;

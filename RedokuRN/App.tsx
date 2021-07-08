import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from './views/HomePage';
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 500);

export default function App() {
  return <HomePage />;
}

// index.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomePage from './welcome';
import TutorialPage from './tutorial';
import PracticePage from './practice';
import ResultsPage from './results';

import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    // Remova o NavigationContainer daqui
    <Stack.Navigator initialRouteName="WelcomePage" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WelcomePage" component={WelcomePage} />
      <Stack.Screen name="TutorialPage" component={TutorialPage} />
      <Stack.Screen name="PracticePage" component={PracticePage} />
      <Stack.Screen name="ResultsPage" component={ResultsPage} />
    </Stack.Navigator>
  );
}

import TabNavigator from './TabNavigator.tsx';
import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types.ts';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const TabNavigationOptions: NativeStackNavigationOptions = {
    headerShown: false,
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={TabNavigationOptions}
      />
    </Stack.Navigator>
  );
}

export default RootNavigator;

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator.tsx';
import {DetailPokemonScreen} from '../screen';

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="DetailPokemon" component={DetailPokemonScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;

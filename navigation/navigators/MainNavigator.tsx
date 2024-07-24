import {DetailPokemonScreen, HomeScreen} from '../../screen';
import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {DetailPokemonNavigationProps, MainTabParamList} from '../types.ts';
import {capitalizeFirstLetter} from '../../utils/string.ts';

const Stack = createNativeStackNavigator<MainTabParamList>();

function MainNavigator() {
  const HomeStackOptions: NativeStackNavigationOptions = {
    headerShown: false,
  };

  const DetailPokemonStackOptions = ({
    route,
  }: DetailPokemonNavigationProps) => ({
    headerTitleStyle: {
      fontFamily: 'Nunito-Bold',
      color: '#333',
    },
    title: capitalizeFirstLetter(route.params.name),
    headerShadowVisible: false,
    headerTitleAlign: 'center',
  });

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={HomeStackOptions}
      />
      <Stack.Screen
        name="DetailPokemon"
        component={DetailPokemonScreen}
        options={DetailPokemonStackOptions}
      />
    </Stack.Navigator>
  );
}

export default MainNavigator;

import {FavoriteScreen} from '../../screen';
import React from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {BottomTabParamList} from '../types.ts';
import MainNavigator from './MainNavigator.tsx';

interface TabBarIconProps {
  focused: boolean;
}

const Tab = createBottomTabNavigator<BottomTabParamList>();

const renderHeartIcon = ({focused}: TabBarIconProps) => (
  <Icon name={focused ? 'heart' : 'heart-outline'} size={20} color="#333" />
);

const renderHouseIcon = ({focused}: TabBarIconProps) => (
  <Icon name={focused ? 'home' : 'home-outline'} size={20} color="#333" />
);

function TabNavigator() {
  const TabNavigationOptions: BottomTabNavigationOptions = {
    tabBarActiveTintColor: '#333',
    tabBarInactiveTintColor: '#333',
    tabBarStyle: {
      backgroundColor: '#fff',
      borderTopWidth: 0,
    },
  };

  const FavouriteScreenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarIcon: renderHeartIcon,
    tabBarLabel: 'Favourites',
  };

  const MainScreenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarIcon: renderHouseIcon,
    tabBarLabel: 'Home',
  };

  return (
    <Tab.Navigator screenOptions={TabNavigationOptions}>
      <Tab.Screen
        name="Main"
        component={MainNavigator}
        options={MainScreenOptions}
      />
      <Tab.Screen
        name="Favourites"
        component={FavoriteScreen}
        options={FavouriteScreenOptions}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;

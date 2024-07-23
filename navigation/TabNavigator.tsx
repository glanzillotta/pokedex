import {FavoriteScreen, HomeScreen} from '../screen';
import React from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const renderHouseIcon = ({focused}: {focused: boolean}) => (
  <Icon name={focused ? 'home' : 'home-outline'} size={20} color="#333" />
);
const renderHeartIcon = ({focused}: {focused: boolean}) => (
  <Icon name={focused ? 'heart' : 'heart-outline'} size={20} color="#333" />
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

  const HomeScreenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarIcon: renderHouseIcon,
  };

  const FavouriteScreenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarIcon: renderHeartIcon,
  };

  return (
    <Tab.Navigator screenOptions={TabNavigationOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={HomeScreenOptions}
      />
      <Tab.Screen
        name="Favourite"
        component={FavoriteScreen}
        options={FavouriteScreenOptions}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;

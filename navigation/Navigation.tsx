import {NavigationContainer} from '@react-navigation/native';
import {FavoriteScreen, HomeScreen} from '../screen';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';

const Tab = createBottomTabNavigator();

const renderHouseIcon = ({focused}: {focused: boolean}) => (
  <Icon name={focused ? 'home' : 'home-outline'} size={20} color="#333" />
);
const renderHeartIcon = ({focused}: {focused: boolean}) => (
  <Icon name={focused ? 'heart' : 'heart-outline'} size={20} color="#333" />
);

function Navigation() {
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
    <NavigationContainer>
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
    </NavigationContainer>
  );
}

export default Navigation;

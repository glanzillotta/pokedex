import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen, FavoriteScreen} from '../screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome6';
import React from 'react';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#333',
          tabBarInactiveTintColor: '#333',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 0,
          },
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => <Icon name="house" size={20} color="#333" />,
          }}
        />
        <Tab.Screen
          name="Favourite"
          component={FavoriteScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <Icon name="heart" size={20} color="#333" solid />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;

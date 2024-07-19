import {NavigationContainer} from '@react-navigation/native';
import {FavoriteScreen, HomeScreen} from '../screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome6';
import React from 'react';

const Tab = createBottomTabNavigator();

const renderHouseIcon = () => <Icon name="house" size={20} color="#333" />;
const renderHeartIcon = () => <Icon name="heart" size={20} color="#333" />;

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
            tabBarIcon: renderHouseIcon,
          }}
        />
        <Tab.Screen
          name="Favourite"
          component={FavoriteScreen}
          options={{
            headerShown: false,
            tabBarIcon: renderHeartIcon,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;

import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React, { FC } from 'react';
import { Header } from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';

import { HeaderAppBar } from '../components';
import { useCustomTheme } from '../hooks';
import { Feed, Post, Activity, Profile } from '../screens';
import { Search } from '../screens/search/search';

const Tab = createBottomTabNavigator();

const tabBarOptions = (iconName: string): BottomTabNavigationOptions => {
  return {
    tabBarShowLabel: false,
    headerShown: true,
    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
      <Feather name={iconName} color={color} size={size} />
    ),
  };
};

export const TabNavigator: FC = children => {
  const {
    theme: { colors },
  } = useCustomTheme();

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: colors.text,
      }}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={tabBarOptions('home')}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarShowLabel: false,
          headerShown: true,
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Feather name="search" color={color} size={size} />
          ),
          header: () => <HeaderAppBar />,
        }}
      />
      <Tab.Screen name="Post" component={Post} options={tabBarOptions('zap')} />
      <Tab.Screen
        name="Activity"
        component={Activity}
        options={tabBarOptions('activity')}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={tabBarOptions('user')}
      />
    </Tab.Navigator>
  );
};

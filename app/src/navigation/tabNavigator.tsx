import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React, { FC } from 'react';
import Feather from 'react-native-vector-icons/Feather';

import { useCustomTheme } from '../hooks';
import { Feed, Search, Post, Activity, Profile } from '../screens';

const Tab = createBottomTabNavigator();

const tabBarOptions = (iconName: string): BottomTabNavigationOptions => {
  return {
    tabBarShowLabel: false,
    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
      <Feather name={iconName} color={color} size={size} />
    ),
  };
};

export const TabNavigator: FC = () => {
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
        options={tabBarOptions('search')}
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

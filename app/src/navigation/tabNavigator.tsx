import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React, { FC, useState } from 'react';
import { Header, Icon, SearchBar } from 'react-native-elements';
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
  const [query, setQuery] = useState('');

  const headerRightProps = {
    tintColor: colors.text,
    pressColor: colors.grey0,
  };

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
          headerRight: ({ ...headerRightProps }) => (
            <Icon
              {...headerRightProps}
              type="feather"
              name="menu"
              containerStyle={{ padding: 8, marginRight: 8 }}
              color={colors.text}
            />
          ),
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Feather name="search" color={color} size={size} />
          ),
          headerTitle: () => (
            <SearchBar
              value={query}
              autoCapitalize="none"
              onChangeText={text => setQuery(text)}
              round={true}
              placeholder="Search"
              inputContainerStyle={{ maxHeight: 30, minWidth: 225 }}
              containerStyle={{
                borderWidth: 0,
                padding: 0,
                margin: 0,
                borderRadius: 25,
              }}
            />
          ),
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

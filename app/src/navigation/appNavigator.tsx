import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, { FC } from 'react';

import { Settings } from '../screens';

import { TabNavigator } from './tabNavigator';

export type AppParamList = {
  Home: undefined;
  Settings: undefined;
};

export type AppScreenProps = BottomTabNavigationProp<
  AppParamList,
  keyof AppParamList
> &
  NativeStackScreenProps<AppParamList, keyof AppParamList>;

export type AppNavigation = AppScreenProps['navigation'];

export type AppRoute = AppScreenProps['route'];

const AppStack = createNativeStackNavigator<AppParamList>();

export type AppNavProps = {
  navigation: AppNavigation;
  route: AppRoute;
};

export const AppNavigator: FC = () => {
  return (
    <AppStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <AppStack.Screen name="Home" component={TabNavigator} />
      <AppStack.Screen name="Settings" component={Settings} />
    </AppStack.Navigator>
  );
};

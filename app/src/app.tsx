import { NavigationContainer } from '@react-navigation/native';
import React, { FC } from 'react';
import { LogBox } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { configureUnsplashApi } from './api/config';
import { useCustomTheme } from './hooks';
import { AppNavigator } from './navigation';

LogBox.ignoreAllLogs(true);

configureUnsplashApi();

const App: FC = () => {
  const { theme } = useCustomTheme();

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider theme={theme}>
          <NavigationContainer theme={theme}>
            <AppNavigator />
          </NavigationContainer>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;

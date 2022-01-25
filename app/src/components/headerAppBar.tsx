import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Header, Icon, Divider } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import { useCustomTheme } from '../hooks/useCustomTheme';
import { AppNavigation } from '../navigation';

interface Props {
  onPress?: () => void;
}

export const HeaderAppBar: FC<Props> = ({ onPress }) => {
  const {
    theme: { colors },
    theme,
  } = useCustomTheme();
  const navigation = useNavigation<AppNavigation>();

  const darkModeStyle = {
    colors: [colors.grey4, colors.background],
    start: { x: 0.003, y: -5 },
    end: { x: 0, y: 1.8 },
  };

  const lightModeStyle = {
    colors: [colors.background, colors.grey4],
    start: { x: 0.01, y: -0.9 },
    end: { x: 0, y: 1.8 },
  };

  const gradient = theme.dark ? darkModeStyle : lightModeStyle;

  const handlePress = () => {
    onPress?.();
    navigation.navigate('Settings');
  };

  return (
    <View>
      <Header
        ViewComponent={LinearGradient}
        linearGradientProps={gradient}
        elevated={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  sizing: {
    width: 40,
    height: 40,
  },
});

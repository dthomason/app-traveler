import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';

import { useCustomTheme } from '../hooks';

interface Props {
  onPress?: () => void;
}

export const HeaderAppBar: FC<Props> = () => {
  const {
    theme: { colors },
  } = useCustomTheme();

  return (
    <View>
      <Header
        containerStyle={{ style: { fontFamily: 'Proxima Nova' } }}
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

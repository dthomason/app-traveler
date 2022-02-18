import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

import { useCustomTheme } from '../hooks';

export function FooterLoading() {
  const {
    theme: { colors },
  } = useCustomTheme();

  return (
    <View
      style={{
        height: 28,
        width: '100%',
        backgroundColor: colors.card,
        alignItems: 'center',
        padding: 4,
      }}
    >
      <Text style={{ color: colors.grey3, fontSize: 16 }}>Loading More...</Text>
    </View>
  );
}

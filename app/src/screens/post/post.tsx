import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';

export const Post: FC = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.fontText}>
        Charlie, super fresh love kiss extreme?
      </Text>
      <Text style={styles.regular}>
        Charlie, super fresh love kiss extreme?
      </Text>
      <Text style={styles.proximus}>
        Charlie, super fresh love kiss extreme?
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  fontText: {
    fontFamily: 'Circular Std',
    fontWeight: '400',
    fontSize: 22,
  },
  regular: {
    fontFamily: 'Indie Flower',
    fontWeight: '400',
    fontSize: 22,
  },
  proximus: {
    fontFamily: 'Proxima Nova',
    fontWeight: '400',
    fontSize: 22,
  },
});

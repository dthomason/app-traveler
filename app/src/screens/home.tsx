import React, { FC } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { useFeed } from '../hooks';

export const Home: FC = () => {
  const { addPage, items, renderFeed } = useFeed();

  const handleEndReached = () => {
    addPage();
  };

  return (
    <View style={styles.container}>
      <FlatList
        initialNumToRender={3}
        data={items}
        keyExtractor={(id, i) => `${id}${i}`}
        renderItem={renderFeed}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: 200,
    height: 300,
  },
});

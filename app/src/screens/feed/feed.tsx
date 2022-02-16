import React, { FC } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { useFeed } from './hooks';

export const Feed: FC = () => {
  const { addPage, items, renderItem } = useFeed();

  const handleEndReached = () => {
    addPage();
  };

  return (
    <View style={styles.container}>
      <FlatList
        initialNumToRender={2}
        data={items}
        keyExtractor={(item, i) => `${item.id}${i}`}
        renderItem={renderItem}
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

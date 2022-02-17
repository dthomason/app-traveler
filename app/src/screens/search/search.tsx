import { chunk } from 'lodash';
import React, { FC, useState } from 'react';
import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';

import { useSearch } from '../../hooks';

import { SquarePanel } from './panel';

export const Search: FC = () => {
  const { width } = useWindowDimensions();
  const { addPage, items } = useSearch({ query: 'beach' });

  const oneThird = width / 3;
  const chunkItems = chunk(items, 3);

  const handleEndReached = () => {
    addPage();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chunkItems}
        keyExtractor={(item, i) => {
          const extracted = item[i]?.id;

          return extracted ? `${extracted}${i}` : `${Math.random() * 200}`;
        }}
        renderItem={({ item }) => {
          return <SquarePanel item={item} width={oneThird} height={oneThird} />;
        }}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  box: {
    width: 200,
    height: 300,
  },
});

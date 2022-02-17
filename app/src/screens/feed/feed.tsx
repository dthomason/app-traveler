import React, { FC } from 'react';
import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';

import { useCustomTheme } from '../../hooks';

import { FeedLayout } from './components';
import { useFeed } from './hooks';
import { getHeight, getOrientation } from '../utils';

export const Feed: FC = () => {
  const { width } = useWindowDimensions();
  const { addPage, items } = useFeed({ windowWidth: width });
  const { theme } = useCustomTheme();

  const handleEndReached = () => {
    addPage();
  };

  return (
    <View style={styles.container}>
      <FlatList
        initialNumToRender={2}
        data={items}
        keyExtractor={(item, i) => `${item.id}${i}`}
        renderItem={({ item }) => {
          const orientation = getOrientation(item.width, item.height);
          const height = getHeight(width, orientation);

          return (
            <FeedLayout
              item={item}
              theme={theme}
              width={width}
              height={height}
            />
          );
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
  },
  box: {
    width: 200,
    height: 300,
  },
});

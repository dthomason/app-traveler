import React, { FC } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

import { useFeed, UserImage } from '../hooks';

interface RenderedItem {
  item: UserImage;
}

const renderItem = ({ item }: RenderedItem) => (
  <View style={{ alignItems: 'center' }}>
    <Text>{item.description}</Text>
    <Image
      source={{ uri: item.urls.regular }}
      style={{ width: 350, height: 500 }}
    />
  </View>
);

export const Home: FC = () => {
  const { addPage, items } = useFeed();

  const handleEndReached = () => {
    addPage();
  };

  return (
    <View style={styles.container}>
      <FlatList
        initialNumToRender={3}
        data={items}
        keyExtractor={(id, i) => `${id}${i}`}
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
    // width: '100%',
    // height: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  box: {
    width: 200,
    height: 300,
  },
});

import React, { FC } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';

import { useFeed, UserImage } from '../hooks';

interface RenderedItem {
  item: UserImage;
}

const renderItem = ({ item }: RenderedItem) => (
  <View style={{ alignItems: 'center', height: 600 }}>
    <Image
      source={{ uri: item.urls.regular }}
      style={{ width: 350, height: 500 }}
    />
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 30,
      }}
    />
    <Text h4>{item.description}</Text>
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
  },
  box: {
    width: 200,
    height: 300,
  },
});

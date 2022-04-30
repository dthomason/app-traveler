import React, { FC, useCallback } from 'react';
import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { SearchPhotoResult } from '../../api/search';
import { FooterLoading } from '../../components/footerLoading';
import { useSearch } from '../../hooks';
import { auth } from '../feed/components';

interface RenderItem {
  item: SearchPhotoResult;
}

export const Search: FC = () => {
  const { width } = useWindowDimensions();
  const { addPage, items, loading } = useSearch();

  const oneThird = width / 3;

  const loadMoreResults = () => {
    addPage();
  };

  const renderItem = ({ item }: RenderItem) => {
    item.urls.raw = `${item.urls.raw}&w=${oneThird}&h=${oneThird}&fit=crop&crop=faces,center`;

    return (
      <View style={{ padding: 2 }}>
        <FastImage
          style={{ width: oneThird, height: oneThird }}
          source={{
            uri: item.urls.raw,
            headers: { Authorization: `Client-ID ${auth}` },
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    );
  };

  const keyExtractor = useCallback(item => `${item.id}`, []);

  const itemLayout = useCallback(
    (_, index) => {
      return {
        length: oneThird,
        offset: (oneThird + 2) * index,
        index,
      };
    },
    [oneThird],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        getItemLayout={itemLayout}
        initialNumToRender={15}
        keyExtractor={keyExtractor}
        ListFooterComponent={loading ? FooterLoading : null}
        maxToRenderPerBatch={20}
        numColumns={3}
        onEndReachedThreshold={0.5}
        removeClippedSubviews
        onEndReached={loadMoreResults}
        renderItem={renderItem}
        scrollEventThrottle={250}
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

import React, { FC, useCallback } from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  useWindowDimensions,
  View,
} from 'react-native';

import { FooterLoading } from '../../components/footerLoading';
import { useCustomTheme } from '../../hooks';
import { getHeight, getOrientation } from '../utils';

import { FeedLayout } from './components';
import { useFeed } from './hooks';

export const Feed: FC = () => {
  const { width } = useWindowDimensions();
  const { addPage, items, loading } = useFeed({ windowWidth: width });
  const { theme } = useCustomTheme();

  const loadMoreResults = () => {
    addPage();
  };

  const keyExtractor = useCallback(item => `${item.id}`, []);

  const renderItem = useCallback(
    ({ item }) => {
      const orientation = getOrientation(item.width, item.height);
      const height = getHeight(width, orientation);

      return (
        <FeedLayout item={item} theme={theme} width={width} height={height} />
      );
    },
    [theme, width],
  );

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={items}
          initialNumToRender={2}
          keyExtractor={keyExtractor}
          ListFooterComponent={loading ? FooterLoading : null}
          maxToRenderPerBatch={5}
          onEndReached={loadMoreResults}
          onEndReachedThreshold={0.5}
          removeClippedSubviews={true}
          renderItem={renderItem}
          scrollEventThrottle={250}
        />
      </SafeAreaView>
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

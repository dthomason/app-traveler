import React, { FC, useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { Config } from 'react-native-config';
import { createApi } from 'unsplash-js';

const accessKey = Config.UNSPLASH_ACCESS_KEY;

const api = createApi({ accessKey });

interface ImageSet {
  id: string;
  description: string;
  url: string;
}

type ItemSet = {
  item: ImageSet;
};

const renderItem = ({ item }: ItemSet) => (
  <View
    style={{ alignItems: 'center' }}
    key={`${item.id}${new Date().getTime()}`}
  >
    <Text>{item.description}</Text>
    <Image source={{ uri: item.url }} style={{ width: 350, height: 550 }} />
  </View>
);

export const Home: FC = () => {
  const [items, setItems] = useState<ImageSet[]>([]);
  const [shouldFetch, setShouldFetch] = useState(true);
  const getUnique = () => new Date().getTime();

  const handleEndReached = () => {
    console.log('SHOULD FETCH AGAIN');
    setShouldFetch(true);
  };

  useEffect(() => {
    if (!shouldFetch) return;

    (async () => {
      try {
        const { response } = await api.collections.getPhotos({
          collectionId: 'NOopMdOtWow',
        });

        if (!response?.results) return;

        const data = response?.results.map(({ id, description, urls }) => ({
          id: `${id}${getUnique()}`,
          description,
          url: `${urls.raw}&w=800`,
        }));

        setItems(current => (!current.length ? data : [...current, ...data]));
        setShouldFetch(false);
        console.log(`TOTAL IMAGES: ${data.length}`);
      } catch (err) {
        console.log({ err });
      }
    })();
  }, [shouldFetch, setItems, setShouldFetch]);

  return (
    <View style={styles.container}>
      <FlatList
        initialNumToRender={3}
        data={items}
        keyExtractor={(id, i) => `${id}${i}`}
        renderItem={renderItem}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        extraData={handleEndReached}
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

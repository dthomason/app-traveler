import React, { FC } from 'react';
import { FlatList, Image, View } from 'react-native';
import { Text } from 'react-native-elements';

import { SearchPhotoResult } from '../../api/search';

interface RenderProps {
  item: SearchPhotoResult;
  width: number;
  height: number;
}
const renderItem = ({ item, width, height }: RenderProps) => (
  <View style={{ padding: 2 }}>
    <Image source={{ uri: item.urls.raw }} style={{ width, height }} />
  </View>
);

interface Props {
  item: SearchPhotoResult[];
  width: number;
  height: number;
}

export const SquarePanel: FC<Props> = ({ item, width, height }) => {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      <FlatList
        data={item}
        horizontal={true}
        keyExtractor={(item, i) => `${item.id}${i}`}
        renderItem={({ item }) => {
          item.urls.raw = `${item.urls.raw}&w=${width}&h=${height}&fit=crop&crop=faces,center`;

          return renderItem({ item, width, height });
        }}
      />
    </View>
  );
};

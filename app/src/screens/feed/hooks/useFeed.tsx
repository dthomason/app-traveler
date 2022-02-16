import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useWindowDimensions } from 'react-native';

import { search, fetch } from '../../../api';
import { merge } from 'lodash';
import { unsplash } from '../../../api/config';
import { FetchPhotoResponse } from '../../../api/fetch';
import { fetchPhotoResponse } from '../../../api/fetch/responses';
import { SearchPhotoResult, SearchPhotosResponse } from '../../../api/search';
import { useCustomTheme } from '../../../hooks/useCustomTheme';
import { PhotoLayout } from '../components/layout';

export type PhotoInfo = FetchPhotoResponse & SearchPhotoResult;

interface Item {
  item: PhotoInfo;
}
interface UseFeed {
  items: PhotoInfo[];
  addPage: () => void;
  renderItem: ({ item }: Item) => ReactElement;
  onPress: () => void;
  expanded: boolean;
}

export const useFeed = (): UseFeed => {
  const [expanded, setExpanded] = useState(false);
  const [items, setItems] = useState<PhotoInfo[]>([]);
  const [page, setPage] = useState(1);
  const { width } = useWindowDimensions();
  const { theme } = useCustomTheme();
  const prevPage = useRef(0);

  const addPage = () => {
    setPage(current => current + 1);
  };

  const onPress = () => {
    setExpanded(!expanded);
  };

  const renderItem = ({ item }: Item) => (
    <PhotoLayout item={item} theme={theme} width={width} />
  );

  useEffect(() => {
    if (prevPage.current >= page) return;

    const photoBatch = (results: SearchPhotoResult[]): Promise<PhotoInfo[]> => {
      const mapped = Promise.all(
        results.map(async value => {
          const config = fetch.photo({
            raw: value.urls.raw,
            width,
          });

          const { data } = await unsplash.request<FetchPhotoResponse>(config);

          return merge(value, data);
        }),
      );

      return mapped;
    };

    (async () => {
      try {
        const config = search.photos('beach', page);
        const { data } = await unsplash.request<SearchPhotosResponse>(config);
        const photos = await photoBatch(data.results);

        if (photos) {
          setItems((prev: PhotoInfo[]) => {
            return prevPage.current === 0 ? photos : [...prev, ...photos];
          });
        }

        prevPage.current = page;
      } catch (err) {
        return;
      }
    })();
  }, [page, prevPage, setItems, width]);

  return {
    expanded,
    onPress,
    addPage,
    items,
    renderItem,
  };
};

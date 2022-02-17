import axios from 'axios';
import { merge } from 'lodash';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useWindowDimensions } from 'react-native';

import { search, fetch } from '../../../api';
import { unsplash } from '../../../api/config';
import { FetchPhotoResponse } from '../../../api/get';
import { fetchPhotoResponse } from '../../../api/get/responses';
import { SearchPhotoResult, SearchPhotosResponse } from '../../../api/search';
import { useCustomTheme } from '../../../hooks/useCustomTheme';
import { PhotoLayout } from '../components/layout';
import { getHeight, getOrientation } from '../utils';

export type PhotoInfo = FetchPhotoResponse & SearchPhotoResult;

interface Item {
  item: SearchPhotoResult;
}
interface UseFeed {
  items: SearchPhotoResult[];
  addPage: () => void;
  renderItem: ({ item }: Item) => ReactElement;
  onPress: () => void;
  expanded: boolean;
}

export const useFeed = (): UseFeed => {
  const [expanded, setExpanded] = useState(false);
  const [items, setItems] = useState<SearchPhotoResult[]>([]);
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

  const renderItem = ({ item }: Item) => {
    const orientation = getOrientation(item.width, item.height);
    const height = getHeight(width, orientation);

    return (
      <PhotoLayout item={item} theme={theme} width={width} height={height} />
    );
  };

  useEffect(() => {
    if (prevPage.current >= page) return;

    (async () => {
      try {
        const searchUrl = `https://api.unsplash.com/search/photos?page=1&query=beach`;
        const { data } = await unsplash.get<SearchPhotosResponse>(searchUrl);
        const results = data.results.map(value => {
          value.urls.raw = `${value.urls.raw}&w=${width}`;

          return value;
        });

        setItems(prev => {
          return prevPage.current === 0 ? results : [...prev, ...results];
        });

        prevPage.current = page;
      } catch (err) {
        return;
      }
    })();
  }, [page, width]);

  return {
    expanded,
    onPress,
    addPage,
    items,
    renderItem,
  };
};

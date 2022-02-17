import { useEffect, useRef, useState } from 'react';

import { unsplash } from '../../../api/config';
import { FetchPhotoResponse } from '../../../api/get';
import { SearchPhotoResult, SearchPhotosResponse } from '../../../api/search';

export type PhotoInfo = FetchPhotoResponse & SearchPhotoResult;

interface UseFeed {
  items: SearchPhotoResult[];
  addPage: () => void;
  onPress: () => void;
  expanded: boolean;
}

interface Config {
  windowWidth: number;
}

export const useFeed = ({ windowWidth }: Config): UseFeed => {
  const [expanded, setExpanded] = useState(false);
  const [items, setItems] = useState<SearchPhotoResult[]>([]);
  const [page, setPage] = useState(1);
  const prevPage = useRef(0);

  const addPage = () => {
    setPage(current => current + 1);
  };

  const onPress = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (prevPage.current >= page) return;

    (async () => {
      try {
        const searchUrl = `https://api.unsplash.com/search/photos?page=${page}&query=traveler`;
        const { data } = await unsplash.get<SearchPhotosResponse>(searchUrl);
        const results = data.results.map(value => {
          value.urls.raw = `${value.urls.raw}&w=${windowWidth}`;

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
  }, [page, windowWidth]);

  return {
    expanded,
    onPress,
    addPage,
    items,
  };
};

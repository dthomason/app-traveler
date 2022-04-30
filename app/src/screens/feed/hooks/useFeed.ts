import { uniqBy } from 'lodash';
import { useEffect, useRef, useState } from 'react';

import { unsplash } from '../../../api/config';
import { FetchPhotoResponse } from '../../../api/get';
import { SearchPhotoResult, SearchPhotosResponse } from '../../../api/search';

export type PhotoInfo = FetchPhotoResponse & SearchPhotoResult;

interface UseFeed {
  items: SearchPhotoResult[];
  addPage: () => void;
  loading: boolean;
}

interface Config {
  windowWidth: number;
}

export const useFeed = ({ windowWidth }: Config): UseFeed => {
  const [items, setItems] = useState<SearchPhotoResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const prevPage = useRef(0);

  const addPage = () => {
    setPage(current => current + 1);
  };

  useEffect(() => {
    if (prevPage.current >= page) return;

    setLoading(true);

    (async () => {
      try {
        const searchUrl = `https://api.unsplash.com/search/photos?page=${page}&query=traveler`;
        const { data } = await unsplash.get<SearchPhotosResponse>(searchUrl);
        const results = data.results.map(value => {
          value.urls.raw = `${value.urls.raw}&w=${windowWidth}`;

          return value;
        });

        setItems(prev => {
          if (prevPage.current === 0) return results;

          return uniqBy([...prev, ...results], 'id');
        });

        setLoading(false);
        prevPage.current = page;
      } catch (err) {
        setLoading(false);

        return;
      }
    })();
  }, [page, windowWidth]);

  return {
    loading,
    addPage,
    items,
  };
};

import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import { consoleAxiosError, isAxiosError } from '../api';
import { unsplash } from '../api/config';
import { SearchPhotoResult, SearchPhotosResponse } from '../api/search';

interface UseSearch {
  addPage: () => void;
  items: SearchPhotoResult[];
}

interface Config {
  query: string;
}

export const useSearch = ({ query }: Config): UseSearch => {
  const [items, setItems] = useState<SearchPhotoResult[]>([]);
  const [page, setPage] = useState(1);
  const prevPage = useRef(0);

  const addPage = () => {
    setPage(current => current + 1);
  };

  useEffect(() => {
    if (prevPage.current >= page) return;

    const source = axios.CancelToken.source();

    (async () => {
      try {
        const searchUrl = `https://api.unsplash.com/search/photos?page=${page}&query=${query}`;
        const { data } = await unsplash.get<SearchPhotosResponse>(searchUrl);

        setItems(prev => {
          return prevPage.current === 0
            ? data.results
            : [...prev, ...data.results];
        });

        prevPage.current = page;
      } catch (err) {
        if (isAxiosError(err)) {
          consoleAxiosError(err);
        }
      }
    })();

    return () => {
      source.cancel();
    };
  }, [page]);

  return {
    addPage,
    items,
  };
};

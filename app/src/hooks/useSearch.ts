import axios from 'axios';
import { uniqBy } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useWindowDimensions } from 'react-native';

import { consoleAxiosError, isAxiosError } from '../api';
import { unsplash } from '../api/config';
import { SearchPhotoResult, SearchPhotosResponse } from '../api/search';

export const UNSPLASH_BASE_API = 'https://api.unsplash.com';
export const UNSPLASH_SEARCH_PHOTOS = '/search/photos';
export const UNSPLASH_RANDOM = '/photos/random';

interface UseSearch {
  addPage: () => void;
  clearSearch: () => void;
  items: SearchPhotoResult[];
  submitSearch: (query: string) => void;
  query: string;
  loading: boolean;
}

export const useSearch = (): UseSearch => {
  const { width } = useWindowDimensions();
  const [query, setQuery] = useState('latest');
  const [items, setItems] = useState<SearchPhotoResult[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const prevPage = useRef(0);
  const prevQuery = useRef('');
  const perPage = 21;
  const searchBase = `${UNSPLASH_BASE_API}${UNSPLASH_SEARCH_PHOTOS}`;
  const searchUrl = `${searchBase}?page=${page}&query=${query}&per_page=${perPage}`;

  const searchWidth = width / 3;

  const addPage = () => {
    setPage(current => current + 1);
  };

  const submitSearch = (query: string) => {
    setQuery(query);
  };

  const clearSearch = () => {
    setQuery('latest');
  };

  const getPhotos = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const { data } = await unsplash.get<SearchPhotosResponse>(searchUrl);
      const results = data.results.map(value => {
        value.urls.raw = `${value.urls.raw}&w=${searchWidth}`;

        return value;
      });

      setItems(prev => {
        if (prevPage.current === 0) return results;

        return uniqBy([...prev, ...results], 'id');
      });

      prevPage.current = page;
      prevQuery.current = query;
      setLoading(false);
    } catch (err) {
      if (!isAxiosError(err)) return;
      consoleAxiosError(err);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (prevQuery.current === query || loading) return;

    const source = axios.CancelToken.source();

    (async () => await getPhotos())();

    return () => source.cancel();
  }, [prevQuery.current, query]);

  return {
    addPage,
    clearSearch,
    loading,
    items,
    query,
    submitSearch,
  };
};

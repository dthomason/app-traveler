import { useEffect, useState } from 'react';

import { consoleAxiosError, isAxiosError, unsplash } from '../api';
import { SearchPhotoResult, SearchPhotosResponse } from '../api/search';
import { QueryProps, useStore } from '../store';

const UNSPLASH_BASE = 'https://api.unsplash.com/photos/search';

export const useFetchItems = () => {
  const [allLoaded, setAllLoaded] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const listItems = useStore(state => state.listItems);
  const searchProps = useStore(state => state.searchProps);
  const hasHydrated = useStore(state => state.hasHydrated);
  const setListItems = useStore(state => state.setListItems);
  const setSearchProps = useStore(state => state.setSearchProps);

  const fetchResults = async ({
    query,
    pageNumber,
    perPage,
  }: QueryProps): Promise<SearchPhotoResult[] | undefined> => {
    try {
      const url = `${UNSPLASH_BASE}?query=${query}&page=${pageNumber}&per_page=${perPage}`;

      const { data } = await unsplash.get<SearchPhotosResponse>(url);

      return data.results;
    } catch (err) {
      if (!isAxiosError(err)) return;

      consoleAxiosError(err);
    }

    return;
  };

  const isUsableList = (list: unknown): list is SearchPhotoResult[] =>
    Array.isArray(list) && 'urls' in list[0];

  const initialiseList = async () => {
    if (hasHydrated && isUsableList(listItems)) return;

    // This is Default for feed page
    const searchProps = {
      query: 'traveler',
      pageNumber: 1,
      perPage: 5,
    };

    const results = await fetchResults(searchProps);

    if (isUsableList(results)) {
      setSearchProps(searchProps);
      setListItems(results);
    }
  };

  const determineSearchProps = (newQuery?: string, numberPerPage?: number) => {
    const { query, pageNumber, perPage } = searchProps;

    if (newQuery !== query && newQuery?.length) {
      return {
        query: newQuery,
        pageNumber: 1,
        perPage: numberPerPage ? numberPerPage : perPage,
      };
    } else {
      return {
        query,
        pageNumber: pageNumber + 1,
        perPage,
      };
    }
  };

  const loadMoreResults = async (query?: string, perPage?: number) => {
    // if already loading more, or all loaded, return;
    if (loadingMore || allLoaded) return;

    setLoadingMore(true);

    const newSearchProps = determineSearchProps(query, perPage);

    const newItems = await fetchResults(newSearchProps);

    if (isUsableList(newItems)) {
      setListItems(newItems);
      setAllLoaded(true);
    } else {
      console.error('Something went wrong');
    }

    setLoadingMore(false);
  };

  useEffect(() => {
    initialiseList();
  }, []);

  return {
    loadMoreResults,
    loadingMore,
    listItems,
  };
};

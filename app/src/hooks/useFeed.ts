import { useEffect, useRef, useState } from 'react';
import Config from 'react-native-config';
import { createApi } from 'unsplash-js';

import { UserImage } from './types';

const accessKey = Config.UNSPLASH_ACCESS_KEY;
const api = createApi({ accessKey });

interface UseFeed {
  items: UserImage[];
  addPage: () => void;
}

export const useFeed = (): UseFeed => {
  const [items, setItems] = useState<UserImage[]>([]);
  const [page, setPage] = useState(1);
  const prevPage = useRef(0);

  const addPage = () => {
    setPage(current => current + 1);
  };

  useEffect(() => {
    if (prevPage.current >= page) return;

    (async () => {
      try {
        const { response } = await api.collections.getPhotos({
          collectionId: 'NOopMdOtWow',
          page,
        });

        if (!response?.results) return;

        const data = response.results;

        setItems(current =>
          prevPage.current === 0 ? data : [...current, ...data],
        );
        console.log(`HAVE: ${items.length} images`);
        prevPage.current = page;
      } catch (err) {
        console.log({ err });
      }
    })();
  }, [page, prevPage, setItems]);

  return {
    addPage,
    items,
  };
};

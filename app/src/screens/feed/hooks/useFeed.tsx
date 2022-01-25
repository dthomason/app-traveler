import React, { ReactElement, useEffect, useRef, useState } from 'react';
import {
  FlatListProps,
  ListRenderItem,
  useWindowDimensions,
} from 'react-native';
import Config from 'react-native-config';
import { createApi } from 'unsplash-js';

import { consoleAxiosError, isAxiosError } from '../../../api';
import { useCustomTheme } from '../../../hooks/useCustomTheme';
import { Feed } from '../components/feed';
import { getOrientation, UserImage } from '../utils';

const accessKey = Config.UNSPLASH_ACCESS_KEY;
const mapApiKey = Config.MAPS_API_KEY;
const api = createApi({ accessKey });

interface Item {
  item: UserImage;
}
interface UseFeed {
  items: UserImage[];
  addPage: () => void;
  renderItem: ({ item }: Item) => ReactElement;
  onPress: () => void;
  expanded: boolean;
}

export const useFeed = (): UseFeed => {
  const [expanded, setExpanded] = useState(false);
  const [items, setItems] = useState<UserImage[]>([]);
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
    <Feed item={item} theme={theme} width={width} />
  );

  const processCollections = async (
    results: any[],
  ): Promise<UserImage[] | undefined> => {
    try {
      const mapped = Promise.all(
        results.map(async value => {
          const { response } = await api.photos.get({ photoId: value.id });

          return {
            color: value.color,
            description: value.description,
            id: value.id,
            username: value.id,
            first: value.first,
            last: value.last,
            likes: value.likes,
            likedByUser: value.liked_by_user,
            links: {
              self: value.links.self,
              html: value.links.html,
              download: value.links.download,
              location: value.links.location,
            },
            orientation: getOrientation(value.width, value.height),
            urls: value.urls,
            location: response?.location.city || '',
            user: {
              id: value.user.id,
              username: value.user.username,
              name: value.user.name,
              instagram: value?.instagram,
              twitter: value?.twitter,
              profileImage: {
                small: value.user.profile_image.small,
                medium: value.user.profile_image.medium,
                large: value.user.profile_image.large,
              },
            },
          };
        }),
      );

      return mapped;
    } catch (err) {
      if (isAxiosError(err)) {
        consoleAxiosError(err);
      } else {
        console.error;
      }
    }
  };

  useEffect(() => {
    if (prevPage.current >= page) return;

    (async () => {
      try {
        const { response } = await api.collections.getPhotos({
          collectionId: '4440429',
          page,
        });

        if (!response?.results) return;

        const data = await processCollections(response.results);

        if (data) {
          setItems(current =>
            prevPage.current === 0 ? data : [...current, ...data],
          );
        }

        console.log(`HAVE: ${items.length} images`);
        prevPage.current = page;
      } catch (err) {
        console.log({ err });
      }
    })();
  }, [items.length, page, prevPage, setItems]);

  return {
    expanded,
    onPress,
    addPage,
    items,
    renderItem,
  };
};

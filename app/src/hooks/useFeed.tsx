import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import {
  ListRenderItem,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import Config from 'react-native-config';
import { Avatar, Badge, Card, Icon, Text } from 'react-native-elements';
import { createApi } from 'unsplash-js';

import { consoleAxiosError, isAxiosError } from '../api';

import { useCustomTheme } from './useCustomTheme';

const accessKey = Config.UNSPLASH_ACCESS_KEY;
const mapApiKey = Config.MAPS_API_KEY;
const api = createApi({ accessKey });

const getUnique = () => new Date().getTime();

type Orientation = 'landscape' | 'portrait';

const getOrientation = (width: number, height: number): Orientation => {
  return width > height ? 'landscape' : 'portrait';
};

const getHeight = (windowWidth: number, orientation: Orientation): number => {
  const portrait = windowWidth * 0.15;
  const landscape = windowWidth * 0.35;

  return orientation === 'portrait'
    ? windowWidth + portrait
    : windowWidth - landscape;
};

export type UserImage = {
  color: string;
  description: string;
  id: string;
  likedByUser: boolean;
  likes: number;
  links: {
    self: string;
    html: string;
    download: string;
    location: string;
  };
  location: string;
  orientation: Orientation;
  urls: {
    full: string;
    raw: string;
    small: string;
    regular: string;
    thumb: string;
  };
  user: {
    id: string;
    username: string;
    name: string;
    profileImage: {
      small: string;
      medium: string;
      large: string;
    };
  };
};

const defaultLocation = {
  city: 'Oakdale',
  country: 'United States',
  position: {
    latitude: 37.7616911,
    longitude: -120.8715397,
  },
};

const processCollections = async (
  results: any[],
): Promise<UserImage[] | undefined> => {
  try {
    const mapped = Promise.all(
      results.map(async (value, index) => {
        const { response } = await api.photos.get({ photoId: value.id });

        // let results = '';

        //         if (response?.location && response?.location.position) {
        //           const position = response.location.position;
        //
        //           const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.latitude},${position.longitude}&sensor=true&key=${mapApiKey}`;
        //
        //           const { data } = await axios.get(url);
        //
        //           results = data.results[2].formatted_address;
        //
        //           console.log({ results });
        //         }

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

interface Item extends ListRenderItem<UserImage> {
  item: UserImage;
  height: number;
}
interface UseFeed {
  items: UserImage[];
  addPage: () => void;
  renderFeed: ({ item }: Item) => JSX.Element;
}

export const useFeed = (): UseFeed => {
  const [items, setItems] = useState<UserImage[]>([]);
  const { width } = useWindowDimensions();
  const [expanded, setExpanded] = useState(false);
  const {
    theme: { colors },
  } = useCustomTheme();
  const [page, setPage] = useState(1);
  const prevPage = useRef(0);

  const addPage = () => {
    setPage(current => current + 1);
  };

  const handlePress = () => {
    setExpanded(true);
  };

  const renderFeed = ({ item }: Item) => (
    <View
      style={{
        width,
        flexGrow: 0,
        flexShrink: 0,
        alignItems: 'center',
        padding: 0,
        margin: 0,
      }}
    >
      <Card
        wrapperStyle={{ width: '100%' }}
        containerStyle={{
          width: '100%',
          alignItems: 'center',
          top: 0,
          borderWidth: 0,
          padding: 0,
          backgroundColor: colors.background,
        }}
      >
        <View
          style={{ flexDirection: 'row', marginLeft: 8, alignItems: 'center' }}
        >
          <Avatar
            source={{ uri: item.user.profileImage.medium }}
            rounded
            size="medium"
            containerStyle={{ padding: 8 }}
          />
          <Text style={{ fontSize: 16 }}>{item.user.username}</Text>
        </View>
        <Card.Image
          source={{ uri: item.urls.regular }}
          resizeMode="cover"
          style={{
            width,
            height: getHeight(width, item.orientation),
            padding: 0,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 8,
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Icon
            style={{ padding: 8 }}
            type="feather"
            tvParallaxProperties={undefined}
            name="heart"
            color={colors.text}
          />
          <Icon
            type="feather"
            tvParallaxProperties={undefined}
            name="message-circle"
            color={colors.text}
          />
          <Icon
            type="feather"
            style={{ padding: 8 }}
            tvParallaxProperties={undefined}
            name="send"
            color={colors.text}
          />
          <Text>{`CITY: ${item.location}`}</Text>
          <Icon
            type="feather"
            style={{
              padding: 8,
              marginLeft: width - 160,
            }}
            tvParallaxProperties={undefined}
            name="map-pin"
            color={colors.text}
          />
        </View>
        <Text style={{ padding: 8, fontSize: 16, fontWeight: '400' }}>
          {item.likes > 1 ? `${item.likes} Likes` : `${item.likes} Like`}
        </Text>
      </Card>
    </View>
  );

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
    addPage,
    items,
    renderFeed,
  };
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    maxHeight: 700,
    backgroundColor: '#000000',
    // borderColor: '#000000',
    borderwidth: 0,
  },
  avatarWrap: {
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 30,
    bottom: 20,
  },
  cardContainer: {
    width: '100%',
    minHeight: 400,
    maxHeight: 500,
    justifyContent: 'flex-end',
    padding: 10,
  },
});

import React, { FC, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Avatar, Card, Icon, Text } from 'react-native-elements';

import { SearchPhotoResult } from '../../../api/search';
import { CustomTheme } from '../../../hooks';
import Config from 'react-native-config';

export const auth = Config.UNSPLASH_ACCESS_KEY;

interface Styled {
  iconType: string;
  name: string;
}

interface Props {
  theme: CustomTheme;
  item: SearchPhotoResult;
  width: number;
  height: number;
  onPress?: () => void;
}

export const FeedLayout: FC<Props> = ({ theme, item, width, height }) => {
  const [expanded, setExpanded] = useState(false);
  const { colors } = theme;
  const { pad, container, cardContainer, image } = styles;
  const avatarImage = { uri: item.user.profile_image.small };

  const StyledIcon = ({ iconType, name }: Styled) => (
    <Icon style={pad} type={iconType} name={name} color={colors.text} />
  );

  // Sizing all done in the useFeed hook
  const imageUrl = { uri: item.urls.raw };

  const top = {
    ...container,
    width,
  };
  const card = {
    ...cardContainer,
    backgroundColor: colors.background,
  };
  const imageStyle = {
    ...image,
    width,
    height,
  };

  const handlePress = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={top}>
      <Card wrapperStyle={styles.cardWrapper} containerStyle={card}>
        <View style={styles.avatarWrapper}>
          <Avatar
            source={avatarImage}
            rounded
            onPress={handlePress}
            size="medium"
            containerStyle={pad}
          />
          <Text style={styles.username}>{item.user.username}</Text>
        </View>
        <FastImage
          style={{ width, height }}
          source={{
            uri: item.urls.raw,
            headers: { Authorization: `Client-ID ${auth}` },
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.bottomControls}>
          <StyledIcon iconType="feather" name="star" />
          <StyledIcon iconType="fontisto" name="hipchat" />
          <StyledIcon iconType="feather" name="share" />
          <StyledIcon iconType="feather" name="map-pin" />
        </View>
        <Text style={styles.likes}>
          {item.likes > 1 ? `${item.likes} Likes` : `${item.likes} Like`}
        </Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    padding: 0,
    margin: 0,
  },
  cardContainer: {
    width: '100%',
    alignItems: 'center',
    top: 0,
    borderWidth: 0,
    padding: 0,
  },
  avatarWrapper: {
    flexDirection: 'row',
    marginLeft: 8,
    alignItems: 'center',
  },
  cardWrapper: {
    width: '100%',
  },
  pad: { padding: 8 },
  username: { fontSize: 16 },
  image: {
    padding: 0,
  },
  bottomControls: {
    flexDirection: 'row',
    marginLeft: 8,
    alignItems: 'center',
    width: '100%',
  },
  pin: {
    padding: 8,
  },
  likes: {
    padding: 8,
    fontSize: 16,
    fontWeight: '400',
  },
});

import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Card, Icon, Text } from 'react-native-elements';

import { CustomTheme } from '../../../hooks';
import { getHeight, UserImage } from '../utils';

interface Props {
  theme: CustomTheme;
  item: UserImage;
  width: number;
}

export const Feed: FC<Props> = ({ theme, item, width }) => {
  const { colors } = theme;
  const { pad } = styles;
  const avatarImage = { uri: item.user.profileImage.medium };
  const image = { uri: item.urls.regular };

  const top = {
    ...styles.container,
    width,
  };
  const card = {
    ...styles.cardContainer,
    backgroundColor: colors.background,
  };
  const imageStyle = {
    ...styles.image,
    width,
    height: getHeight(width, item.orientation),
  };
  const pin = {
    ...styles.pin,
    marginRight: width - 200,
  };

  return (
    <View style={top}>
      <Card wrapperStyle={styles.cardWrapper} containerStyle={card}>
        <View style={styles.avatarWrapper}>
          <Avatar
            source={avatarImage}
            rounded
            size="medium"
            containerStyle={pad}
          />
          <Text style={styles.username}>{item.user.username}</Text>
        </View>
        <Card.Image source={image} resizeMode="cover" style={imageStyle} />
        <View style={styles.bottomControls}>
          <Icon
            style={pad}
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
            style={pad}
            tvParallaxProperties={undefined}
            name="send"
            color={colors.text}
          />
          <Text>{`CITY: ${item.location}`}</Text>
          <Icon
            type="feather"
            style={pin}
            tvParallaxProperties={undefined}
            name="map-pin"
            color={colors.text}
          />
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
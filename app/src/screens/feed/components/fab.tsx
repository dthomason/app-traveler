import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';

import { useCustomTheme } from '../../../hooks';

interface Icons {
  type: string;
  name: string;
}

const icons = {
  like: {
    type: 'feather',
    name: 'star',
  },
  chat: {
    type: 'fontisto',
    name: 'hipchat',
  },
  share: {
    type: 'feather',
    name: 'share',
  },
  locate: {
    type: 'feather',
    name: 'map-pin',
  },
};

interface Props {
  isExpanded: boolean;
}

export const FeedFab: FC<Props> = ({ isExpanded }) => {
  const { pad } = styles;
  const {
    theme: { colors },
  } = useCustomTheme();
  const iconArray = Object.values(icons);

  return isExpanded ? (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      {iconArray.map(({ type, name }, index) => (
        <Icon
          style={pad}
          key={`${name}${index}`}
          type={type}
          name={name}
          tvParallaxProperties={undefined}
          color={colors.text}
        />
      ))}
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  pad: { padding: 8 },
});

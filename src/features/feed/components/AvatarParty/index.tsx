import React, { FC } from 'react';

import { styles } from './styles';
import { Avatar as AvatarProps } from './types';

import AvatarWithFailSafe from '@ph/comps/AvatarWithFailSafe';
import PartyImage from '../PartyImage';
import { View } from 'react-native';

// List Card Image
const Avatar: FC<AvatarProps> = props => {
  const { party, imageUrl, style } = props;

  const borderStyle = party === 'R' ? styles.republican : styles.democrat;
  const imageSrc = { uri: imageUrl };

  return (
    <View>
      <AvatarWithFailSafe
        party={party}
        source={imageSrc}
        style={[styles.avatar, borderStyle, style]}
      />
      <PartyImage
        party={party}
        height={(style?.height || styles.avatar.width) / 4}
        width={(style?.width || styles.avatar.width) / 4}
        style={[styles.party]}
      />
    </View>
  );
};

export default Avatar;

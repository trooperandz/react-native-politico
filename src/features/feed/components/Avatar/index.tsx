import React, { FC } from 'react';

import AvatarWithFailSafe from '@ph/comps/AvatarWithFailSafe';
import { styles } from './styles';
import { Avatar as AvatarProps } from './types';

// List Card Image
const Avatar: FC<AvatarProps> = props => {
  const { party, imageUrl, style } = props;
  const avatarStyles = [styles.avatar, style];
  const imageSrc = { uri: imageUrl };

  return (
    <AvatarWithFailSafe party={party} source={imageSrc} style={avatarStyles} />
  );
};

export default Avatar;

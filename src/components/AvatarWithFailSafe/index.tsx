import React, { FC, useEffect, useState } from 'react';
import { Avatar as AvatarImage, Icon } from '@ui-kitten/components';

import { styles } from '@ph/feats/feed/components/Avatar/styles';
import { Avatar as AvatarProps } from '@ph/feats/feed/components/Avatar/types';

const AvatarWithFailSafe: FC<AvatarProps> = props => {
  const { party, source, style } = props;
  const [imageDoesExist, setImageDoesExist] = useState(true);
  const imageDoesNotExist = () => setImageDoesExist(false);

  useEffect(() => {
    setImageDoesExist(true);
  }, [source]);

  const borderStyle = party === 'R' ? styles.republican : styles.democrat;
  const avatarStyles = [styles.avatar, borderStyle, style];

  return (
    <>
      {imageDoesExist ? (
        <AvatarImage
          source={source}
          style={avatarStyles}
          onError={imageDoesNotExist}
        />
      ) : (
        <Icon style={avatarStyles} fill="#c5cee0" name="person" />
      )}
    </>
  );
};

export default AvatarWithFailSafe;

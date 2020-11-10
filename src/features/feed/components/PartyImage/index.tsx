import React, { FC } from 'react';

import ElephantIcon from '@ph/assets/elephant.svg';
import DonkeyIcon from '@ph/assets/donkey.svg';
import { PartyImage as PartyImageProps } from './types';
import * as S from './styles';

const PartyImage: FC<PartyImageProps> = props => {
  const { party, width, height, style } = props;

  return (
    <S.Wrapper style={style}>
      {party === 'D' ? (
        <DonkeyIcon
          width={width || 14}
          height={height || 14}
          testID="icon-democratic"
        />
      ) : (
        <ElephantIcon
          width={width || 14}
          height={height || 14}
          testID="icon-republican"
        />
      )}
    </S.Wrapper>
  );
};

export default PartyImage;

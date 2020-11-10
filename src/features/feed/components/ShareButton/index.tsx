import React, { FC } from 'react';
import { Button } from '@ui-kitten/components';

import { ShareButtonProps } from './types';
import * as S from './styles';

const { button } = S.styles;

const ShareButton: FC<ShareButtonProps> = props => {
  const { icon, onPress } = props;
  return <Button status="basic" onPress={onPress} icon={icon} style={button} />;
};

export default ShareButton;

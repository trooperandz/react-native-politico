import React, { FC } from 'react';
import * as S from './styles';
import { TagProps } from './types';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

const TagContent: FC<TagProps> = ({ status, appearance }) => {
  return (
    <S.Tag status={status} appearance={appearance}>
      <S.Text status={status} appearance={appearance}>
        {status}
        {status && appearance ? ' ' : ''}
        {appearance}
      </S.Text>
    </S.Tag>
  );
};

const Tag: FC<TagProps> = ({ status, appearance, onPress }) => {
  return onPress ? (
    <TouchableOpacity onPress={onPress}>
      <TagContent status={status} appearance={appearance} />
    </TouchableOpacity>
  ) : (
    <TouchableWithoutFeedback>
      <TagContent status={status} appearance={appearance} />
    </TouchableWithoutFeedback>
  );
};

export default Tag;

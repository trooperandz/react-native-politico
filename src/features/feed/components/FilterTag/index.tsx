import React, { FC } from 'react';
import { FilterTagProps } from './types';
import { Button } from '@ui-kitten/components';
import * as S from './styles';
const { styles } = S;

const FilterTag: FC<FilterTagProps> = ({ children, isSelected, style }) => {
  return (
    <Button
      size="small"
      style={[style, styles.tag, isSelected && styles.selectedTag]}
      textStyle={[isSelected && styles.selectedText]}>
      {children}
    </Button>
  );
};

export default FilterTag;

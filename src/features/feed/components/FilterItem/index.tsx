import React, { FC } from 'react';
import * as S from './styles';
import { Text, Radio, ListItem } from '@ui-kitten/components';
import { FilterItemProps } from './types';
const { styles } = S;

const FilterItem: FC<FilterItemProps> = ({
  selectedIndex,
  setSelectedIndex,
  index,
}) => {
  return (
    <ListItem onPress={() => setSelectedIndex(index !== undefined ? index : 0)}>
      <Radio
        checked={index === selectedIndex}
        text=""
        style={styles.radio}
        onChange={() => setSelectedIndex(index !== undefined ? index : 0)}
      />
      <S.RepImage source={require('@ph/assets/TED-DAT-BOI.png')} />
      <Text style={styles.repName} category="s1">
        Ted Liu
      </Text>
    </ListItem>
  );
};

export default FilterItem;

import React, { FC, useState } from 'react';
import { Button, Input, List } from '@ui-kitten/components';
import { FilterModalProps } from './types';
import FilterItem from '@ph/feats/feed/components/FilterItem';
import SlideModal from '@ph/comps/SlideModal';
import { SearchOutline } from '@ph/comps/Icons';
import * as S from './styles';
const { styles } = S;

const FilterModal: FC<FilterModalProps> = props => {
  const { isModalVisible, toggleModal } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <SlideModal
      headerText=""
      isModalVisible={isModalVisible}
      toggleModal={toggleModal}>
      <Input
        placeholder="Search followed represenitives"
        icon={SearchOutline}
        style={styles.search}
      />
      <List
        data={new Array(4)}
        renderItem={() => (
          <FilterItem
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        )}
        style={styles.list}
      />
      <Button size="large" onPress={toggleModal}>
        Save
      </Button>
    </SlideModal>
  );
};

export default FilterModal;

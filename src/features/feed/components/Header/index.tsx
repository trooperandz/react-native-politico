import React, { useState } from 'react';
import { View } from 'react-native';

import FilterModal from '@ph/feats/feed/components/FilterModal';
import LogoImage from '@ph/assets/logo.svg';
import { FeedLogoWrapper } from '@ph/feats/app/styles';
import { styles } from './styles';

const Header = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.header}>
      <FeedLogoWrapper>
        <LogoImage width={90} height={25} />
      </FeedLogoWrapper>
      <FilterModal isModalVisible={isModalVisible} toggleModal={toggleModal} />
    </View>
  );
};

export default Header;

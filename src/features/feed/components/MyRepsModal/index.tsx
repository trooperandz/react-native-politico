import React from 'react';
import { ScrollView } from 'react-native';

import SlideModal from '@ph/comps/SlideModal';
import { RepresentativeProfile } from '@ph/feats/feed/types';
import RepresentativesScrollList from '@ph/feats/search/components/RepresentativesScrollList';

const MyRepsModal = ({
  isModalVisible,
  toggleModal,
  representatives,
}: {
  isModalVisible: boolean;
  toggleModal: () => void;
  representatives: RepresentativeProfile[];
}) => {
  const shouldAllowScroll = representatives.length > 8;

  return (
    <SlideModal
      headerText=""
      isModalVisible={isModalVisible}
      toggleModal={toggleModal}>
      <ScrollView scrollEnabled={shouldAllowScroll}>
        <RepresentativesScrollList
          representatives={representatives}
          postOnPress={toggleModal}
        />
      </ScrollView>
    </SlideModal>
  );
};

export default MyRepsModal;

import React, { FC } from 'react';
import { View } from 'react-native';

import RepresentativeCard from '@ph/feats/feed/components/RepresentativeCard';
import { List, Spinner } from '@ui-kitten/components';
import { RepresentativesList as RepresentativesListProps } from './types';
import { RepresentativeVote } from '@ph/feats/feed/types';
import { styles } from '@ph/feats/feed/styles';

const RepresentativesList: FC<RepresentativesListProps> = props => {
  const {
    representativeVotes,
    onEndReached,
    isLoadingMoreRecords,
    onMomentumScrollEnd,
  } = props;

  return (
    <List
      contentContainerStyle={styles.listContainer}
      data={representativeVotes}
      renderItem={({ item }: { item: RepresentativeVote }) => (
        <RepresentativeCard item={item} />
      )}
      onEndReached={onEndReached}
      onMomentumScrollEnd={onMomentumScrollEnd}
      onEndReachedThreshold={0.1}
      initialNumToRender={15}
      ListFooterComponent={() => (
        <View style={styles.listFooter}>
          {isLoadingMoreRecords && <Spinner size="large" />}
        </View>
      )}
    />
  );
};

export default RepresentativesList;

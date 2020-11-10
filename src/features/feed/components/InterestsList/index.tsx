import React, { FC } from 'react';
import { View } from 'react-native';

import { List, Spinner } from '@ui-kitten/components';
import InterestCard from '@ph/feats/feed/components/InterestCard';
import { InterestsList as InterestsListProps } from './types';
import { styles } from '@ph/feats/feed/styles';

const InterestsList: FC<InterestsListProps> = props => {
  const {
    bills,
    billIds,
    onEndReached,
    isLoadingMoreRecords,
    onMomentumScrollEnd,
  } = props;

  return (
    <List
      contentContainerStyle={styles.listContainer}
      data={billIds}
      renderItem={({ item }: { item: string }) => (
        <InterestCard item={bills[item]} />
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

export default InterestsList;

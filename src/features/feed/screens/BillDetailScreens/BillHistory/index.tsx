import React, { FC } from 'react';
import { Layout, List } from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import moment from 'moment';

import SkeletonBillHistory from './SkeletonBillHistory';
import { BillDetailTabsNavProps } from '@ph/navs/BillDetailTabs/types';
import { FeedSliceState, BillHistory as BillHistoryType } from '@ph/feats/feed/types';
import * as S from './styles';

const { styles } = S;

const HistoryRecord = ({ item }: { item: BillHistoryType }) => {
  return (
    <S.HistoryContainer>
      <S.BillDate>{moment(item.acted_at).format('MM/DD/YYYY')}</S.BillDate>
      <S.BillText>{item.text}</S.BillText>
    </S.HistoryContainer>
  );
}

const BillHistory: FC<BillDetailTabsNavProps<any>> = ({ route }) => {
  const {
    billId,
  } = route.params;

  const billDetails = useSelector(
    (state: FeedSliceState) => state.feed.billDetails,
  );

  const currentBillHistory = billDetails[billId]?.actions;
  
  return (
    <Layout style={{ flex: 1 }}>
      {currentBillHistory ? (
        <List 
          contentContainerStyle={styles.listStyle}  
          data={currentBillHistory}
          renderItem={({ item }: { item: BillHistoryType }) => (
            <HistoryRecord item={item} />
          )}
        />
      ) : (
        <SkeletonBillHistory />
      )}
    </Layout>
  );
}

export default BillHistory;

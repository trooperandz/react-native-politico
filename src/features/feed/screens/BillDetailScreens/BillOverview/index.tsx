import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Linking } from 'react-native';
import { Text, Layout } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';

import { BillDetailTabsNavProps } from '@ph/navs/BillDetailTabs/types';
import { FeedSliceState } from '@ph/feats/feed/types';
import * as S from './styles';

const {
  container,
  title,
  billSummary,
  overview,
  disclaimer,
  noSummary,
} = S.styles;

const BillOverview: FC<BillDetailTabsNavProps<any>> = ({ route }) => {
  const { billId, billTitle, billSummaryText, billSummaryDate } = route.params;

  const billDetails = useSelector(
    (state: FeedSliceState) => state.feed.billDetails,
  );
  const billUrl = billDetails[billId]?.billUrl;
  const date = moment(billSummaryDate).format('MMMM Do, YYYY');

  const handleOnLinkPress = () => Linking.openURL(`${billUrl}`);

  return (
    <Layout style={container}>
      <ScrollView style={overview}>
        <Text style={title} category="h5">
          {billTitle}
        </Text>
        {billUrl ? (
          <S.LinkTouch onPress={handleOnLinkPress}>
            <S.Link>View full bill</S.Link>
          </S.LinkTouch>
        ) : null}
        {billSummaryText ? (
          <>
            <Text category="p1" style={billSummary}>
              {billSummaryText}
            </Text>
            <Text category="p1" appearance="hint" style={disclaimer}>
              The summary above was written by the Congressional Research
              Service, which is a nonpartisan division of the Library of
              Congress
              {billSummaryDate ? `, and was published on ${date}` : '.'}.
            </Text>
          </>
        ) : (
          <Text category="p1" style={noSummary}>
            The Congressional Research Service has not yet provided a summary
            for this bill.
          </Text>
        )}  
      </ScrollView>
    </Layout>
  );
};

export default BillOverview;

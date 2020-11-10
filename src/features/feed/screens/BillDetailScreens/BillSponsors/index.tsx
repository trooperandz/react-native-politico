import React, { FC, useEffect, useState } from 'react';
import { Text, Layout, List } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';

import CosponsorCard from './CosponsorCard';
import AvatarParty from '@ph/feats/feed/components/AvatarParty';
import SkeletonBillSponsors from './SkeletonBillSponsors';
import { fetchBillDetails } from '@ph/feats/feed/feedSlice';
import { AuthSliceState } from '@ph/feats/auth/types';
import { FeedSliceState, BillCosponsor } from '@ph/feats/feed/types';
import { BillDetailTabsNavProps } from '@ph/navs/BillDetailTabs/types';
import { styles as sharedStyles } from '@ph/feats/feed/styles';
import * as S from './styles';

const { avatar, container } = S.styles;

const BillSponsors: FC<BillDetailTabsNavProps<any>> = ({ route }) => {
  const {
    billId,
    billSponsorParty,
    billSponsorImageUrl,
    billSponsorFullName,
    billSponsorState,
    billSponsorDistrict,
  } = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const { uid } = useSelector((state: AuthSliceState) => state.auth.user);
  const billDetails = useSelector(
    (state: FeedSliceState) => state.feed.billDetails,
  );
  const dispatch = useDispatch();

  const currentBillCosponsorsRecord = billDetails[billId]?.cosponsors;

  useEffect(() => {
    if (!currentBillCosponsorsRecord) {
      setIsLoading(true);

      dispatch(
        fetchBillDetails(
          {
            BillID: billId,
            UserID: uid,
            ReturnShort: true,
          },
          () => setIsLoading(false),
        ),
      );
    }
  }, [currentBillCosponsorsRecord, uid, billId, dispatch]);

  return (
    <Layout style={container}>
      <S.HeaderWrapper>
        <AvatarParty
          party={billSponsorParty}
          imageUrl={billSponsorImageUrl}
          style={avatar}
        />
        <S.TitleWrapper>
          <Text numberOfLines={1} category="h4">
            {billSponsorFullName}
          </Text>
          <Text category="s1" appearance="hint">
            {`${billSponsorState} ${billSponsorDistrict || ''}`}
          </Text>
        </S.TitleWrapper>
      </S.HeaderWrapper>
      {isLoading ? (
        <SkeletonBillSponsors />
      ) : (
        currentBillCosponsorsRecord?.length ? (
          <List
            data={currentBillCosponsorsRecord}
            renderItem={({ item }: { item: BillCosponsor }) => (
              <CosponsorCard cosponsor={item} />
            )}
            contentContainerStyle={sharedStyles.listContainer}
          />
        ) : (
          <Layout style={sharedStyles.listContainer}>
            <S.CosponsorText>
              There are currently no cosponsors for this bill.
            </S.CosponsorText>
          </Layout>
        )
      )}
    </Layout>
  );
};

export default BillSponsors;

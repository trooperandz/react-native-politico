import React, { FC, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '@ui-kitten/components';

import { fetchRepresentativeProfile } from '@ph/feats/feed/feedSlice';
import { AuthSliceState } from '@ph/feats/auth/types';
import { FeedSliceState } from '@ph/feats/feed/types';
import ShareIconBar from '@ph/feats/feed/components/ShareIconBar';
import SkeletonRepSummary from './SkeletonRepSummary';
import { RepDetailTabsNavProps } from '@ph/navs/RepDetailTabs/types';
import * as S from './styles';
import analytics from '@react-native-firebase/analytics';

const { styles } = S;

// TODO: need a skeleton loading screen
const RepSummary: FC<RepDetailTabsNavProps<'RepBillVotes' | 'RepSummary'>> = ({
  route,
}) => {
  analytics().setCurrentScreen('Rep Detail Summary');
  const { representativeId } = route.params;

  const dispatch = useDispatch();
  const uid = useSelector((state: AuthSliceState) => state.auth.user.uid);
  const representativeProfiles = useSelector(
    (state: FeedSliceState) => state.feed.representativeProfiles,
  );
  const currentRepresentativeProfile = representativeProfiles[representativeId];

  useEffect(() => {
    if (representativeId && !currentRepresentativeProfile) {
      dispatch(
        fetchRepresentativeProfile({
          Member: representativeId,
          UserID: uid,
          ReturnShort: true,
        }),
      );
    }
  }, [dispatch, representativeId, currentRepresentativeProfile, uid]);

  return (
    <>
      {currentRepresentativeProfile ? (
        <S.Container>
          <ScrollView contentContainerStyle={styles.containerStyle}>
            <Layout style={styles.containerStyle}>
              <S.Row>
                <S.BoxWrapper>
                  <S.CardStatistic>
                    {currentRepresentativeProfile.total_votes}
                  </S.CardStatistic>
                  <S.CardTitle category="">Total Votes</S.CardTitle>
                </S.BoxWrapper>
                <S.BoxWrapper>
                  <S.CardStatistic>
                    {currentRepresentativeProfile.EnactedBills}
                  </S.CardStatistic>
                  <S.CardTitle>Enacted Bills</S.CardTitle>
                </S.BoxWrapper>
              </S.Row>
              <S.Row>
                <S.BoxWrapper>
                  <S.CardStatistic>
                    {currentRepresentativeProfile.TotalBills}
                  </S.CardStatistic>
                  <S.CardTitle>Total Bills</S.CardTitle>
                </S.BoxWrapper>
                <S.BoxWrapper>
                  <S.CardStatistic>
                    {currentRepresentativeProfile.votes_with_party_pct}%
                  </S.CardStatistic>
                  <S.CardTitle>Partyline Votes</S.CardTitle>
                </S.BoxWrapper>
              </S.Row>
            </Layout>
            <ShareIconBar
              style={styles.shareIconBarStyle}
              emailUrl={currentRepresentativeProfile.url}
              phoneNumber={currentRepresentativeProfile.phone}
              twitterSlug={currentRepresentativeProfile.twitter_account}
              facebookSlug={currentRepresentativeProfile.facebook_account}
              shareUri={null}
            />
          </ScrollView>
        </S.Container>
      ) : (
        <SkeletonRepSummary />
      )}
    </>
  );
};

export default RepSummary;

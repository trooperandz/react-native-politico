import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RepresentativesList from '@ph/feats/feed/components/RepresentativesList';
import { fetchRepresentativeDetailVotes } from '@ph/feats/feed/feedSlice';
import { SkeletonRepresentativesFeed } from '@ph/feats/feed/components/SkeletonFeed';
import { RepDetailTabsNavProps } from '@ph/navs/RepDetailTabs/types';
import { FeedSliceState } from '@ph/feats/feed/types';
import { AuthSliceState } from '@ph/feats/auth/types';
import analytics from '@react-native-firebase/analytics';
const RepBillVotes: FC<
  RepDetailTabsNavProps<'RepBillVotes' | 'RepSummary'>
> = ({ route }) => {

  analytics().setCurrentScreen('Rep Detail', 'Rep Detail');
  const [isLoadingMoreRecords, setIsLoadingMoreRecords] = useState(false);
  const [
    shouldCallOnMomentumScrollEnd,
    setShouldCallOnMomentumScrollEnd,
  ] = useState(false);

  const dispatch = useDispatch();
  const uid = useSelector((state: AuthSliceState) => state.auth.user.uid);
  const representativeDetailVotes = useSelector(
    (state: FeedSliceState) => state.feed.representativeDetailVotes,
  );

  const {
    params: {
      representativeId,
    },
  } = route;

  const currentRepresentativeRecord = representativeDetailVotes[representativeId];
  const currentRepresentativeVotes = currentRepresentativeRecord?.votes;
  const currentRepresentativePageCount = currentRepresentativeRecord?.pageCount;

  const requestParams = {
    Members: [`${representativeId}`],
    Page: 1,
    VotesPerPage: 15,
    SortedBy: 'Newest',
    ByUser: false,
    UserID: uid,
    ReturnShort: true,
  };

  useEffect(() => {
    if (representativeId && !currentRepresentativeRecord) {
      dispatch(fetchRepresentativeDetailVotes({ ...requestParams }));
    }
  }, [dispatch, representativeId, currentRepresentativeRecord, requestParams]);

  const handleOnMomentumScrollEnd = () => {
    if (shouldCallOnMomentumScrollEnd) {
      setIsLoadingMoreRecords(true);

      dispatch(
        fetchRepresentativeDetailVotes(
          { ...requestParams, Page: currentRepresentativePageCount + 1 },
          () => {
            setIsLoadingMoreRecords(false);
            setShouldCallOnMomentumScrollEnd(false);
          },
        ),
      );
    }
  };

  const handleOnEndReached = () => {
    setShouldCallOnMomentumScrollEnd(true);
  };

  return (
    <>
      {currentRepresentativeVotes ? (
        <RepresentativesList
          representativeVotes={currentRepresentativeVotes}
          isLoadingMoreRecords={isLoadingMoreRecords}
          onEndReached={handleOnEndReached}
          onMomentumScrollEnd={handleOnMomentumScrollEnd}
        />
      ) : (
        <SkeletonRepresentativesFeed />
      )}
    </>
  );
};

export default RepBillVotes;

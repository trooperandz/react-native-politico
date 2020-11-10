import React, { useState, useEffect } from 'react';
import analytics from '@react-native-firebase/analytics';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '@ui-kitten/components';

import EmptyResultsMessageCard from '@ph/feats/feed/components/EmptyResultsMessageCard';
import InterestsList from '@ph/feats/feed/components/InterestsList';
import { SkeletonInterestsFeed } from '@ph/feats/feed/components/SkeletonFeed';
import InterestSelection from './InterestSelection';
import { fetchBookmarkedBills, fetchInterests } from '@ph/feats/feed/feedSlice';
import { FeedSliceState } from '@ph/feats/feed/types';
import { AuthSliceState } from '@ph/feats/auth/types';
import { usePreviousValue } from '@ph/feats/feed/hooks/usePreviousValue';
import { styles } from './styles';

const InterestsScreen = ({ route }) => {
  analytics().setCurrentScreen('InterestsScreen', 'InterestsScreen');
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarksFetched, setIsBookmarksFetched] = useState(false);
  const [isLoadingMoreRecords, setIsLoadingMoreRecords] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [
    shouldCallOnMomentumScrollEnd,
    setShouldCallOnMomentumScrollEnd,
  ] = useState(false);

  // Gather Analytics for which user is on the interest screen
  // this can be useful to identify the process of the user
  // i.e bugs associated with a user on the interest screen
  const user = auth().currentUser;
  analytics().setUserId(user ? user.email : null);
  analytics().setUserProperties({ ['username']: user ? user.email : null });
  const dispatch = useDispatch();

  const { uid } = useSelector((state: AuthSliceState) => state.auth.user);
  const { myInterests } = useSelector(
    (state: AuthSliceState) => state.auth.user,
  );
  const billsNormalized = useSelector(
    (state: FeedSliceState) => state.feed.billsNormalized,
  );
  const billInterestIds = useSelector(
    (state: FeedSliceState) => state.feed.billsNormalized.interestIds,
  );
  const bookmarkedBillIds = useSelector(
    (state: FeedSliceState) => state.feed.billsNormalized.bookmarkedBillIds,
  );
  const showBookmarksAndFollowsOnly = useSelector(
    (state: FeedSliceState) => state.feed.showBookmarksAndFollowsOnly,
  );

  console.log({ billsNormalized });
  const billIds = showBookmarksAndFollowsOnly
    ? bookmarkedBillIds
    : billInterestIds;
  console.log({ billIds });
  const previousPageCount = usePreviousValue(pageCount);

  const requestParams = {
    Subjects: myInterests,
    Page: pageCount,
    EntriesPerPage: 15,
    SortedBy: 'Newest',
    UserID: uid,
    ReturnShort: true,
  };

  useEffect(() => {
    if (myInterests && myInterests.length > 0) {
      setIsLoading(true);
      let isSubscriptionCanceled = false;

      function fetchData() {
        if (!isSubscriptionCanceled) {
          dispatch(fetchInterests(requestParams, () => setIsLoading(false)));
        }
      }

      fetchData();

      return () => {
        isSubscriptionCanceled = true;
      };
    }
  }, [myInterests]);

  useEffect(() => {
    if (!isBookmarksFetched && billsNormalized.hasOwnProperty('entities')) {
      dispatch(
        fetchBookmarkedBills(
          {
            Subjects: [],
            Page: 1,
            EntriesPerPage: 1000,
            SortedBy: 'Newest',
            UserID: uid,
            ReturnShort: true,
          },
          () => setIsBookmarksFetched(true),
        ),
      );
    }
  }, [billsNormalized]);

  const handleOnMomentumScrollEnd = () => {
    if (shouldCallOnMomentumScrollEnd) {
      setPageCount(previousPageCount + 1);
      setIsLoadingMoreRecords(true);

      dispatch(
        fetchInterests(
          { ...requestParams, Page: previousPageCount + 1 },
          () => {
            setIsLoadingMoreRecords(false);
            setShouldCallOnMomentumScrollEnd(false);
          },
        ),
      );
    }
  };

  const handleOnEndReached = () => {
    // No pagination/endless scrolling needed for bookmarks list
    if (!showBookmarksAndFollowsOnly) {
      setShouldCallOnMomentumScrollEnd(true);
    }
  };

  if (!myInterests || myInterests.length === 0) {
    return <InterestSelection />;
  }

  return (
    <Layout style={styles.container}>
      {isLoading ? (
        <SkeletonInterestsFeed />
      ) : showBookmarksAndFollowsOnly && billIds.length === 0 ? (
        <EmptyResultsMessageCard routeName={route.name} />
      ) : (
        <>
          <InterestsList
            bills={billsNormalized.entities}
            billIds={billIds}
            isLoadingMoreRecords={isLoadingMoreRecords}
            onEndReached={handleOnEndReached}
            onMomentumScrollEnd={handleOnMomentumScrollEnd}
          />
        </>
      )}
    </Layout>
  );
};

export default InterestsScreen;

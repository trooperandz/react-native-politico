import React, { useState, useEffect } from 'react';
import { Layout } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';

import EmptyResultsMessageCard from '@ph/feats/feed/components/EmptyResultsMessageCard';
import { SkeletonRepresentativesFeed } from '@ph/feats/feed/components/SkeletonFeed';
import RepresentativesList from '@ph/feats/feed/components/RepresentativesList';
import { fetchRepresentativeVotes } from '@ph/feats/feed/feedSlice';
import { usePreviousValue } from '@ph/feats/feed/hooks/usePreviousValue';
import {
  FeedSliceState,
  RepresentativesRequestParams,
} from '@ph/feats/feed/types';
import { AuthSliceState } from 'features/auth/types';
import { styles } from './styles';

const RepresentativesScreen = ({ route }) => {
  const [isLoadingMoreRecords, setIsLoadingMoreRecords] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [
    shouldCallOnMomentumScrollEnd,
    setShouldCallOnMomentumScrollEnd,
  ] = useState(false);

  const dispatch = useDispatch();

  const isLoadingVotes = useSelector(
    (state: FeedSliceState) => state.feed.isLoadingVotes,
  );
  const representativeVotes = useSelector(
    (state: FeedSliceState) => state.feed.representativeVotes,
  );
  const followedRepVotes = useSelector(
    (state: FeedSliceState) => state.feed.followedRepVotes,
  );
  const showBookmarksAndFollowsOnly = useSelector(
    (state: FeedSliceState) => state.feed.showBookmarksAndFollowsOnly,
  );
  const { myRepresentatives, uid } = useSelector(
    (state: AuthSliceState) => state.auth.user,
  );
  const repVotesToShow = showBookmarksAndFollowsOnly
    ? followedRepVotes
    : representativeVotes;

  const previousPageCount = usePreviousValue(pageCount);
  const requestParams: RepresentativesRequestParams = {
    Members: myRepresentatives,
    Page: pageCount,
    VotesPerPage: 15,
    SortedBy: 'Newest',
    ByUser: false,
    UserID: uid,
    ReturnShort: true,
  };

  useEffect(() => {
    let isSubscriptionCanceled = false;

    function fetchData() {
      if (!isSubscriptionCanceled) {
        dispatch(
          fetchRepresentativeVotes(
            { ...requestParams, showLoading: true },
            () => {},
          ),
        );
      }
    }

    fetchData();

    return () => {
      isSubscriptionCanceled = true;
    };
  }, []);

  const handleOnMomentumScrollEnd = () => {
    if (shouldCallOnMomentumScrollEnd) {
      setPageCount(previousPageCount + 1);
      setIsLoadingMoreRecords(true);

      dispatch(
        fetchRepresentativeVotes(
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
    setShouldCallOnMomentumScrollEnd(true);
  };

  return (
    <Layout style={styles.container}>
      {isLoadingVotes ? (
        <SkeletonRepresentativesFeed />
      ) : showBookmarksAndFollowsOnly && repVotesToShow.length === 0 ? (
        <EmptyResultsMessageCard routeName={route.name} />
      ) : (
        <RepresentativesList
          representativeVotes={repVotesToShow}
          isLoadingMoreRecords={isLoadingMoreRecords}
          onEndReached={handleOnEndReached}
          onMomentumScrollEnd={handleOnMomentumScrollEnd}
        />
      )}
    </Layout>
  );
};

export default RepresentativesScreen;

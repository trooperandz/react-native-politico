import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TabNavigationState } from '@react-navigation/routers/src/TabRouter';
import { Toggle } from '@ui-kitten/components';

import AvatarWithFailSafe from '@ph/comps/AvatarWithFailSafe';
import MyRepsModal from '@ph/feats/feed/components/MyRepsModal';
import InterestsSelectionModal from '@ph/feats/feed/components/InterestsSelectionModal';
import {
  fetchMyRepresentativeProfiles,
  fetchBookmarksAndFollows,
  updateShowBookmarksAndFollowsOnly,
} from '@ph/feats/feed/feedSlice';
import { AuthSliceState } from '@ph/feats/auth/types';
import { FeedSliceState, RepresentativeProfile } from 'features/feed/types';
import FilterIcon from '@ph/assets/filter.svg';
import * as S from './styles';

const maxBubbles = 4;

const FeedFilterBar: FC<{
  navigationState: TabNavigationState;
}> = ({ navigationState }) => {
  const { index, routeNames } = navigationState;
  const uid = useSelector((state: AuthSliceState) => state.auth.user.uid);
  const myRepresentativeIds = useSelector(
    (state: AuthSliceState) => state.auth.user.myRepresentatives,
  );
  const followedRepIds = useSelector(
    (state: FeedSliceState) => state.feed.followedRepIds,
  );
  const { myInterests } = useSelector(
    (state: AuthSliceState) => state.auth.user,
  );
  const showBookmarksAndFollowsOnly = useSelector(
    (state: FeedSliceState) => state.feed.showBookmarksAndFollowsOnly,
  );
  const myRepresentativeProfiles = useSelector(
    (state: FeedSliceState) => state.feed.myRepresentativeProfiles,
  );
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isInterestsSelectionModalVisible, setIsInterestsSelectionModalVisible] = useState(false);
  const [isToggleOn, setIsToggleOn] = useState(showBookmarksAndFollowsOnly);

  useEffect(() => {
    if (myRepresentativeIds && myRepresentativeIds.length) {
      myRepresentativeIds.forEach(representativeId =>
        dispatch(
          fetchMyRepresentativeProfiles({
            Member: representativeId,
            UserID: uid,
            ReturnShort: true,
          }),
        ),
      );
    }
  }, [myRepresentativeIds, uid, dispatch]);

  useEffect(() => {
    if (followedRepIds && followedRepIds.length) {
      followedRepIds.forEach(representativeId =>
        dispatch(
          fetchMyRepresentativeProfiles({
            Member: representativeId,
            UserID: uid,
            ReturnShort: true,
          }),
        ),
      );
    }
  }, [followedRepIds, uid, dispatch]);

  useEffect(() => {
    dispatch(fetchBookmarksAndFollows({ UserID: uid }));
  }, []);

  const onCheckedChange = (isChecked: boolean) => {
    setIsToggleOn(isChecked);
    dispatch(updateShowBookmarksAndFollowsOnly(isChecked));
  };

  const repBubbles: RepresentativeProfile[] = [];

  // Determine which representative bubbles to show
  if (showBookmarksAndFollowsOnly) {
    Object.keys(myRepresentativeProfiles).forEach(representativeId => {
      if (followedRepIds.includes(representativeId)) {
        repBubbles.push(myRepresentativeProfiles[representativeId]);
      }
    });
  } else {
    Object.keys(myRepresentativeProfiles).forEach((representativeId: string) =>
      repBubbles.push(myRepresentativeProfiles[representativeId]),
    );
  }

  const needsAdditional: boolean = repBubbles.length - maxBubbles > 0;
  const additionalCount: number | null = needsAdditional
    ? repBubbles.length - maxBubbles
    : null;

  const toggleModal = () => setIsModalVisible(!isModalVisible);
  const toggleInterestsSelectionModal = () => 
    setIsInterestsSelectionModalVisible(!isInterestsSelectionModalVisible);

  const getShowText = () => {
    let text = '';

    if (routeNames[index] === 'Interests') {
      text = 'Show Bookmarks';
      if (isToggleOn) {
        text = 'Bookmarks';
      }
    } else if (routeNames[index] === 'Representatives') {
      text = 'Show Followed';
      if (isToggleOn) {
        text = 'Follows';
      }
    }
    
    return text;
  };

  const BookmarksAndFollows = () => (
    <S.BookmarksAndFollowsContainer>
      <Toggle checked={isToggleOn} onChange={onCheckedChange} />
      <S.ShowText category={isToggleOn ? 'c2' : 'c1'}>
        {getShowText()}
      </S.ShowText>
    </S.BookmarksAndFollowsContainer>
  );

  const Avatars = () => (
    <S.AvatarWrapper>
      {repBubbles.slice(0, maxBubbles).map((rep, i, repArr) => {
        return (
          <AvatarWithFailSafe
            key={rep.id}
            party={rep.party}
            source={{ uri: rep.fixedsize }}
            style={avatarStyle(i, repArr.length)}
          />
        );
      })}
    </S.AvatarWrapper>
  );

  return (
    <>
      {routeNames[index] === 'Interests' ? (
        myInterests?.length && (
        <>
          <S.FilterContainer>
            <BookmarksAndFollows />
            {!showBookmarksAndFollowsOnly ? (
              <S.FilterTouch onPress={toggleInterestsSelectionModal}>
                <FilterIcon height={32} width={32} fill="#3366ff" />
              </S.FilterTouch>
              ) : null
            }
          </S.FilterContainer>
        </>
        )
      ) : (
        <>
          <S.FilterContainer>
            <BookmarksAndFollows />
            <S.BubblesButton onPress={toggleModal}>
              {repBubbles.length ? <Avatars /> : null}
              {needsAdditional ? (
                <S.RepCountWraper>
                  <S.RepCountText category="s1">{`+ ${additionalCount}`}</S.RepCountText>
                </S.RepCountWraper>
              ) : null}
            </S.BubblesButton>
          </S.FilterContainer>
        </>
      )}
      <MyRepsModal
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        representatives={repBubbles}
      />
      <InterestsSelectionModal 
        isModalVisible={isInterestsSelectionModalVisible} 
        toggleModal={toggleInterestsSelectionModal} 
      />
    </>
  );
};

const avatarStyle = (i: number, total: number) => ({
  height: 38,
  width: 38,
  borderRadius: 19,
  transform: [{ translateX: -15 * (1 + i - total) }],
});

export default FeedFilterBar;

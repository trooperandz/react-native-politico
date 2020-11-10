import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AcceptanceSlider, {
  getSliderValue,
} from '@ph/feats/feed/components/AcceptanceSlider';
import ThumbsUpImage from '@ph/assets/thumbs-up.svg';
import ThumbsUpActiveImage from '@ph/assets/thumbs-up-active.svg';
import ThumbsDownImage from '@ph/assets/thumbs-down.svg';
import ThumbsDownActiveImage from '@ph/assets/thumbs-down-active.svg';
import { registerVoteReaction } from '@ph/feats/feed/feedSlice';
import { RepresentativeVote } from '@ph/feats/feed/types';
import { AuthSliceState } from '@ph/feats/auth/types';
import * as S from './styles';

type RatingsProps = {
  representativeVote: RepresentativeVote;
};

const { styles } = S;
const THUMB_WIDTH = 36;

const Ratings: FC<RatingsProps> = ({ representativeVote }) => {
  const sliderValue = getSliderValue(
    representativeVote.Member.NumUp,
    representativeVote.Member.NumDown,
  );
  const isThumbsDownActive = representativeVote.UserResponse?.reaction === 'DOWN';
  const isThumbsUpActive = representativeVote.UserResponse?.reaction === 'UP';

  const dispatch = useDispatch();
  const user = useSelector((state: AuthSliceState) => state.auth.user);

  const handleThumbsUpPress = () => {
    let reaction = 'UP';

    if (isThumbsUpActive) {
      reaction = 'CANCEL_UP';
    }

    dispatch(
      registerVoteReaction({
        Reaction: reaction,
        Member: representativeVote.Member.id,
        VoteID: representativeVote._id,
        BillID: representativeVote.bill_id,
        UserID: user.uid,
      }),
    );
  };

  const handleThumbsDownPress = () => {
    let reaction = 'DOWN';

    if (isThumbsDownActive) {
      reaction = 'CANCEL_DOWN';
    }

    dispatch(
      registerVoteReaction({
        Reaction: reaction,
        Member: representativeVote.Member.id,
        VoteID: representativeVote._id,
        BillID: representativeVote.bill_id,
        UserID: user.uid,
      }),
    );
  };

  return (
    <S.Container>
      <S.ThumbsDownWrapper
        onPress={handleThumbsDownPress}
        active={isThumbsDownActive}>
        {representativeVote.UserResponse?.reaction === 'DOWN' ? (
          <ThumbsDownActiveImage width={THUMB_WIDTH} height={THUMB_WIDTH} />
        ) : (
          <ThumbsDownImage width={THUMB_WIDTH} height={THUMB_WIDTH} />
        )}
      </S.ThumbsDownWrapper>
      <View>
        <AcceptanceSlider value={sliderValue} style={styles} />
        <S.MeterText>Thoughts on this vote?</S.MeterText>
      </View>
      <S.ThumbsUpWrapper
        onPress={handleThumbsUpPress}
        active={isThumbsUpActive}>
        {representativeVote.UserResponse?.reaction === 'UP' ? (
          <ThumbsUpActiveImage width={THUMB_WIDTH} height={THUMB_WIDTH} />
        ) : (
          <ThumbsUpImage width={THUMB_WIDTH} height={THUMB_WIDTH} />
        )}
      </S.ThumbsUpWrapper>
    </S.Container>
  );
};

export default Ratings;

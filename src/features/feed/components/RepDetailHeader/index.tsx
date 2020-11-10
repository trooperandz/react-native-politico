import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Text } from '@ui-kitten/components';

import AvatarWithFailSafe from '@ph/comps/AvatarWithFailSafe';
import { ChevronLeftOutline, PersonAdd } from '@ph/comps/Icons';
import PartyImage from '@ph/feats/feed/components/PartyImage';
import { setFollowedRep } from '@ph/feats/feed/feedSlice';
import { FeedSliceState } from '@ph/feats/feed/types';
import { RepDetailHeader as RepDetailHeaderProps } from './types';
import * as S from './styles';

const { styles } = S;

const RepDetailHeader: FC<RepDetailHeaderProps> = props => {
  const { onPress, title, subtitle, imageUrl, party, representativeId } = props;
  const dispatch = useDispatch();
  const followedRepIds = useSelector(
    (state: FeedSliceState) => state.feed.followedRepIds,
  );
  const isFollowed = followedRepIds.includes(representativeId);

  const toggleFollowed = () =>
    dispatch(
      setFollowedRep(
        { Member: representativeId, newFollowStatus: !isFollowed },
        () => {},
      ),
    );

  return (
    <Layout>
      <S.HeaderWrapper>
        <TouchableOpacity onPress={() => onPress()}>
          <ChevronLeftOutline width={30} height={30} fill="#3366ff" />
        </TouchableOpacity>
        <S.TitleWrapper>
          <Text category="s1">{title}</Text>
          <Text category="s2" style={styles.subtitle}>
            {subtitle}
          </Text>
        </S.TitleWrapper>
        <TouchableOpacity onPress={toggleFollowed}>
          <PersonAdd
            width={30}
            height={30}
            fill={isFollowed ? '#3366ff' : '#8F9BB3'}
          />
        </TouchableOpacity>
      </S.HeaderWrapper>
      <S.ImageWrapper>
        <S.AvatarWrapper>
          <AvatarWithFailSafe
            party={party}
            source={{ uri: imageUrl }}
            style={styles.avatarStyle}
          />
          <PartyImage
            party={party}
            width={20}
            height={20}
            style={styles.partyImage}
          />
        </S.AvatarWrapper>
      </S.ImageWrapper>
    </Layout>
  );
};

export default RepDetailHeader;

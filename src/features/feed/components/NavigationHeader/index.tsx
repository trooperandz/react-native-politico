import React, { FC } from 'react';
import { Text } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { setBookmarkedBill } from '@ph/feats/feed/feedSlice';
import { ChevronLeftOutline, BookmarkOutline } from '@ph/comps/Icons';
import { FeedSliceState } from '@ph/feats/feed/types';
import { NavigationHeader as NavigationHeaderProps } from './types';
import * as S from './styles';

const NavigationHeader: FC<NavigationHeaderProps> = props => {
  const { onPress, title, subtitle, billId, fullBill } = props;
  const dispatch = useDispatch();

  const bookmarkedBillIds = useSelector(
    (state: FeedSliceState) => state.feed.bookmarkedBillIds,
  );
  const isBookmarked = bookmarkedBillIds.includes(billId);

  const toggleBookmarked = () =>
    dispatch(
      setBookmarkedBill(
        { BillID: billId, newBookmarkStatus: !isBookmarked, bill: fullBill },
        () => {},
      ),
    );

  return (
    <S.HeaderWrapper>
      <TouchableOpacity onPress={() => onPress()}>
        <ChevronLeftOutline width={30} height={30} fill="#3366ff" />
      </TouchableOpacity>
      <S.TitleWrapper>
        {subtitle ? (
          <Text category="s2">{subtitle}</Text>
        ) : (
          <Text category="s1" numberOfLines={1}>
            {title}
          </Text>
        )}
      </S.TitleWrapper>
      <TouchableOpacity onPress={toggleBookmarked}>
        <BookmarkOutline
          width={30}
          height={30}
          fill={isBookmarked ? '#3366ff' : '#8F9BB3'}
        />
      </TouchableOpacity>
    </S.HeaderWrapper>
  );
};

export default NavigationHeader;

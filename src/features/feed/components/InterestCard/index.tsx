import moment from 'moment';
import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { Text, Card } from '@ui-kitten/components';

import AvatarWithFailSafe from '@ph/comps/AvatarWithFailSafe';
import Tag from 'features/feed/components/Tag';
import DateTag from '@ph/feats/feed/components/DateTag';
import PartyImage from '@ph/feats/feed/components/PartyImage';
import { setBookmarkedBill } from '@ph/feats/feed/feedSlice';
import BookmarkIcon from '@ph/assets/bookmark.svg';
import { getSliderValue } from '@ph/feats/feed/components/AcceptanceSlider';
import { useNavigation } from '@react-navigation/native';
import { FeedSliceState, Bill } from '@ph/feats/feed/types';
import {
  styles as sharedStyles,
  FooterContainer,
  HeaderTextWrapper,
  HeaderAvatarWrapper,
} from '@ph/feats/feed/styles';
import * as S from './styles';

const { styles } = S;

const CardHeader: FC<{ item: Bill }> = ({ item }) => {
  const navigation = useNavigation();
  const billTitle =
    item.short_title ||
    item.popular_title ||
    item.official_title ||
    'No Title Available';

  return (
    <View style={sharedStyles.cardHeader}>
      <HeaderTextWrapper onPress={() =>
        navigation.navigate('BillDetailTabs', {
          billId: item.bill_id,
          billSummaryText: item.summary?.text,
          billSummaryDate: item.summary?.date,
          billSponsorParty: item.sponsor.party,
          billSponsorImageUrl: item.sponsor.fixedsize,
          billSponsorFullName: item.sponsor.fullName,
          billSponsorState: item.sponsor.state,
          billSponsorDistrict: item.sponsor.district,
          fullBill: item, // pass full bill for possible bookmark add action
          billTitle,
        })
      }>
        <Text category="h6" numberOfLines={3}>{billTitle}</Text>
        <Text category="s2">{item.sponsor.name}</Text>
      </HeaderTextWrapper>
      <HeaderAvatarWrapper onPress={() =>
        navigation.navigate('RepDetailTabs',
        {
          representativeId: item.sponsor.id,
          representativeState: item.sponsor.state,
          representativeDistrict: item.sponsor.district,
          representativeImageUrl: item.sponsor.fixedsize,
          representativeParty: item.sponsor.party,
          representativeFullName: item.sponsor.fullName,
        })
      }>
        <AvatarWithFailSafe
          party={item.sponsor.party}
          source={{ uri: item.sponsor.fixedsize }}
        />
        <PartyImage party={item.sponsor.party} />
      </HeaderAvatarWrapper>
    </View>
  );
};

const CardFooter: FC<{ item: Bill }> = ({ item }) => {
  const dispatch = useDispatch();
  const bookmarkedBillIds = useSelector(
    (state: FeedSliceState) => state.feed.billsNormalized.bookmarkedBillIds,
  );
  const isBookmarked = bookmarkedBillIds?.includes(item.bill_id);
  const sliderValue = getSliderValue(item.NumUp, item.NumDown);

  const toggleBookmarked = () => 
    dispatch(setBookmarkedBill(
      { BillID: item.bill_id, newBookmarkStatus: !isBookmarked, bill: item }, 
      () => {},
    ));

  return (
    <FooterContainer>
      <S.FooterStatusWrapper>
        {/* <AcceptanceSlider value={sliderValue} style={styles.acceptanceSlider} /> */}
        <DateTag date={moment(item.status_at).format('MM/DD/YY')} />
      </S.FooterStatusWrapper>
      <TouchableOpacity onPress={toggleBookmarked}>
        <BookmarkIcon
          height={24}
          width={24}
          fill="#fff"
          stroke={isBookmarked ? "#3366ff": "#8F9BB3"}
          strokeWidth={2}
        />
      </TouchableOpacity>
    </FooterContainer>
  );
};

const InterestCard: FC<{ item: Bill }> = ({ item }) => {
  return (
    <Card
      style={sharedStyles.cardWrapper}
      status="basic"
      header={() => <CardHeader item={item} />}
      footer={() => <CardFooter item={item} />}>
      <Text style={styles.cardText} numberOfLines={6}>
        {item.summary?.text || 'No summary available'}
      </Text>
      <Tag 
        text={item.subjects_top_term}
        fill='secondary'
        style={styles.tag}
      />
    </Card>
  );
};

export default InterestCard;

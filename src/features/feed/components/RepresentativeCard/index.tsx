import React, { FC } from 'react';
import { View } from 'react-native';
import { Text, Card } from '@ui-kitten/components';
import moment from 'moment';

import AvatarWithFailSafe from '@ph/comps/AvatarWithFailSafe';
import Ratings from '@ph/feats/feed/components/Ratings';
import DateTag from '@ph/feats/feed/components/DateTag';
import PartyImage from '@ph/feats/feed/components/PartyImage';
import Checkmark from '@ph/assets/checkmark-circle-2.svg';
import Tag from 'features/feed/components/Tag';
import { useNavigation } from '@react-navigation/native';
import { RepresentativeVote } from '@ph/feats/feed/types';
import {
  styles as sharedStyles,
  FooterContainer,
  HeaderTextWrapper,
  HeaderAvatarWrapper,
} from '@ph/feats/feed/styles';
import * as S from './styles';

const { styles } = S;

const CardHeader: FC<{ item: RepresentativeVote }> = ({ item }) => {
  const navigation = useNavigation();
  const { Member: member, bill } = item;
  const billTitle = 
    bill.short_title ||
    bill.popular_title ||
    bill.official_title ||
    'No Title Available';

  return (
    <View style={sharedStyles.cardHeader}>
      <HeaderTextWrapper
        onPress={() =>
          navigation.navigate('BillDetailTabs', {
            billId: item.bill_id,
            billSummaryText: item.bill.summary?.text,
            billSummaryDate: item.bill.summary?.date,
            billSponsorParty: item.bill.sponsor.party,
            billSponsorImageUrl: item.bill.sponsor.fixedsize,
            billSponsorFullName: item.bill.sponsor.fullName,
            billSponsorState: item.bill.sponsor.state,
            billSponsorDistrict: item.bill.sponsor.district,
            fullBill: item.bill, // pass full bill for possible bookmark add action
            billTitle,
          })
        }>
        <Text category="h6" numberOfLines={3}>
          {billTitle}
        </Text>
        <Text category="s2">
          {item.Member.fullName} | Voted {member.Vote}
        </Text>
      </HeaderTextWrapper>
      <HeaderAvatarWrapper
        onPress={() =>
          navigation.navigate('RepDetailTabs', {
            representativeId: member.id,
            representativeState: member.state,
            representativeDistrict: member.district,
            representativeFullName: member.fullName,
            representativeImageUrl: member.fixedsize,
            representativeParty: member.party,
          })
        }>
        <AvatarWithFailSafe
          party={item.Member.party}
          source={{ uri: member.fixedsize }}
        />
        <S.CheckmarkWrapper>
          {member.Vote === 'Yes' && (
            <Checkmark width={17} height={17} fill="#00b383" />
          )}
        </S.CheckmarkWrapper>
        <PartyImage party={member.party} />
      </HeaderAvatarWrapper>
    </View>
  );
};

const CardFooter: FC<{ item: RepresentativeVote }> = ({ item }) => (
  <FooterContainer>
    <Tag 
      text={item.bill.subjects_top_term}
      fill='secondary'
      style={styles.tag}
    />
    <DateTag date={moment(item.date).format('MM/DD/YY')} />
  </FooterContainer>
);

const RepresentativeCard: FC<{ item: RepresentativeVote }> = ({ item }) => (
  <Card
    style={sharedStyles.cardWrapper}
    status="basic"
    header={() => <CardHeader item={item} />}
    footer={() => <CardFooter item={item} />}>
    <Ratings representativeVote={item} />
  </Card>
);

export default RepresentativeCard;

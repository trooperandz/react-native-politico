import React from 'react';
import { StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Card, List } from '@ui-kitten/components';

import { styles as sharedStyles, FooterContainer } from '@ph/feats/feed/styles';
import * as S from './CosponsorCard/styles';

const CardFooter = () => (
  <FooterContainer>
    <SkeletonPlaceholder>
      <View />
      <View style={styles.dateWrapper}>
        <View style={styles.calendar} />
        <View style={[styles.line, styles.date]} />
      </View>
    </SkeletonPlaceholder>
  </FooterContainer>
);

const CosponsorCard = () => (
  <Card style={sharedStyles.cardWrapper} footer={() => <CardFooter />}>
    <S.Body>
      <S.Info>
        <SkeletonPlaceholder>
          <View style={[styles.line, styles.name]} />
          <View style={[styles.line, styles.vote]} />
        </SkeletonPlaceholder>
      </S.Info>
      <SkeletonPlaceholder>
        <View style={styles.avatar} />
      </SkeletonPlaceholder>
    </S.Body>
  </Card>
);

const SkeletonBillSponsors = () => (
  <List
    contentContainerStyle={sharedStyles.listContainer}
    data={new Array(5).fill(0)}
    renderItem={() => <CosponsorCard />}
  />
);

export default SkeletonBillSponsors;

const styles = StyleSheet.create({
  line: {
    borderRadius: 50,
  },
  name: {
    height: 20,
    width: 150,
    marginBottom: 6,
  },
  vote: {
    height: 20,
    width: 100,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  dateWrapper: {
    flexDirection: 'row',
  },
  date: {
    height: 20,
    width: 60,
  },
  calendar: {
    height: 20,
    width: 20,
    marginRight: 10,
    borderRadius: 20,
  },
});

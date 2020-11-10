import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Card, List } from '@ui-kitten/components';

import ThumbsUpImage from '@ph/assets/thumbs-up.svg';
import ThumbsDownImage from '@ph/assets/thumbs-down.svg';
import {
  styles,
  cardStyles,
  headerStyles,
  footerStyles,
  ratingsStyle,
  interestsStyle,
  ThumbsDownWrapper,
  ThumbsUpWrapper,
} from './styles';

const CardHeader = () => (
  <SkeletonPlaceholder>
    <View style={headerStyles.container}>
      <View>
        <View style={headerStyles.title} />
        <View style={headerStyles.subtitle} />
      </View>
      <View style={headerStyles.avatar} />
    </View>
  </SkeletonPlaceholder>
);

const CardFooter = () => (
  <SkeletonPlaceholder>
    <View style={footerStyles.container}>
      <View style={footerStyles.textWrapper}>
        <View style={footerStyles.title} />
        <View style={footerStyles.subtitle} />
      </View>
      <View style={footerStyles.icon} />
    </View>
  </SkeletonPlaceholder>
);

const Ratings = () => (
  <View style={ratingsStyle.container}>
    <ThumbsDownWrapper>
      <ThumbsDownImage />
    </ThumbsDownWrapper>
    <SkeletonPlaceholder>
      <View style={ratingsStyle.bar} />
      <View style={ratingsStyle.slider} />
    </SkeletonPlaceholder>
    <ThumbsUpWrapper>
      <ThumbsUpImage />
    </ThumbsUpWrapper>
  </View>
);

const Interests = () => (
  <View style={interestsStyle.container}>
    <SkeletonPlaceholder>
      <View style={interestsStyle.heading} />
    </SkeletonPlaceholder>
    <SkeletonPlaceholder backgroundColor="#f1f4f8">
      <View style={interestsStyle.lightBar} />
    </SkeletonPlaceholder>
    <SkeletonPlaceholder>
      <View style={interestsStyle.subtitle} />
    </SkeletonPlaceholder>
    <SkeletonPlaceholder backgroundColor="#f1f4f8">
      <View style={interestsStyle.lightBar} />
    </SkeletonPlaceholder>
    <SkeletonPlaceholder>
      <View style={interestsStyle.subtitle} />
    </SkeletonPlaceholder>
    <SkeletonPlaceholder>
      <View style={interestsStyle.largeBar} />
    </SkeletonPlaceholder>
  </View>
);

const renderInterestCard = () => (
  <Card
    style={cardStyles.wrapper}
    status="basic"
    header={CardHeader}
    footer={CardFooter}>
    <Interests />
  </Card>
);

const renderRatingCard = () => (
  <Card
    style={cardStyles.wrapper}
    status="basic"
    header={CardHeader}
    footer={CardFooter}>
    <Ratings />
  </Card>
);

export const SkeletonRepresentativesFeed = () => (
  <List
    contentContainerStyle={styles.contentContainer}
    data={new Array(5).fill(0)}
    renderItem={renderRatingCard}
  />
);

export const SkeletonInterestsFeed = () => (
  <List
    contentContainerStyle={styles.contentContainer}
    data={new Array(5).fill(0)}
    renderItem={renderInterestCard}
  />
);

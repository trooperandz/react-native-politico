import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Layout } from '@ui-kitten/components';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import * as S from './styles';

const { styles: sharedStyles } = S;

const SkeletonRepSummary = () => {
  return (
    <S.Container>
      <ScrollView contentContainerStyle={sharedStyles.containerStyle}>
        <Layout style={sharedStyles.containerStyle}>
          <S.Row>
            <S.BoxWrapper>
              <SkeletonPlaceholder>
                <View style={[styles.line, styles.statistic]} />
                <View style={[styles.line, styles.title]} />
              </SkeletonPlaceholder>
            </S.BoxWrapper>
            <S.BoxWrapper>
              <SkeletonPlaceholder>
                <View style={[styles.line, styles.statistic]} />
                <View style={[styles.line, styles.title]} />
              </SkeletonPlaceholder>
            </S.BoxWrapper>
          </S.Row>
          <S.Row>
            <S.BoxWrapper>
              <SkeletonPlaceholder>
                <View style={[styles.line, styles.statistic]} />
                <View style={[styles.line, styles.title]} />
              </SkeletonPlaceholder>
            </S.BoxWrapper>
            <S.BoxWrapper>
              <SkeletonPlaceholder>
                <View style={[styles.line, styles.statistic]} />
                <View style={[styles.line, styles.title]} />
              </SkeletonPlaceholder>
            </S.BoxWrapper>
          </S.Row>
        </Layout>
        <SkeletonPlaceholder>
          <View style={styles.media}>
            <View style={styles.mediaBlock} />
            <View style={styles.mediaBlock} />
            <View style={styles.mediaBlock} />
            <View style={styles.mediaBlock} />
          </View>
        </SkeletonPlaceholder>
      </ScrollView>
    </S.Container>
  );
};

const styles = StyleSheet.create({
  line: {
    height: 16,
    borderRadius: 50,
    marginBottom: 8,
  },
  statistic: {
    width: 50,
    height: 24,
    marginBottom: 8,
  },
  title: {
    width: 100,
  },
  media: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 10,
    maxHeight: 50,
  },
  mediaBlock: {
    marginHorizontal: 14,
    marginBottom: 20,
    width: 35,
    height: 35,
    borderRadius: 6,
  },
});

export default SkeletonRepSummary;

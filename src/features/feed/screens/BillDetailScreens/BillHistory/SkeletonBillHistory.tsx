import React from 'react';
import { StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { List } from '@ui-kitten/components';

import { styles as BillHistoryStyles } from './styles';

const HistoryEvent = () => (
  <SkeletonPlaceholder>
    <View style={styles.wrapper}>
      <View style={[styles.line, styles.date]} />
      <View style={styles.sentenceWrapper}>
        <View style={[styles.line, styles.sentenceOne]} />
        <View style={[styles.line, styles.sentenceTwo]} />
        <View style={[styles.line, styles.sentenceThree]} />
      </View>
    </View>
  </SkeletonPlaceholder>
);

const SkeletonBillHistory = () => (
  <List
    contentContainerStyle={BillHistoryStyles.listStyle}
    data={new Array(10).fill(0)}
    renderItem={() => <HistoryEvent />}
  />
);

export default SkeletonBillHistory;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flex: 1,
  },
  sentenceWrapper: {
    flex: 1,
    marginBottom: 16,
  },
  line: {
    height: 14,
    borderRadius: 50,
    marginBottom: 8,
  },
  date: {
    width: 90,
    marginRight: 20,
  },
  sentenceOne: {
    width: '95%',
  },
  sentenceTwo: {
    width: '80%',
  },
  sentenceThree: {
    width: '58%',
  },
});

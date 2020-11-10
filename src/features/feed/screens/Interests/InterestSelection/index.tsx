import React, { useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Spinner, Text } from '@ui-kitten/components';

import { mockInterestData } from '@ph/feats/feed/utils';
import HangoutImage from '@ph/assets/hangout.svg';
import ArrowLeft from '@ph/assets/arrow-left.svg';
import { registerUserInterests } from '@ph/feats/auth/authSlice';
import Tag from 'features/feed/components/Tag';
import { AuthSliceState } from '@ph/feats/auth/types';
import { styles } from './styles';

const InterestSelection = () => {
  const dispatch = useDispatch();
  const { myInterests } = useSelector(
    (state: AuthSliceState) => state.auth.user,
  );
  const [contentOffsetY, setContentOffsetY] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    myInterests || [],
  );
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  const handleToggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(int => int !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleRegisterInterests = () => {
    if (selectedInterests.length) {
      setIsRegistering(true);
      dispatch(
        registerUserInterests(selectedInterests, () => setIsRegistering(false)),
      );
    }
  };

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    setContentOffsetY(event.nativeEvent.contentOffset.y);
  };

  const ScrollingInterests = () => (
    <ScrollView
      style={styles.scrollViewStyle}
      contentContainerStyle={styles.scrollContainerViewStyle}
      contentOffset={{ x: 0, y: contentOffsetY }}
      onMomentumScrollEnd={handleMomentumScrollEnd}>
      <Layout style={styles.headerViewStyle}>
        <HangoutImage
          width={145}
          height={103}
          style={styles.hangoutImageStyle}
        />
        <Text category="h4">What interests you?</Text>
        <Text category="p2" style={styles.subtitleTextStyle}>
          Select some topics below to begin browsing legislation.
        </Text>
      </Layout>
      <Layout style={styles.tagContainer}>
        <Layout style={styles.scrollContainerViewStyle}>
          {mockInterestData.map((interest: string, i: number) => (
            <TouchableOpacity
              key={i + interest}
              onPress={() => handleToggleInterest(interest)}>
              <Tag
                text={interest}
                fill={
                  selectedInterests.includes(interest) ? 'primary' : 'secondary'
                }
                style={styles.tag}
              />
            </TouchableOpacity>
          ))}
        </Layout>
      </Layout>
    </ScrollView>
  );

  const NextButton = () => (
    <TouchableOpacity
      style={styles.nextButtonViewStyle}
      disabled={isRegistering}
      onPress={handleRegisterInterests}>
      {isRegistering ? (
        <Spinner status="control" />
      ) : (
        <ArrowLeft width={28} height={28} />
      )}
    </TouchableOpacity>
  );

  return (
    <Layout style={styles.containerViewStyle}>
      <ScrollingInterests />
      <NextButton />
    </Layout>
  );
};

export default InterestSelection;

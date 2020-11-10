import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Button } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';

import { registerUserAgeRange } from 'features/auth/authSlice';
import Header from 'features/auth/components/Header';
import SubmitButton from 'features/auth/components/SubmitButton';
import AuthTemplate from 'features/auth/components/AuthTemplate';
import { styles } from 'features/auth/components/styles';
import { AuthSliceState } from 'features/auth/types';

const AGE_RANGES = ['18-25', '26-40', '41-65', '65+'];

const AgeRange = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const dispatch = useDispatch();
  const isLoading = useSelector((state: AuthSliceState) => state.auth.loading);

  const onRegisterAgeRange = () => {
    if (!isLoading) {
      dispatch(registerUserAgeRange(AGE_RANGES[selectedIndex]));
    }
  };

  return (
    <>
      <ScrollView>
        <AuthTemplate
          hasLogo
          header={
            <Header
              header="What is your age range?"
              subheader="Signing up allows you to track, view, and discover representatives and legislation."
            />
          }>
          {AGE_RANGES.map((item, index) => (
            <Button
              key={item + index}
              appearance="outline"
              size="giant"
              status={index === selectedIndex ? 'info' : 'basic'}
              onPress={() => setSelectedIndex(index)}
              style={styles.select}>
              {item}
            </Button>
          ))}
        </AuthTemplate>
      </ScrollView>
      <SubmitButton
        text="NEXT"
        loading={isLoading}
        style={styles.nextButton}
        onPress={onRegisterAgeRange}
      />
    </>
  );
};

export default AgeRange;

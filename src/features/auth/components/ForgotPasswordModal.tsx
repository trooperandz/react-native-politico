import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Input } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';

import { sendPasswordResetEmail } from '@ph/feats/auth/authSlice';
import SlideModal from '@ph/comps/SlideModal';
import SubmitButton from './SubmitButton';
import { AuthSliceState } from '@ph/feats/auth/types';

const ForgotPassword = ({
  isModalVisible,
  toggleModal,
}: {
  isModalVisible: boolean;
  toggleModal: () => void;
}) => {
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();
  const isLoading = useSelector((state: AuthSliceState) => state.auth.loading);

  const onSendReset = () => {
    if (email) {
      dispatch(
        sendPasswordResetEmail(email, () =>
          setTimeout(() => {
            setEmail('');
            toggleModal();
          }, 500),
        ),
      );
    }
  };

  return (
    <SlideModal
      headerText="Forgot your password?"
      isModalVisible={isModalVisible}
      toggleModal={toggleModal}>
      <Input
        size="large"
        placeholder="Enter your email"
        autoCapitalize="none"
        autoCompleteType="email"
        autoCorrect={false}
        keyboardType="email-address"
        disabled={isLoading}
        onChangeText={setEmail}
        value={email}
      />
      <SubmitButton
        text="SEND RESET LINK"
        loading={isLoading}
        style={styles.button}
        onPress={onSendReset}
      />
    </SlideModal>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 'auto',
  },
});

export default ForgotPassword;

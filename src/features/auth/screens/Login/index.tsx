import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Layout } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';

import {
  dismissResetConfirmation,
  loginWithEmail,
} from '@ph/feats/auth/authSlice';
import Tag from 'features/feed/components/Tag';
import Label from '@ph/feats/auth/components/Label';
import SubmitButton from '@ph/feats/auth/components/SubmitButton';
import EmailField from '@ph/feats/auth/components/EmailField';
import PasswordField from '@ph/feats/auth/components/PasswordField';
import ForgotPasswordModal from '@ph/feats/auth/components/ForgotPasswordModal';
import { AuthSliceState } from '@ph/feats/auth/types';
import { validateFormFields } from '@ph/feats/auth/utils';
import { useForm } from '@ph/feats/auth/hooks/useForm';
import { styles as loginStyles } from './styles';
import { styles } from '@ph/feats/auth/components/styles';

const Login = () => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isLoading = useSelector((state: AuthSliceState) => state.auth.loading);
  const resetSent = useSelector(
    (state: AuthSliceState) => state.auth.resetSent,
  );
  const { formValues, formErrors, handleChange, handleSubmit } = useForm(
    () => dispatch(loginWithEmail(formValues.email, formValues.password)),
    { email: '', password: '' },
    validateFormFields,
  );

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <Layout style={styles.formContainer}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <EmailField
          disabled={isLoading}
          handleChange={handleChange}
          value={formValues.email}
          error={formErrors.email}
        />
        <PasswordField
          disabled={isLoading}
          handleChange={handleChange}
          value={formValues.password}
          error={formErrors.password}
        />
        <Label
          text="Forgot your password?"
          category="s1"
          iconName="lock"
          fill="#3366ff"
          size="24"
          onPress={() => toggleModal()}
          style={loginStyles.label}
        />
        {resetSent ? (
          <TouchableOpacity
            onPress={() => dispatch(dismissResetConfirmation())}>
            <Tag
              text="Reset link has been sent!"
              fill="success"
              iconName="close-outline"
              style={loginStyles.tag}
            />
          </TouchableOpacity>
        ) : null}
      </KeyboardAwareScrollView>
      <SubmitButton text="LOGIN" loading={isLoading} onPress={handleSubmit} />
      <ForgotPasswordModal
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
      />
    </Layout>
  );
};

export default Login;

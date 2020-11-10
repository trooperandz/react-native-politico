import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CheckBox, Layout, Text } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';

import WebViewModal, {
  TERMS_AND_CONDITIONS_URI,
  INJECTED_JAVASCRIPT,
} from '@ph/comps/WebViewModal';
import { signUpWithEmail } from '@ph/feats/auth/authSlice';
import SubmitButton from '@ph/feats/auth/components/SubmitButton';
import EmailField from '@ph/feats/auth/components/EmailField';
import PasswordField from '@ph/feats/auth/components/PasswordField';
import { validateFormFields } from '@ph/feats/auth/utils';
import { useForm } from '@ph/feats/auth/hooks/useForm';
import { AuthSliceState } from '@ph/feats/auth/types';
import { styles } from '@ph/feats/auth/components/styles';

const Signup = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: AuthSliceState) => state.auth.loading);
  const [checked, setChecked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => setIsModalVisible(!isModalVisible);

  const { formValues, formErrors, handleChange, handleSubmit } = useForm(
    () => dispatch(signUpWithEmail(formValues.email, formValues.password)),
    { email: '', password: '' },
    validateFormFields,
  );

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
        <Layout style={styles.checkboxRow}>
          <CheckBox
            checked={checked}
            onChange={nextChecked => setChecked(nextChecked)}
          />
          <Text category="p2" style={styles.checkboxLabelStyle}>
            I agree to the
          </Text>
          <TouchableOpacity onPress={toggleModal}>
            <Text category="s2" style={styles.checkboxLinkStyle}>
              Terms and Conditions
            </Text>
          </TouchableOpacity>
        </Layout>
      </KeyboardAwareScrollView>
      <SubmitButton
        text="SIGN UP"
        loading={isLoading}
        onPress={handleSubmit}
        disabled={!checked}
      />
      <WebViewModal
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        uri={TERMS_AND_CONDITIONS_URI}
        injectedJavaScript={INJECTED_JAVASCRIPT}
      />
    </Layout>
  );
};

export default Signup;

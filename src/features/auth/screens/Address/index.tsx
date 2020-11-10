import React from 'react';
import { Input, Layout, Text } from '@ui-kitten/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';

import { registerUserAddress } from 'features/auth/authSlice';
import Header from 'features/auth/components/Header';
import InputLabel from 'features/auth/components/InputLabel';
import SubmitButton from 'features/auth/components/SubmitButton';
import AuthTemplate from 'features/auth/components/AuthTemplate';
import { useForm } from 'features/auth/hooks/useForm';
import { validateFormFields } from 'features/auth/utils';
import { styles } from 'features/auth/components/styles';
import { AuthSliceState } from 'features/auth/types';

const Address = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: AuthSliceState) => state.auth.loading);

  const { formValues, formErrors, handleChange, handleSubmit } = useForm(
    () => dispatch(registerUserAddress(formValues.street, formValues.zipcode)),
    { street: '', zipcode: '' },
    validateFormFields,
  );

  return (
    <>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <AuthTemplate
          hasLogo={true}
          header={
            <Header
              header="Enter address"
              subheader="Letting us know your address allows us to accurately find your district."
            />
          }>
          <Layout style={styles.inputWrapper}>
            <InputLabel
              text="Street Address"
              iconName="hash-outline"
              style={styles.inputLabel}
            />
            <Input
              size="large"
              placeholder="4 Your Rd Apt 2"
              autoCapitalize="words"
              autoCorrect={false}
              disabled={isLoading}
              onChangeText={text => handleChange('street', text)}
              value={formValues.street || ''}
              status={formErrors.street ? 'danger' : undefined}
            />
            {formErrors.street && (
              <Text status="danger" style={styles.errorText}>
                {formErrors.street}
              </Text>
            )}
          </Layout>
          <Layout style={styles.inputWrapper}>
            <InputLabel
              text="Zip Code"
              iconName="map"
              style={styles.inputLabel}
            />
            <Input
              size="large"
              placeholder="Enter zipcode"
              autoCapitalize="none"
              autoCompleteType="postal-code"
              autoCorrect={false}
              keyboardType="number-pad"
              disabled={isLoading}
              onChangeText={text => handleChange('zipcode', text)}
              value={formValues.zipcode || ''}
              status={formErrors.zipcode ? 'danger' : undefined}
            />
            {formErrors.zipcode && (
              <Text status="danger" style={styles.errorText}>
                {formErrors.zipcode}
              </Text>
            )}
          </Layout>
        </AuthTemplate>
      </KeyboardAwareScrollView>
      <SubmitButton
        text="NEXT"
        loading={isLoading}
        onPress={handleSubmit}
        style={styles.nextButton}
      />
    </>
  );
};

export default Address;

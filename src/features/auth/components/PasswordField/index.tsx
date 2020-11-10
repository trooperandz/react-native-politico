import React from 'react';
import { Input, Text, Layout } from '@ui-kitten/components';

import InputLabel from '@ph/feats/auth/components/InputLabel';
import { styles } from '@ph/feats/auth/components/styles';
import { InputField } from '@ph/feats/auth/components/types';

const PasswordField = (props: InputField) => {
  const { error, value, disabled, handleChange } = props;

  return (
    <Layout style={styles.inputWrapper}>
      <InputLabel text="Password" iconName="lock" style={styles.inputLabel} />
      <Input
        size="large"
        placeholder="Enter a secure password"
        autoCapitalize="none"
        autoCompleteType="password"
        disabled={disabled}
        autoCorrect={false}
        secureTextEntry={true}
        onChangeText={text => handleChange('password', text)}
        value={value || ''}
        status={error ? 'danger' : undefined}
      />
      {error && (
        <Text status="danger" style={styles.errorText}>
          {error}
        </Text>
      )}
    </Layout>
  );
};

export default PasswordField;

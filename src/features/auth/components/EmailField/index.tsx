import React from 'react';
import { Input, Text, Layout } from '@ui-kitten/components';

import InputLabel from '@ph/feats/auth/components/InputLabel';
import { styles } from '@ph/feats/auth/components/styles';
import { InputField } from '@ph/feats/auth/components/types';

const EmailField = (props: InputField) => {
  const { error, value, disabled, handleChange } = props;

  return (
    <Layout style={styles.inputWrapper}>
      <InputLabel text="Email" iconName="email" style={styles.inputLabel} />
      <Input
        size="large"
        placeholder="Enter your email"
        autoCapitalize="none"
        autoCompleteType="email"
        autoCorrect={false}
        keyboardType="email-address"
        disabled={disabled}
        onChangeText={text => handleChange('email', text)}
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

export default EmailField;

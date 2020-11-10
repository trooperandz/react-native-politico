import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Button } from '@ui-kitten/components';

const SubmitButton = ({
  text,
  onPress,
  disabled = false,
  loading,
  style = null,
}) => {
  return (
    <Button
      size="giant"
      icon={loading ? () => <ActivityIndicator color="#3366ff" /> : null}
      style={style}
      appearance={loading ? 'outline' : 'filled'}
      onPress={onPress}
      disabled={disabled}>
      {!loading ? text : undefined}
    </Button>
  );
};

export default SubmitButton;

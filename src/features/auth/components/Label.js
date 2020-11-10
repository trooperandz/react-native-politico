import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Icon } from '@ui-kitten/components';

const Label = ({ iconName, text, fill, category, size, onPress, style }) => {
  const color = {
    color: fill,
  };

  const content = () => (
    <>
      <Icon
        name={iconName}
        fill={fill}
        width={size}
        height={size}
        style={styles.icon}
      />
      <Text category={category} style={color}>
        {text}
      </Text>
    </>
  );

  return (
    <>
      {onPress ? (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
          {content()}
        </TouchableOpacity>
      ) : (
        <View style={[styles.container, style]}>{content()}</View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 10,
  },
});

export default Label;

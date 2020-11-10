import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Icon, Text } from '@ui-kitten/components';

const BigIcon = ({ iconName, header, subheader }) => {
  return (
    <Layout style={styles.container}>
      <Icon name={iconName} fill="#3366ff" style={styles.icon} />
      <Text category="h4">{header}</Text>
      <Text category="p2" style={styles.subheader}>
        {subheader}
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 200,
    height: 200,
  },
  subheader: { textAlign: 'center', marginTop: 10 },
});

export default BigIcon;

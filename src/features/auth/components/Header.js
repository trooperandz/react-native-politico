import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

const Header = ({ header, subheader }) => {
  return (
    <Layout>
      <Text category="h4" style={styles.title}>
        {header}
      </Text>
      <Text category="p2" style={styles.subtitle}>
        {subheader}
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: { alignSelf: 'center', marginBottom: 10 },
  subtitle: { alignSelf: 'center', textAlign: 'center' },
});

export default Header;

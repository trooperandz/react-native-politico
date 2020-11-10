import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import analytics from '@react-native-firebase/analytics';

const NotificationsScreen = () => {
  analytics().setCurrentScreen('NotificationsScreen', 'NotificationsScreen');

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category="h1">Notifications</Text>
    </Layout>
  );
};

export default NotificationsScreen;

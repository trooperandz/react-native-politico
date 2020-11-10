import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AgeRange from '@ph/feats/auth/screens/AgeRange';
import Address from '@ph/feats/auth/screens/Address';
import { UserSetupStackParamList } from './types';

const UserSetupStackNav = createStackNavigator<UserSetupStackParamList>();

const UserSetupStack = () => {
  return (
    <UserSetupStackNav.Navigator
      initialRouteName="Address"
      screenOptions={{
        gestureEnabled: false,
        cardStyle: { backgroundColor: '#fff' },
      }}
      headerMode="none">
      <UserSetupStackNav.Screen name="Address" component={Address} />
      <UserSetupStackNav.Screen name="AgeRange" component={AgeRange} />
    </UserSetupStackNav.Navigator>
  );
};

export default UserSetupStack;

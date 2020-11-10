import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import UserAuthTabs from '@ph/navs/UserAuthTabs';
import UserSetupStack from '@ph/navs/UserSetupStack';
import { AuthStackParamList } from './types';

const AuthenticationStack = createStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <AuthenticationStack.Navigator
      initialRouteName="UserAuth"
      headerMode="none">
      <AuthenticationStack.Screen name="UserAuth" component={UserAuthTabs} />
      <AuthenticationStack.Screen name="UserSetup" component={UserSetupStack} />
    </AuthenticationStack.Navigator>
  );
};

export default AuthStack;

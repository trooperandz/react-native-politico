import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import { AppStackParamList } from './types';
import AppTabs from '@ph/navs/AppTabs';
import TutorialSlider from 'features/app/screens/TutorialSlider';
import { AuthSliceState } from '@ph/feats/auth/types';

const AppStack = createStackNavigator<AppStackParamList>();

const AppNavigation = () => {
  const { completedTutorial } = useSelector(
    (state: AuthSliceState) => state.auth.user,
  );

  const initialRouteName = completedTutorial ? 'AppTabs' : 'Tutorial';

  return (
    <AppStack.Navigator initialRouteName={initialRouteName}>
      <AppStack.Screen
        name="Tutorial"
        component={TutorialSlider}
        options={{
          title: 'Welcome to Politico',
          headerTitleStyle: { color: '#787878' },
        }}
      />
      <AppStack.Screen
        name="AppTabs"
        options={{ headerShown: false, animationEnabled: false }}
        component={AppTabs}
      />
    </AppStack.Navigator>
  );
};

export default AppNavigation;

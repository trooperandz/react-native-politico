import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import SplashScreen from 'react-native-splash-screen';

import AppStack from './AppStack';
import AuthStack from './AuthStack';
import { getFirebaseSessionUser } from '../features/auth/authSlice';
import { AuthSliceState } from '../features/auth/types';
import { navigationRef } from './utils';

const RootNavigation = () => {
  const { uid } = useSelector((state: AuthSliceState) => state.auth.user);
  const isSetupComplete = useSelector(
    (state: AuthSliceState) => state.auth.isSetupComplete
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getFirebaseSessionUser(() => {
        SplashScreen.hide();
      })
    );
  }, [dispatch]);

  const routeNameRef = React.useRef();

  // Gets the current screen from navigation state
  const getActiveRouteName = (state) => {
    const route = state.routes[state?.index || 0];

    if (route.state) {
      // Dive into nested navigators
      return getActiveRouteName(route.state);
    }

    return route.name;
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => (routeNameRef.current = navigationRef)}
      onStateChange={(state) => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.name;

        if (currentRouteName && previousRouteName !== currentRouteName) {
          analytics().setCurrentScreen(currentRouteName, currentRouteName);
        }
      }}
    >
      {uid && isSetupComplete ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigation;

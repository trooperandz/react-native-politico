import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabView, Tab } from '@ui-kitten/components';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';

import Login from '@ph/feats/auth/screens/Login';
import Signup from '@ph/feats/auth/screens/Signup';
import AuthTemplate from '@ph/feats/auth/components/AuthTemplate';

import { UserAuthTabsParamList } from './types';

const AuthTopTab = createMaterialTopTabNavigator<UserAuthTabsParamList>();

const TopTabBar: FC<MaterialTopTabBarProps> = ({ navigation, state }) => (
  <TabView
    selectedIndex={state.index}
    style={styles.tabView}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <Tab title="SIGN UP" style={styles.tab} />
    <Tab title="LOGIN" style={styles.tab} />
  </TabView>
);

const UserAuthTabs = () => {
  return (
    <AuthTemplate hasLogo>
      <AuthTopTab.Navigator tabBar={props => <TopTabBar {...props} />}>
        <AuthTopTab.Screen name="Signup" component={Signup} />
        <AuthTopTab.Screen name="Login" component={Login} />
      </AuthTopTab.Navigator>
    </AuthTemplate>
  );
};

const styles = StyleSheet.create({
  tabView: {
    marginBottom: 15,
  },
  tab: {
    height: 48,
  },
});

export default UserAuthTabs;

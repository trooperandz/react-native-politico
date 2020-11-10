import React, { FC } from 'react';
import { TabView, Tab } from '@ui-kitten/components';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';

import Header from '@ph/feats/feed/components/Header';
import FeedFilterBar from '@ph/feats/feed/components/FeedFilterBar';
import Interests from '@ph/feats/feed/screens/Interests';
import Representatives from '@ph/feats/feed/screens/Representatives';
import { styles } from './styles';
import { FeedTabsParamList } from './types';

const FeedTopTab = createMaterialTopTabNavigator<FeedTabsParamList>();

const TopTabBar: FC<MaterialTopTabBarProps> = ({ navigation, state }) => (
  <>
    <TabView
      selectedIndex={state.index}
      style={styles.tabView}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <Tab title="My Interests" style={styles.tab} />
      <Tab title="My Reps" style={styles.tab} />
    </TabView>
    <FeedFilterBar navigationState={state} />
  </>
);

const FeedTabs = () => {
  return (
    <>
      <Header />
      <FeedTopTab.Navigator
        initialRouteName="Interests"
        tabBar={props => <TopTabBar {...props} />}>
        <FeedTopTab.Screen name="Interests" component={Interests} />
        <FeedTopTab.Screen name="Representatives" component={Representatives} />
      </FeedTopTab.Navigator>
    </>
  );
};

export default FeedTabs;

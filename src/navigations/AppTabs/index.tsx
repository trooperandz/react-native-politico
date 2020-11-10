import React, { FC } from 'react';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  IconProps,
} from '@ui-kitten/components';

import FeedStack from '@ph/navs/FeedStack';
import SearchScreen from '@ph/feats/search';
import SettingsScreen from '@ph/feats/settings';
// import NotificationsScreen from '@ph/feats/notifications';
import { AppTabsParamList } from './types';

const AppBottomTab = createBottomTabNavigator<AppTabsParamList>();

const FeedIcon = (props: IconProps) => <Icon {...props} name="book" />;

const SearchIcon = (props: IconProps) => (
  <Icon {...props} name="search-outline" />
);

const ProfileIcon = (props: IconProps) => (
  <Icon {...props} name="person-outline" />
);

// const NotificationIcon = (props: IconProps) => (
//   <Icon {...props} name="bell-outline" />
// );

const BottomTabBar: FC<BottomTabBarProps> = ({ navigation, state }) => {
  const onSelect = (index: number) => {
    navigation.navigate(state.routeNames[index]);
  };

  return (
    <BottomNavigation selectedIndex={state.index} onSelect={onSelect}>
      <BottomNavigationTab icon={FeedIcon} />
      <BottomNavigationTab icon={SearchIcon} />
      {/* <BottomNavigationTab icon={NotificationIcon} /> */}
      <BottomNavigationTab icon={ProfileIcon} />
    </BottomNavigation>
  );
};

const AppTabs = () => {
  return (
    <AppBottomTab.Navigator tabBar={props => <BottomTabBar {...props} />}>
      <AppBottomTab.Screen name="FeedStack" component={FeedStack} />
      <AppBottomTab.Screen name="Search" component={SearchScreen} />
      {/* <AppBottomTab.Screen
        name="Notifications"
        component={NotificationsScreen}
      /> */}
      <AppBottomTab.Screen name="Settings" component={SettingsScreen} />
    </AppBottomTab.Navigator>
  );
};

export default AppTabs;

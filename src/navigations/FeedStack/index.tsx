import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { FeedStackParamList } from './types';
import FeedTabs from '@ph/navs/FeedTabs';
import RepDetailTabs from '@ph/navs/RepDetailTabs';
import BillDetailTabs from '@ph/navs/BillDetailTabs';

const FeedStackNavigation = createStackNavigator<FeedStackParamList>();

const FeedStack = () => {
  return (
    <FeedStackNavigation.Navigator initialRouteName="Feed">
      <FeedStackNavigation.Screen
        name="Feed"
        component={FeedTabs}
        options={{ headerShown: false }}
      />
      <FeedStackNavigation.Screen
        name="RepDetailTabs"
        component={RepDetailTabs}
        options={() => ({
          header: () => null,
        })}
      />
      <FeedStackNavigation.Screen
        name="BillDetailTabs"
        component={BillDetailTabs}
        options={() => ({
          header: () => null,
        })}
      />
    </FeedStackNavigation.Navigator>
  );
};

export default FeedStack;

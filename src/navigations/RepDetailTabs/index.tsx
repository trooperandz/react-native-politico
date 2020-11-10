import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabView, Tab, Icon } from '@ui-kitten/components';

import {
  RepSummary,
  RepBillVotes,
} from '@ph/feats/feed/screens/RepDetailScreens';
import RepDetailHeader from '@ph/feats/feed/components/RepDetailHeader';
import { RepDetailTabsParamList, RepDetailTabsNavProps } from './types';
import usStatesMap from '@ph/feats/feed/utils/us-states.json';

import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';

const RepDetailTopTab = createMaterialTopTabNavigator<RepDetailTabsParamList>();

const SummaryIcon = (props: any) => (
  <Icon {...props} name="file-text-outline" />
);

const BillsIcon = (props: any) => <Icon {...props} name="book-outline" />;

const TopTabBar: FC<MaterialTopTabBarProps> = ({ navigation, state }) => {
  return (
    <TabView
      selectedIndex={state.index}
      onSelect={index => {
        navigation.navigate(state.routeNames[index]);
      }}>
      <Tab icon={SummaryIcon} style={styles.tab} />
      <Tab icon={BillsIcon} style={styles.tab} />
    </TabView>
  );
};

const RepDetailTabs: FC<RepDetailTabsNavProps<any>> = ({
  navigation,
  route,
}) => {
  const {
    representativeId,
    representativeState,
    representativeDistrict,
    representativeFullName,
    representativeImageUrl,
    representativeParty,
  } = route.params;
  // @ts-ignore
  const stateName = usStatesMap[representativeState];
  const subtitle = representativeDistrict
    ? `${stateName} District ${representativeDistrict}`
    : stateName;

  return (
    <>
      <RepDetailHeader
        title={representativeFullName}
        subtitle={subtitle}
        imageUrl={representativeImageUrl}
        party={representativeParty}
        representativeId={representativeId}
        onPress={() => navigation.goBack()}
      />
      <RepDetailTopTab.Navigator tabBar={props => <TopTabBar {...props} />}>
        <RepDetailTopTab.Screen
          name="RepDetailSummary"
          component={RepSummary}
          initialParams={{ representativeId }}
        />
        <RepDetailTopTab.Screen
          name="RepDetailBills"
          component={RepBillVotes}
          initialParams={{ representativeId }}
        />
      </RepDetailTopTab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  tab: {
    height: 48,
  },
});

export default RepDetailTabs;

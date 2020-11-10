import React, { FC } from 'react';
import { Layout, Tab, TabBar } from '@ui-kitten/components';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';

import NavigationHeader from '@ph/feats/feed/components/NavigationHeader';
import { ClockOutline, FileText, PersonOutline } from '@ph/comps/Icons';
import {
  BillHistory,
  BillOverview,
  BillSponsors,
} from '@ph/feats/feed/screens/BillDetailScreens';
import { BillDetailTabsNavProps, BillDetailTabsParamList } from './types';
import { styles } from './styles';

const BillDetailTopTab = createMaterialTopTabNavigator<
  BillDetailTabsParamList
>();

const TopTabBar: FC<MaterialTopTabBarProps> = ({ navigation, state }) => (
  <Layout>
    <TabBar
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}
      style={styles.tabBar}>
      <Tab icon={FileText} />
      <Tab icon={ClockOutline} />
      {/* <Tab icon={EditOutline} /> */}
      <Tab icon={PersonOutline} />
    </TabBar>
  </Layout>
);

const BillDetailTabs: FC<BillDetailTabsNavProps<any>> = ({
  navigation,
  route,
}) => {
  const {
    billId,
    billTitle,
    billSummaryText,
    billSummaryDate,
    billSponsorParty,
    billSponsorImageUrl,
    billSponsorFullName,
    billSponsorState,
    billSponsorDistrict,
    fullBill,
  } = route.params;

  return (
    <>
      <Layout>
        <NavigationHeader
          title={billTitle}
          subtitle={billId.toUpperCase()}
          billId={billId}
          fullBill={fullBill}
          onPress={() => navigation.goBack()}
        />
      </Layout>
      <BillDetailTopTab.Navigator tabBar={props => <TopTabBar {...props} />}>
        <BillDetailTopTab.Screen
          name="BillOverview"
          component={BillOverview}
          initialParams={{
            billId,
            billTitle,
            billSummaryText,
            billSummaryDate,
          }}
        />
        <BillDetailTopTab.Screen
          name="BillHistory"
          component={BillHistory}
          initialParams={{ billId }}
        />
        {/* <BillDetailTopTab.Screen name="BillVotes" component={BillVotes} /> */}
        <BillDetailTopTab.Screen
          name="BillSponsors"
          component={BillSponsors}
          initialParams={{
            billId,
            billSponsorParty,
            billSponsorImageUrl,
            billSponsorFullName,
            billSponsorState,
            billSponsorDistrict,
          }}
        />
      </BillDetailTopTab.Navigator>
    </>
  );
};

export default BillDetailTabs;

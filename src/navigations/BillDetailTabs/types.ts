import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, TabNavigationState } from '@react-navigation/native';

export type BillDetailTabsParamList = {
  BillOverview: {
    billId: string;
    billTitle: string;
    billSummaryText: string;
    billSummaryDate: string;
  };
  BillHistory: { billId: string };
  BillVotes: undefined;
  BillSponsors: {
    billId: string;
    sponsor: string;
    billSponsorParty: string;
    billSponsorImageUrl: string;
    billSponsorFullName: string;
    billSponsorState: string;
    billSponsorDistrict: string;
  };
};

export type BillDetailTabsNavProps<T extends keyof BillDetailTabsParamList> = {
  navigation: StackNavigationProp<BillDetailTabsParamList, T>;
  route: RouteProp<BillDetailTabsParamList, T>;
  state?: TabNavigationState;
};

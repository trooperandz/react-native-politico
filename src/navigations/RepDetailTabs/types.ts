import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, TabNavigationState } from '@react-navigation/native';

export type RepDetailTabsParamList = {
  RepSummary: { representativeId: string };
  RepBillVotes: { representativeId: string };
};

export type RepDetailTabsNavProps<T extends keyof RepDetailTabsParamList> = {
  navigation: StackNavigationProp<RepDetailTabsParamList, T>;
  route: RouteProp<RepDetailTabsParamList, T>;
  state?: TabNavigationState;
};

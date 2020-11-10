import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type FeedStackParamList = {
  Feed: undefined;
  RepDetailTabs: undefined;
  BillDetailTabs: undefined;
};

export type FeedStackNavProps<T extends keyof FeedStackParamList> = {
  navigation: StackNavigationProp<FeedStackParamList, T>;
  route: RouteProp<FeedStackParamList, T>;
};

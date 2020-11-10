import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type FeedTabsParamList = {
  Interests: undefined;
  Representatives: undefined;
};

export type FeedTabsNavProps<T extends keyof FeedTabsParamList> = {
  navigation: StackNavigationProp<FeedTabsParamList, T>;
  route: RouteProp<FeedTabsParamList, T>;
};

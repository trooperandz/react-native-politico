import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type AppTabsParamList = {
  FeedStack: undefined;
  Search: undefined;
  Notifications: undefined;
  Settings: undefined;
};

export type AppTabsNavProps<T extends keyof AppTabsParamList> = {
  navigation: StackNavigationProp<AppTabsParamList, T>;
  route: RouteProp<AppTabsParamList, T>;
};

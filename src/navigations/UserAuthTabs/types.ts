import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, TabNavigationState } from '@react-navigation/native';

export type UserAuthTabsParamList = {
  Login: undefined;
  Signup: undefined;
};

export type UserAuthTabsNavProps<T extends keyof UserAuthTabsParamList> = {
  navigation: StackNavigationProp<UserAuthTabsParamList, T>;
  route: RouteProp<UserAuthTabsParamList, T>;
  state?: TabNavigationState;
};

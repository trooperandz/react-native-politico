import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type UserSetupStackParamList = {
  Address: undefined;
  AgeRange: undefined;
};

export type UserSetupStackNavProps<T extends keyof UserSetupStackParamList> = {
  navigation: StackNavigationProp<UserSetupStackParamList, T>;
  route: RouteProp<UserSetupStackParamList, T>;
};

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type AppStackParamList = {
  AppTabs: undefined;
  Tutorial: undefined;
};

export type AppStackNavProps<T extends keyof AppStackParamList> = {
  navigation: StackNavigationProp<AppStackParamList, T>;
  route: RouteProp<AppStackParamList, T>;
};

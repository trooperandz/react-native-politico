import { Bill } from 'features/feed/types';

export type NavigationHeader = {
  onPress: () => void;
  title: string;
  subtitle: string;
  billId: string;
  fullBill: Bill;
};

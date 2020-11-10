import { Bill } from '@ph/feats/feed/types';

export type InterestsList = {
  bills: Bill[];
  onEndReached: () => void;
  isLoadingMoreRecords: boolean;
  onMomentumScrollEnd: () => void;
};

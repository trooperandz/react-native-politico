import { RepresentativeVote } from '@ph/feats/feed/types';

export type RepresentativesList = {
  representativeVotes: RepresentativeVote[];
  onEndReached: () => void;
  isLoadingMoreRecords: boolean;
  onMomentumScrollEnd: () => void;
};

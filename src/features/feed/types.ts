export interface Bill {
  NumDown: number;
  NumUp: number;
  official_title: string;
  popular_title: string | null;
  Reacted: boolean;
  short_title: string | null;
  sponsor: BillCosponsor;
  status_at: string;
  subjects: string[];
  subjects_top_term: string;
  text_url: string;
  summary: BillSummary;
  bill_id: string;
}

export type BookmarkedBillsRequestParams = {
  Subjects: string[];
  Page: number;
  EntriesPerPage: number;
  SortedBy: string;
  UserID: string;
  ReturnShort: boolean;
};

export type BillSummary = {
  as: string;
  date: string;
  text: string;
};

export type RepresentativeMember = {
  district: string;
  first_name: string;
  fixedsize: string;
  fullName: string;
  id: string;
  last_name: string;
  middle_name?: string;
  NumDown: number;
  NumUp: number;
  originalsize: string;
  party: string;
  short_title: string;
  state: string;
  suffix?: string;
  Vote: string;
};

export type RepresentativeVote = {
  Member: RepresentativeMember;
  _id: string;
  Reacted: boolean;
  UserResponse: {
    Member: string;
    bill_id: string;
    date: string;
    fullDate: string;
    reaction: string;
    vote_id: string;
  };
  bill: {
    congress: number;
    number: number;
    official_title: string;
    popular_title: string;
    short_title: string;
    sponsor: BillCosponsor;
    subjects_top_term: string;
    summary: BillSummary;
    title: string;
    titles: {
      as: string;
      is_for_portion: string;
      title: string;
      type: string;
    }[];
    type: string;
  };
  bill_id: string;
  category: string;
  chamber: string;
  congress: number;
  date: string;
  number: number;
  question: string;
  requires: string;
  result: string;
  result_text: string;
  session: string;
  source_url: string;
  subject: string;
  type: string;
  updated_at: string;
  vote_id: string;
};

export type RepresentativeProfile = {
  CommaName: string;
  EnactedBills: string;
  TotalBills: string;
  bookmarks: number;
  contact_form: string | null;
  date_of_birth: string;
  district: string;
  facebook_account: string | null;
  first_name: string;
  fixedsize: string;
  fullName: string;
  gender: string;
  geoid: string;
  id: string;
  in_office: boolean;
  last_name: string;
  leadership_role: string | null;
  middle_name: string | null;
  missed_votes: number;
  missed_votes_pct: number;
  next_election: string;
  ocd_id: string;
  office: string;
  originalsize: string;
  party: string;
  phone: string;
  seniority: string;
  short_title: string;
  state: string;
  suffix: null;
  title: string;
  total_present: number;
  total_votes: string;
  twitter_account: string | null;
  url: string;
  votes_against_party_pct: number;
  votes_with_party_pct: number;
  youtube_account: string | null;
};

export type RepresentativeProfileRequestParams = {
  Member: string;
  UserID: string;
  ReturnShort: boolean;
};

export type InterestsRequestParams = {
  Subjects: string[];
  Page: number;
  EntriesPerPage: number;
  SortedBy: string;
  UserID: string;
  ReturnShort: boolean;
};

export type RepresentativesRequestParams = {
  Members: string[];
  Page: number;
  VotesPerPage: number;
  SortedBy: string;
  ByUser: boolean;
  UserID: string;
  ReturnShort: boolean;
  showLoading?: boolean;
  [key: string]: any;
};

export type BillDetailRequestParams = {
  BillID: string;
  UserID: string;
  ReturnShort: boolean;
};

// TOOD: id and bioguide_id are the same...remove one?
export type BillCosponsor = {
  CommaName: string;
  bioguide_id: string;
  id: string;
  district: number;
  first_name: string;
  fixedsize: string;
  fullName: string;
  gender: string;
  last_name: string;
  leadership_role: string | null;
  middle_name: string | null;
  name: string;
  original_cosponsor: boolean;
  originalsize: string;
  party: string;
  short_title: string;
  sponsored_at: string;
  state: string;
  suffix: string | null;
  title: string;
  withdrawn_at: string | null;
};

export type BillHistory = {
  acted_at: string;
  action_code: string;
  references: string[] | [];
  text: string;
  type: string;
};

export type BillDetails = {
  actions: BillHistory[];
  cosponsors: BillCosponsor[];
  billUrl: string;
};

export type VoteReactionRequestParams = {
  Member: string;
  VoteID: string;
  Reaction: string;
  BillID: string;
  UserID: string;
};

export type ReturnFollowsRequestParams = {
  UserID: string;
};

export interface SetBookmarkedBillRequestParams {
  BillID: string;
  newBookmarkStatus: boolean;
  bill: Bill;
}

export interface SetFollowedRepRequestParams {
  Member: string;
  newFollowStatus: boolean;
}

export interface Follow {
  Followed: 'True' | 'False';
  Member: string;
  date: string;
  fullDate: string;
}

export interface Bookmark {
  bookmarked: 'True' | 'False';
  bill_id: string;
  date: string;
  fullDate: string;
}

export type FeedState = {
  isLoadingVotes: boolean;
  representativeVotes: RepresentativeVote[];
  followedRepVotes: RepresentativeVote[];
  billsNormalized: {
    entities: { [key: string]: Bill };
    interestIds: string[];
    bookmarkedBillIds: string[];
  };
  representativeProfiles: {
    [key: string]: RepresentativeProfile;
  };
  myRepresentativeProfiles: {
    [key: string]: RepresentativeProfile;
  };
  representativeDetailVotes: {
    [key: string]: {
      pageCount: number;
      votes: RepresentativeVote[];
    };
  };
  billDetails: {
    [key: string]: BillDetails;
  };
  showBookmarksAndFollowsOnly: boolean;
  followedReps: [];
  followedRepIds: string[];
};

export type FeedSliceState = {
  feed: FeedState;
};

import { createSlice } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { normalize, schema } from 'normalizr';
import axios from 'axios';
import produce from 'immer';

import { displayGlobalError } from '@ph/feats/app/appSlice';
import { getErrorMessage } from '@ph/feats/app/utils';
import { setAcceptanceValue } from './utils';
import { API_BASE_URL } from 'utils/constants';
import {
  Bill,
  RepresentativesRequestParams,
  RepresentativeProfileRequestParams,
  RepresentativeVote,
  RepresentativeMember,
  InterestsRequestParams,
  BillDetailRequestParams,
  VoteReactionRequestParams,
  ReturnFollowsRequestParams,
  FeedState,
  FeedSliceState,
  Follow,
  BookmarkedBillsRequestParams,
  SetBookmarkedBillRequestParams,
  SetFollowedRepRequestParams,
} from './types';

// Initial feed state
const initialState: FeedState = {
  billsNormalized: {
    entities: {},
    interestIds: [],
    bookmarkedBillIds: [],
  },
  isLoadingVotes: true,
  representativeVotes: [],
  followedRepVotes: [],
  representativeProfiles: {},
  myRepresentativeProfiles: {},
  representativeDetailVotes: {},
  billDetails: {},
  showBookmarksAndFollowsOnly: false,
  followedReps: [],
  followedRepIds: [],
};

const billNormalized = new schema.Entity('bills', {}, {
  idAttribute: 'bill_id',
});
const voteNormalized = new schema.Entity('votes', {}, {
  idAttribute: 'vote_id',
});
// const representative = new schema.Entity('representatives');

// Create feed reducer and actions
const feed = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    receiveNormalizedBills(state: FeedState, action) {
      const { entities, interestIds, pageCount } = action.payload;

      state.billsNormalized.entities = { ...state.billsNormalized.entities, ...entities };
      
      // If we are paging (endless scroll), add it to existing results
      if (pageCount > 1) {
        state.billsNormalized.interestIds.push(...interestIds);
      } else {
        state.billsNormalized.interestIds = interestIds;
      }
    },
    receiveNormalizedBookmarks(state: FeedState, action) {
      state.billsNormalized.entities = { ...state.billsNormalized.entities, ...action.payload.entities };
      state.billsNormalized.bookmarkedBillIds = action.payload.bookmarkedBillIds;
    },
    updateNormalizedBookmarks(state: FeedState, action) {
      state.billsNormalized.entities = { ...action.payload.entities };
      state.billsNormalized.bookmarkedBillIds = [...action.payload.bookmarkedBillIds];
    },
    updateIsLoadingVotes(state: FeedState, action) {
      state.isLoadingVotes = action.payload;
    },
    receiveRepresentativeVotes(state: FeedState, action) {
      state.representativeVotes.push(...action.payload.representativeVotes);
    },
    receiveFollowedRepVotes(state: FeedState, action) {
      state.followedRepVotes.push(...action.payload.followedRepVotes);
    },
    updateRepresentativeVotes(state: FeedState, action) {
      state.representativeVotes[action.payload.repVotesUpdateIndex] =
        action.payload.updatedRepresentativeVote;
    },
    updateFollowedRepVotes(state: FeedState, action) {
      state.followedRepVotes[action.payload.followedRepVotesUpdateIndex] =
        action.payload.updatedFollowedRepVote;
    },
    wipeRepVotes(state: FeedState) {
      state.representativeVotes = [];
      state.followedRepVotes = [];
    },
    receiveRepresentativeProfile(state: FeedState, action) {
      const { representativeProfile } = action.payload;

      state.representativeProfiles[
        representativeProfile.id
      ] = representativeProfile;
    },
    receiveMyRepresentativesProfiles(state: FeedState, action) {
      const { representativeProfile } = action.payload;

      state.myRepresentativeProfiles[
        representativeProfile.id
      ] = representativeProfile;
    },
    receiveRepresentativeDetailVotes(state: FeedState, action) {
      const {
        representativeDetailVotes,
        representativeId,
        pageCount,
      } = action.payload;

      state.representativeDetailVotes[representativeId] = {
        pageCount,
        votes: representativeDetailVotes,
      };
    },
    updateRepresentativeDetailVotes(state: FeedState, action) {
      const { representativeId, updatedRepDetailVotes } = action.payload;

      state.representativeDetailVotes[
        representativeId
      ].votes = updatedRepDetailVotes;
    },
    receiveBillDetails(state: FeedState, action) {
      const { billId, cosponsors, actions, billUrl } = action.payload;

      state.billDetails[billId] = { cosponsors, actions, billUrl };
    },
    updateShowBookmarksAndFollowsOnly(state: FeedState, action) {
      state.showBookmarksAndFollowsOnly = action.payload;
    },
    updateFollowedReps(state: FeedState, action) {
      state.followedReps = action.payload;
    },
    updateFollowedRepIds(state: FeedState, action) {
      state.followedRepIds = action.payload;
    },
    clearFeedSlice(state: FeedState) {
      state.isLoadingVotes = true;
      state.representativeVotes = [];
      state.followedRepVotes = [];
      state.representativeProfiles = {};
      state.myRepresentativeProfiles = {};
      state.representativeDetailVotes = {};
      state.billDetails = {};
      state.showBookmarksAndFollowsOnly = false;
      state.followedReps = [];
      state.followedRepIds = [];
    },
  },
});

// Export feed actions
export const {
  receiveNormalizedBills,
  receiveNormalizedBookmarks,
  updateNormalizedBookmarks,
  updateIsLoadingVotes,
  receiveRepresentativeVotes,
  receiveFollowedRepVotes,
  updateRepresentativeVotes,
  updateFollowedRepVotes,
  wipeRepVotes,
  receiveRepresentativeProfile,
  receiveMyRepresentativesProfiles,
  receiveRepresentativeDetailVotes,
  updateRepresentativeDetailVotes,
  receiveBillDetails,
  updateShowBookmarksAndFollowsOnly,
  updateFollowedReps,
  updateFollowedRepIds,
  clearFeedSlice,
} = feed.actions;

// Export feed reducer
export default feed.reducer;

// Get data for the My Interests feed
export const fetchInterests = (
  requestParams: InterestsRequestParams,
  callback: () => void,
) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/Interest`, {
        ...requestParams,
      });
      const bills = normalize(response.data.results, [billNormalized]);

      dispatch(receiveNormalizedBills(
        { 
          entities: bills.entities.bills,
          interestIds: bills.result,
          pageCount: requestParams.Page,
        }));
      callback && callback();
    } catch (error) {
      callback && callback();
      dispatch(
        displayGlobalError({
          error: getErrorMessage(
            `Failed to fetch bill interests feed. ${error}`,
          ),
        }),
      );
    }
  };
};

// Get data for the My Reps feed
export const fetchRepresentativeVotes = (
  requestParams: RepresentativesRequestParams,
  callback?: () => void,
) => {
  return async (dispatch: Dispatch, getState: () => FeedSliceState) => {
    try {
      if (requestParams.showLoading) {
        dispatch(updateIsLoadingVotes(true));
      }
      const response = await axios.post(`${API_BASE_URL}/MyRep`, {
        ...requestParams,
      });
      const {
        feed: { followedRepIds },
      } = getState();
      const followedRepResponse = await axios.post(`${API_BASE_URL}/MyRep`, {
        ...requestParams,
        Members: requestParams.followedRepIds || followedRepIds,
      });
      const normalizedVotes = normalize(response.data?.results || [], [voteNormalized]);
      console.log({ normalizedVotes });
      dispatch(
        receiveRepresentativeVotes({
          representativeVotes: response.data.results,
        }),
      );
      dispatch(
        receiveFollowedRepVotes({
          followedRepVotes: followedRepResponse.data.results,
        }),
      );
      dispatch(updateIsLoadingVotes(false));

      callback && callback();
    } catch (error) {
      callback && callback();
      dispatch(
        displayGlobalError({
          error: getErrorMessage(
            `Failed to fetch representative votes feed. ${error}`,
          ),
        }),
      );
    }
  };
};

// This is the same request as fetchRepresentativeVotes, but it is handled a bit
// differently in that it is results for one rep instead of many, and it is used for
// display inside of the Rep Detail feed for the currently active Rep.  This state is
// saved as an object of key-value pairs, with the rep id as the hash lookup (as opposed
// to an array of all rep results).  We may want to eventually consolidate this state with the
// original representativeVotes array state, but the ordering/sorting/specificity/pageCount state of
// the data in the lists have different needs and most likely will need to be handled differently.
export const fetchRepresentativeDetailVotes = (
  requestParams: RepresentativesRequestParams,
  callback?: () => void,
) => {
  return async (dispatch: Dispatch, getState: () => FeedSliceState) => {
    const {
      feed: { representativeDetailVotes },
    } = getState();

    try {
      const response = await axios.post(`${API_BASE_URL}/MyRep`, {
        ...requestParams,
      });

      const representativeId = requestParams.Members[0];
      const representativeDetail = representativeDetailVotes[representativeId];
      const representativeDetailVotesCurrentState = representativeDetail
        ? representativeDetail.votes
        : undefined;

      // Update representativeDetailVotes array with new data for later action state update
      let updatedRepresentativeVotes;
      if (representativeDetailVotesCurrentState) {
        updatedRepresentativeVotes = [
          ...representativeDetailVotesCurrentState,
          ...response.data.results,
        ];
      }

      dispatch(
        receiveRepresentativeDetailVotes({
          representativeId,
          representativeDetailVotes:
            updatedRepresentativeVotes || response.data.results,
          pageCount: requestParams.Page,
        }),
      );

      callback && callback();
    } catch (error) {
      callback && callback();
      dispatch(
        displayGlobalError({
          error: getErrorMessage(
            `Failed to fetch representative detail votes feed. ${error}`,
          ),
        }),
      );
    }
  };
};

// Get an individual rep's profile data for the rep summary etc
export const fetchRepresentativeProfile = (
  requestParams: RepresentativeProfileRequestParams,
  callback?: () => void,
) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/ARep`, {
        ...requestParams,
      });

      dispatch(
        receiveRepresentativeProfile({
          representativeProfile: response.data,
        }),
      );
      callback && callback();
    } catch (error) {
      callback && callback();
      dispatch(
        displayGlobalError({
          error: getErrorMessage(
            `Failed to fetch representative profile. ${error}`,
          ),
        }),
      );
    }
  };
};

// Get user's representatives profile information for bubbles
export const fetchMyRepresentativeProfiles = (
  requestParams: RepresentativeProfileRequestParams,
  callback?: () => void,
) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/ARep`, {
        ...requestParams,
      });

      dispatch(
        receiveMyRepresentativesProfiles({
          representativeProfile: response.data,
        }),
      );

      dispatch(
        receiveRepresentativeProfile({
          representativeProfile: response.data,
        }),
      );
      callback && callback();
    } catch (error) {
      callback && callback();
      dispatch(
        displayGlobalError({
          error: getErrorMessage(
            `Failed to fetch my representative profile. ${error}`,
          ),
        }),
      );
    }
  };
};

// Get bill data for the bill detail tabs
export const fetchBillDetails = (
  requestParams: BillDetailRequestParams,
  callback?: () => void,
) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/ABill`, {
        ...requestParams,
      });

      dispatch(
        receiveBillDetails({
          billId: requestParams.BillID,
          cosponsors: response.data.cosponsors,
          actions: response.data.actions,
          billUrl: response.data.text_url,
        }),
      );
      callback && callback();
    } catch (error) {
      callback && callback();
      dispatch(
        displayGlobalError({
          error: getErrorMessage(`Failed to fetch bill details. ${error}`),
        }),
      );
    }
  };
};

// Get Bookmarks and Follows data
export const fetchBookmarksAndFollows = (
  requestParams: ReturnFollowsRequestParams,
  callback?: () => void,
) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/ReturnFollows`,
        {
          ...requestParams,
        },
      );

      const followedReps = response.data?.Follows.filter((record: Follow) => record.Followed === "True") || [];
      const followedRepIds = followedReps.map((follow: Follow) => follow.Member);

      dispatch(updateFollowedReps(followedReps));
      dispatch(updateFollowedRepIds(followedRepIds));

      callback && callback();
    } catch (error) {
      callback && callback();
      dispatch(
        displayGlobalError({
          error: getErrorMessage(
            `Failed to fetch bookmarks and follows. ${error}`,
          ),
        }),
      );
    }
  };
};

// New Bookmarks endpoint
// This is V1; we just list ALL bookmarks.
// V2 will either be filtering them, or extracting bookmarks to their own screen feature
// instead of including the toggle feature on the current feed
export const fetchBookmarkedBills = (requestParams: BookmarkedBillsRequestParams, callback?: () => void) => {
  return async (dispatch: Dispatch, getState: () => FeedSliceState) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/FilteredBookmarks`, 
        {
          ...requestParams,
        },
      );

      const {
        feed: { billsNormalized },
      } = getState();
      const bookmarkedBills = response.data?.results || [];
      const bookmarkedBillIds = bookmarkedBills.map((bill: Bill) => bill.bill_id);

      // Only add to normalized bill entitites dictionaly if we don't have them 
      const billsToAdd = bookmarkedBills.filter((bill: Bill) => {
        return !billsNormalized.interestIds.includes(bill.bill_id);
      }).sort((a: number, b: number) => {
        return new Date(b.status_at) - new Date(a.status_at);
      });
      console.log({ billsToAdd })
      const normalizedBillsToAdd = normalize(billsToAdd, [billNormalized]);
      
      dispatch(receiveNormalizedBookmarks({ entities: normalizedBillsToAdd.entities.bills, bookmarkedBillIds }));
      callback && callback();
    } catch (error) {
      callback && callback();
      dispatch(
        displayGlobalError({
          error: getErrorMessage(
            `Failed to fetch bookmarks list. ${error}`,
          ),
        }),
      );
    }
  };
};

export const setBookmarkedBill = (
  requestParams: SetBookmarkedBillRequestParams,
  callback: () => void,
) => {
  return async (dispatch: Dispatch, getState: () => any) => {
    try {
      const {
        auth: { user },
        feed: { billsNormalized },
      } = getState();

      const { uid: UserID } = user;

      const {
        BillID,
        newBookmarkStatus,
        bill,
      } = requestParams;

      const response = await axios.post(
        `${API_BASE_URL}/BillBookmark`,
        {
          Bookmarked: newBookmarkStatus ? 'True' : 'False',
          BillID,
          UserID,
        },
      );

      if (response.status === 200 && response.data !== 'Nothing Happened') {
        const updatedBookmarkedBillIds = newBookmarkStatus ? (
          [...billsNormalized.bookmarkedBillIds, BillID]
        ) : ( 
          billsNormalized.bookmarkedBillIds.filter((billId: string) => billId !== BillID)
        );

        const updatedBills = produce(billsNormalized, draft => {
          draft.entities[BillID] = bill;
          draft.bookmarkedBillIds = updatedBookmarkedBillIds;
        });
        console.log({updatedBills})

        const bookmarkedBillIdsSorted = [...updatedBills.bookmarkedBillIds].sort((a: any, b: any) => {
          return new Date(updatedBills.entities[b].status_at) -  new Date (updatedBills.entities[a].status_at);
        })
        
        dispatch(updateNormalizedBookmarks({ entities: updatedBills.entities, bookmarkedBillIds: bookmarkedBillIdsSorted }))
      }

      callback && callback();
    } catch (error) {
      console.log({ error })
      callback && callback();
      dispatch(
        displayGlobalError({
          error: getErrorMessage(
            `Failed to set bookmark. ${error}`,
          ),
        }),
      );
    }
  };
};

export const setFollowedRep = (
  requestParams: SetFollowedRepRequestParams,
  callback: () => void,
) => {
  return async (dispatch: Dispatch, getState: () => any) => {
    try {
      const {
        auth: { user },
        feed: { followedRepIds },
      } = getState();

      const { uid: UserID, myRepresentatives } = user;

      const {
        Member,
        newFollowStatus,
      } = requestParams;

      const response = await axios.post(
        `${API_BASE_URL}/FollowRep`,
        {
          Followed: newFollowStatus ? 'True' : 'False',
          Member,
          UserID,
        },
      );

      if (response.status === 200 && response.data !== 'Nothing Happened') {
        const newFollowedRepIds = newFollowStatus ? [...followedRepIds, Member] : followedRepIds.filter((billId: string) => billId !== Member);
        dispatch(updateFollowedRepIds(newFollowedRepIds));
        dispatch(wipeRepVotes());
        const requestParams: RepresentativesRequestParams = {
          Members: myRepresentatives,
          Page: 1,
          VotesPerPage: 15,
          SortedBy: 'Newest',
          ByUser: false,
          UserID: UserID,
          ReturnShort: true,
          showLoading: true,
          followedRepIds: newFollowedRepIds,
        };
        // @ts-ignore
        dispatch(fetchRepresentativeVotes(
          requestParams,
          () => {},
        ))
      }

      callback && callback();
    } catch (error) {
      callback && callback();
      dispatch(
        displayGlobalError({
          error: getErrorMessage(
            `Failed to set bookmark. ${error}`,
          ),
        }),
      );
    }
  };
};

// Thumbs up/thumbs down actions
export const registerVoteReaction = (
  requestParams: VoteReactionRequestParams,
) => {
  return async (dispatch: Dispatch, getState: () => FeedSliceState) => {
    try {
      // Don't wait for this request to finish before syncing/updating the redux state.
      // We need immediate user feedback; if an error occurs, the user will be informed
      await axios.post(`${API_BASE_URL}/VoteReaction`, requestParams);

      const {
        feed: { representativeVotes, followedRepVotes, representativeDetailVotes, interests },
      } = getState();

      let repVotesUpdateIndex = representativeVotes.findIndex(
        (vote: RepresentativeVote) => vote._id === requestParams.VoteID,
      );

      // There are two rep votes redux arrays in different slices; we update these to get them
      // in sync when a thumb click occurs.

      // Update representativeVotes redux state for thumb click
      let updatedRepresentativeVote;
      if (repVotesUpdateIndex !== -1) {
        updatedRepresentativeVote = produce(representativeVotes[repVotesUpdateIndex], draft => {
          draft.Reacted = requestParams.Reaction === 'UP' || requestParams.Reaction === 'DOWN';
          draft.UserResponse.reaction = requestParams.Reaction;
          draft.Member = setAcceptanceValue(
            requestParams.Reaction, draft.Member) as RepresentativeMember;
        });

        dispatch(
          updateRepresentativeVotes({
            repVotesUpdateIndex,
            updatedRepresentativeVote,
          }),
        );
      }

      let followedRepVotesUpdateIndex = followedRepVotes.findIndex(
        (vote: RepresentativeVote) => vote._id === requestParams.VoteID,
      );

      // There are two rep votes redux arrays in different slices; we update these to get them
      // in sync when a thumb click occurs.

      // Update representativeVotes redux state for thumb click
      let updatedFollowedRepVote;
      if (followedRepVotesUpdateIndex !== -1) {
        updatedFollowedRepVote = produce(followedRepVotes[followedRepVotesUpdateIndex], draft => {
          draft.Reacted = requestParams.Reaction === 'UP' || requestParams.Reaction === 'DOWN';
          draft.UserResponse.reaction = requestParams.Reaction;
          draft.Member = setAcceptanceValue(
            requestParams.Reaction, draft.Member) as RepresentativeMember;
        });

        dispatch(
          updateFollowedRepVotes({
            followedRepVotesUpdateIndex,
            updatedFollowedRepVote,
          }),
        );
      }

      // Update representativeDetailVotes redux state for thumb click
      const currentDetailVoteRecord =
        representativeDetailVotes[requestParams.Member];

      if (currentDetailVoteRecord) {
        const updateIndex = currentDetailVoteRecord.votes.findIndex(
          (vote: RepresentativeVote) => vote._id === requestParams.VoteID,
        );

        if (updateIndex !== -1) {
          let updatedVote = { ...currentDetailVoteRecord.votes[updateIndex] };
          updatedVote.Reacted =
            requestParams.Reaction === 'UP' ||
            requestParams.Reaction === 'DOWN';

          let reactionCopy = {
            ...currentDetailVoteRecord.votes[updateIndex].UserResponse,
          };
          reactionCopy.reaction = requestParams.Reaction;
          updatedVote.UserResponse = reactionCopy;

          let memberCopy = {
            ...currentDetailVoteRecord.votes[updateIndex].Member,
          };
          updatedVote.Member = setAcceptanceValue(
            requestParams.Reaction,
            memberCopy,
          ) as RepresentativeMember;

          const finalVotesCopy = [...currentDetailVoteRecord.votes];
          finalVotesCopy[updateIndex] = updatedVote;

          dispatch(
            updateRepresentativeDetailVotes({
              representativeId: requestParams.Member,
              updatedRepDetailVotes: finalVotesCopy,
            }),
          );
        }
      }
    } catch (error) {
      dispatch(
        displayGlobalError({
          error: getErrorMessage(`Failed to register voter rating. ${error}`),
        }),
      );
    }
  };
};

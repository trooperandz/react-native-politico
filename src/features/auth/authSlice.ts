import firebaseAuth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { createSlice } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

import { clearAppSlice } from '@ph/feats/app/appSlice';
import { clearFeedSlice } from '@ph/feats/feed/feedSlice';
import * as RootNavigation from '@ph/navs/utils';
import { displayGlobalError } from '@ph/feats/app/appSlice';
import { getErrorMessage } from '@ph/feats/app/utils';
import { AuthSliceState } from './types';
import {
  checkSetupStatus,
  getUserRepresentativesByDistrict,
  validateAddressWithAPI,
} from './utils';
import analytics from '@react-native-firebase/analytics';

// Initial authentication state
const initialState = {
  user: {},
  loading: false,
  resetSent: false,
  isSetupComplete: false, // for moving through the protected route flow for testing
};

// Create auth reducer and actions
const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUser(state, action) {
      state.user = action.payload.user;
      state.loading = false;
    },
    passwordResetSent(state) {
      state.resetSent = true;
      state.loading = false;
    },
    dismissResetConfirmation(state) {
      state.resetSent = false;
    },
    setIsSetupComplete(state, action) {
      state.isSetupComplete = action.payload;
    },
    setLoadingState(state, action) {
      state.loading = action.payload;
    },
    clearAuthSlice(state) {
      state.user = {};
      state.loading = false;
      state.resetSent = false;
      state.isSetupComplete = false;
    },
  },
});

// Export auth actions
export const {
  updateUser,
  passwordResetSent,
  dismissResetConfirmation,
  setIsSetupComplete,
  setLoadingState,
  clearAuthSlice,
} = auth.actions;

// Export auth reducer
export default auth.reducer;

// Check for authenticated user session and set user state on app load
export const getFirebaseSessionUser = (callback: () => void) => {
  return async (dispatch: Dispatch) => {
    // Firebase takes care of local user sessions for us via currentUser()
    const user = await firebaseAuth().currentUser;

    if (user !== null) {
      firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then(documentSnapshot => {
          const profile = documentSnapshot.data();

          dispatch(
            updateUser({
              user: profile,
            }),
          );

          // @ts-ignore
          dispatch(checkSetupStatus(profile));
          callback();
        })
        .catch(error => {
          dispatch(displayGlobalError({ error: getErrorMessage(error) }));
        });
    } else {
      callback();
    }
  };
};

/**
 * Authenticate user with firebase using email and password
 * @param {string} email User email
 * @param {string} password User password
 */
export const loginWithEmail = (email: string, password: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setLoadingState(true));

    firebaseAuth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential =>
        firestore()
          .collection('users')
          .doc(userCredential.user.uid)
          .get(),
      )
      .then(documentSnapshot => {
        const profile = documentSnapshot.data();

        dispatch(
          updateUser({
            user: profile,
          }),
        );
        // @ts-ignore
        dispatch(checkSetupStatus(profile));
      })
      .catch(error => {
        dispatch(displayGlobalError({ error: getErrorMessage(error) }));
        dispatch(setLoadingState(false));
      });
    analytics().logEvent('login', { name: email }); // collect analytics login
    analytics().setUserId(email);
  };
};

/**
 * Create user with firebase using email and password
 * @param {string} email User email
 * @param {string} password User password
 */
export const signUpWithEmail = (email: string, password: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setLoadingState(true));
    let profile = {};

    firebaseAuth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        profile = {
          uid: userCredential.user.uid,
          email: email,
        };
        return firestore()
          .collection('users')
          .doc(userCredential.user.uid)
          .set(profile);
      })
      .then(() => {
        dispatch(updateUser({ user: profile }));
        RootNavigation.navigate('UserSetup', null);
      })
      .catch(error => {
        dispatch(displayGlobalError({ error: getErrorMessage(error) }));
        dispatch(setLoadingState(false));
      });
  };
};

/**
 * Logout the current user
 */
export const logout = () => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoadingState(true));

    try {
      await firebaseAuth().signOut();
      dispatch(clearAuthSlice());
      dispatch(clearAppSlice());
      dispatch(clearFeedSlice());
    } catch (error) {
      dispatch(displayGlobalError({ error: getErrorMessage(error) }));
      dispatch(setLoadingState(false));
    }
  };
};

/**
 * Fetch function to get user profile information
 * @param {string} uid Unique user ID assigned by firebase authentication
 * @param {function} callback Callback action to invoke upon success
 */
export const fetchUserProfile = (uid: string, callback: () => void) => {
  return (dispatch: Dispatch) => {
    dispatch(setLoadingState(true));

    firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then(documentSnapshot => {
        const profile = documentSnapshot.data();
        dispatch(
          updateUser({
            user: profile,
          }),
        );
        callback && callback();
      })
      .catch(error => {
        dispatch(displayGlobalError({ error: getErrorMessage(error) }));
        dispatch(setLoadingState(false));
      });
  };
};

/**
 * Send a password reset link to an email address
 * @param {string} email Email to send reset instructions to
 * @param {function} callback Callback function to invoke on success
 */
export const sendPasswordResetEmail = (email: string, callback: () => void) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoadingState(true));

    try {
      await firebaseAuth().sendPasswordResetEmail(email);
      if (callback) {
        dispatch(passwordResetSent());
        callback();
      }
    } catch (error) {
      dispatch(displayGlobalError({ error: getErrorMessage(error) }));
      dispatch(setLoadingState(false));
    }
  };
};

export const registerUserAddress = (userStreet: string, userZip: string) => {
  return async (dispatch: Dispatch, getState: () => AuthSliceState) => {
    dispatch(setLoadingState(true));

    const {
      auth: { user },
    } = getState();

    // Validate user address, retrieve full address info and congressional district
    try {
      const {
        city,
        zipcode,
        street,
        state,
        congressionalDistrict,
      } = await validateAddressWithAPI(userStreet, userZip);

      // Save user's representatives based on district
      const Reps = await getUserRepresentativesByDistrict(
        state,
        congressionalDistrict,
        user.uid,
      );

      const userUpdateProps = {
        address: {
          city,
          state,
          street,
          zipcode,
        },
        congressionalDistrict,
        myRepresentatives: Reps,
      };

      const updatedUser = { ...user, ...userUpdateProps };

      await firestore()
        .collection('users')
        .doc(user.uid)
        .update({ ...userUpdateProps });

      dispatch(updateUser({ user: updatedUser }));
      RootNavigation.navigate('AgeRange', null);
    } catch (error) {
      dispatch(displayGlobalError({ error: getErrorMessage(error) }));
      dispatch(setLoadingState(false));
    }
  };
};

export const registerUserAgeRange = (ageRange: string) => {
  return async (dispatch: Dispatch, getState: () => AuthSliceState) => {
    dispatch(setLoadingState(true));
    try {
      const {
        auth: { user },
      } = getState();

      await firestore()
        .collection('users')
        .doc(user.uid)
        .update({
          ageRange,
        });
      dispatch(setLoadingState(false));
      dispatch(setIsSetupComplete(true));
    } catch (error) {
      dispatch(displayGlobalError({ error: getErrorMessage(error) }));
      dispatch(setLoadingState(false));
    }
  };
};

export const registerUserInterests = (
  selectedInterests: string[],
  callback?: () => void,
) => {
  return async (dispatch: Dispatch, getState: () => AuthSliceState) => {
    try {
      const {
        auth: { user },
      } = getState();

      await firestore()
        .collection('users')
        .doc(user.uid)
        .update({
          myInterests: selectedInterests,
        });

      dispatch(
        updateUser({ user: { ...user, myInterests: selectedInterests } }),
      );
      callback && callback();
    } catch (error) {
      callback && callback();
      dispatch(displayGlobalError({ error: getErrorMessage(error) }));
    }
  };
};

export const registerUserTutorialStatus = (callback?: () => void) => {
  return async (dispatch: Dispatch, getState: () => AuthSliceState) => {
    try {
      const {
        auth: { user },
      } = getState();

      const completedTutorial = true;

      await firestore()
        .collection('users')
        .doc(user.uid)
        .update({
          completedTutorial,
        });

      dispatch(updateUser({ user: { ...user, completedTutorial } }));
      callback && callback();
    } catch (error) {
      callback && callback();
      dispatch(displayGlobalError({ error: getErrorMessage(error) }));
    }
  };
};

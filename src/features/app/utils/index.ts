import { Error } from '../types';

// Some methods involve multiple requests to Firebase and other api's, this
// is a catch-all for providing custom and default errors that could be thrown
export const getErrorMessage = (error: Error) => {
  let errorMessage;

  if (typeof error === 'string') {
    errorMessage = error;
  } else {
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage =
          'The email address you entered is already taken. Please try again.';
        break;
      case 'auth/user-not-found':
        errorMessage =
          'We did not recongnize the username that you provided. Please try again.';
        break;
      case 'auth/wrong-password':
        errorMessage =
          'The password you entered is incorrect. Please try again.';
        break;
      default:
        errorMessage = error.message;
    }
  }

  return errorMessage;
};

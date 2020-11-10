import axios from 'axios';
import { Dispatch } from 'redux';

import { setIsSetupComplete } from '@ph/feats/auth/authSlice';
import * as RootNavigation from '@ph/navs/utils';
import { API_BASE_URL } from '../../../utils/constants';
import { User } from '@ph/feats/auth/types';

const validateEmail = (email: string) => {
  if (!email) {
    return 'Email address is required';
  } else if (!/^([a-zA-Z0-9_+\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email)) {
    return 'Email address is invalid';
  }

  return undefined;
};

const validatePassword = (password: string) => {
  if (!password) {
    return 'Password is required';
  } else if (password.length < 6) {
    return 'Password must be at least six characters';
  }

  return undefined;
};

const validateStreet = (street: string) => {
  if (!street) {
    return 'Street address is required';
  }

  return undefined;
};

const validateZipcode = (zipcode: string) => {
  if (!zipcode) {
    return 'Zip code is required';
  }

  return undefined;
};

export const validateFormFields = (values: { [key: string]: string }) => {
  let errors: { [key: string]: string | undefined } = {};

  Object.keys(values).forEach((key: string) => {
    const formValue = values[key];

    switch (key) {
      case 'email':
        const emailError = validateEmail(formValue);
        emailError && (errors.email = emailError);
        break;
      case 'password':
        const passwordError = validatePassword(formValue);
        passwordError && (errors.password = passwordError);
        break;
      case 'street':
        const streetError = validateStreet(formValue);
        streetError && (errors.street = streetError);
        break;
      case 'zipcode':
        const zipcodeError = validateZipcode(formValue);
        zipcodeError && (errors.zipcode = zipcodeError);
        break;
      default:
        break;
    }
  });

  return errors;
};

// https://smartystreets.com/docs/cloud/us-street-api
// https://smartystreets.com/products/apis/us-street-api
export const validateAddressWithAPI = async (street: string, zipcode: string) => {
  // TODO: should be using the client-side key here instead
  const params = {
    'auth-id': 'f0dc3e42-bf77-a754-28b0-382692c3ff40',
    'auth-token': 'hqPQkoTZvOYu5p3sLUdW',
    // key: '15390665133286830',
    street,
    zipcode,
    candidates: 1,
    match: 'valid',
  };
  const apiErrorMsg = 'Sorry, there was an error confirming your address. Please check your address and try again.';

  try {
    const response = await axios.get(
      'https://us-street.api.smartystreets.com/street-address',
      { params },
    );

    if (response.status == 200) {
      if (response.data?.length) {
        const { 
          components: { 
            city_name: city,  
            state_abbreviation: state, 
            zipcode,
          },
          metadata: { 
            congressional_district: congressionalDistrict, 
          },
          delivery_line_1: street,
        } = response.data[0];

        return {
          city,
          congressionalDistrict,
          state,
          street,
          zipcode,
        }
      } else {
        return Promise.reject('Sorry, the address you entered was not found.');
      }
    } else {
      return Promise.reject(apiErrorMsg);
    }
  } catch (error) {
    return Promise.reject(apiErrorMsg);
  }
};

export const getUserRepresentativesByDistrict = async (state: string, district: string, userId: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/ReturnReps`, {
        State: state,
        District: district,
        UserID: userId,
      });

    const { Reps } = response.data;

    return (Reps?.length) ? Reps : Promise.reject('There were no user representatives found.');
  } catch (error) {
    console.log({ error })
    return Promise.reject('There was an error fetching the user reps by district.');
  }
};

// If user logs in and did not previously complete all setup steps, move them into the correct step in the setup stack
export const checkSetupStatus = (user: User) => {
  return (dispatch: Dispatch) => {
    const setupFields = [
      'address',
      'ageRange',
    ];

    // TODO: clean this up a bit; maybe rename screens so they map directly etc
    const screenMap = {
      address: 'Address',
      ageRange: 'AgeRange',
    };

    const userAttributes = Object.keys(user);
    let foundIncompleteStep = false;

    // Use for loop so we can break out of it
    for (let i = 0; i < setupFields.length - 1; i++) {
      const userAttribute = setupFields[i];

      if (!userAttributes.includes(userAttribute)) {
        foundIncompleteStep = true;

        RootNavigation.navigate('UserSetup', {
          // @ts-ignore
          screen: screenMap[userAttribute],
        });
        break;
      }
    }

    // Set state to send user into main app if all setup steps are complete
    if (!foundIncompleteStep) {
      dispatch(setIsSetupComplete(true));
    }
  };
};

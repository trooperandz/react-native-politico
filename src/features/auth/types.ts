// User state; maps to Firebase db record and redux state
export type User = {
  address?: {
    city: string;
    state: string;
    street: string;
    zipcode: string;
  };
  ageRange?: string;
  allowLocation?: boolean;
  completedTutorial?: boolean;
  congressionalDistrict: string;
  email: string;
  myInterests: string[];
  myRepresentatives: string[];
  password: string;
  uid: string;
  viewedTutorial: boolean;
  [key: string]: any;
};

export type AuthState = {
  user: User;
  loading: boolean;
  resetSent: boolean;
  isSetupComplete: boolean;
};

export type AuthSliceState = {
  auth: AuthState;
};

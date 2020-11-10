import { combineReducers } from '@reduxjs/toolkit';
import appReducer from '../features/app/appSlice';
import authReducer from '../features/auth/authSlice';
import feedReducer from '../features/feed/feedSlice';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  feed: feedReducer,
});

export default rootReducer;

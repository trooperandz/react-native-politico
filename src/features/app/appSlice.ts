import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: '',
};

// Create app reducer and actions
const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    displayGlobalError(state, action) {
      state.error = action.payload.error;
    },
    removeGlobalError(state) {
      state.error = '';
    },
    clearAppSlice(state) {
      state.error = '';
    },
  },
});

export const {
  displayGlobalError,
  removeGlobalError,
  clearAppSlice,
} = app.actions;

export default app.reducer;

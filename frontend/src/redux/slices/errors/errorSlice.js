import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action) => {
      return action.payload;
    },
    removeError: (state, action) => {
      return initialState;
    },
  },
});

export const { setError, removeError } = errorSlice.actions;
export const selectErrorMessage = (state) => {
  return state.errors;
};

export default errorSlice.reducer;

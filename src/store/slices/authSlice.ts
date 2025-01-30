import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../types';

const initialState: AuthState = {
  isAuthenticated: false,
  idInstance: '',
  apiTokenInstance: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ idInstance: string; apiTokenInstance: string }>
    ) => {
      state.isAuthenticated = true;
      state.idInstance = action.payload.idInstance;
      state.apiTokenInstance = action.payload.apiTokenInstance;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.idInstance = '';
      state.apiTokenInstance = '';
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

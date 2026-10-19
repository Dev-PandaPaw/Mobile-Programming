import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo } from '../services/authService';

export interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  user: UserInfo | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{ token: string; user: UserInfo }>
    ) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;

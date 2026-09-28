import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserInfo {
  id: string;
  name: string;
  email: string;
}

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
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserInfo | undefined>) => {
      state.isLoggedIn = true;
      state.token = "mock_token_abc_123";
      state.user = action.payload || {
        id: "1",
        name: "Nguyễn Văn A",
        email: "nguyenvana@gmail.com",
      };
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

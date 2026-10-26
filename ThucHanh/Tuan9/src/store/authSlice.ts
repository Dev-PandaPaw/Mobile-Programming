// src/store/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';
import authService, { AuthResult } from '../services/authService';
import { setAuthToken } from '../api/client';

export const AUTH_STORAGE_KEY = 'auth_session';

export interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  user: User | null;
  expiresAt: number | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  user: null,
  expiresAt: null,
  isLoading: false,
};

// Auto-login: đọc AsyncStorage khi mở app và xác minh token
export const restoreSession = createAsyncThunk<AuthResult | null>(
  'auth/restore',
  async () => {
    try {
      const raw = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      if (!raw) return null;

      const saved: AuthResult = JSON.parse(raw);
      const isValid = !!saved.token && !!saved.user?.id && saved.expiresAt > Date.now();

      if (!isValid) {
        await AsyncStorage.removeItem(AUTH_STORAGE_KEY); // token hết hạn → xoá
        setAuthToken(null);
        return null;
      }

      setAuthToken(saved.token);

      // Xác minh token với server: GET /users/:id (route 600, cần token hợp lệ)
      try {
        const user = await authService.getMe(saved.user.id);
        return { ...saved, user };
      } catch (err: any) {
        // 401: token sai/hết hạn · 403: không phải chủ tài khoản · 404: user đã bị xoá
        if ([401, 403, 404].includes(err?.response?.status)) {
          await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
          setAuthToken(null);
          return null;
        }
        return saved; // Mất mạng: vẫn cho vào bằng dữ liệu đã lưu
      }
    } catch {
      return null; // Dữ liệu hỏng → coi như chưa đăng nhập
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthResult>) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.expiresAt = action.payload.expiresAt;
      setAuthToken(action.payload.token);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
      state.expiresAt = null;
      setAuthToken(null);
      AsyncStorage.removeItem(AUTH_STORAGE_KEY).catch(() => {});
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(restoreSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.isLoggedIn = true;
          state.token = action.payload.token;
          state.user = action.payload.user;
          state.expiresAt = action.payload.expiresAt;
        } else {
          state.isLoggedIn = false;
          state.token = null;
          state.user = null;
          state.expiresAt = null;
        }
      })
      .addCase(restoreSession.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;

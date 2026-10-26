// src/api/client.ts
import { Platform } from 'react-native';

// ===== Địa chỉ json-server =====
// - Điện thoại thật (Expo Go): IP LAN của máy tính chạy json-server (192.168.1.131)
// - Android Emulator: 10.0.2.2
// - Web / iOS Simulator: localhost
const LAN_IP = '192.168.1.131';
const PORT = 3000;

// Đặt USE_REAL_DEVICE = false khi chạy Web hoặc Android Emulator
// Đặt USE_REAL_DEVICE = true khi quét mã QR Expo Go bằng điện thoại thật
export const USE_REAL_DEVICE = false;

const host = Platform.OS === 'web'
  ? 'localhost'
  : USE_REAL_DEVICE
  ? LAN_IP
  : Platform.OS === 'android'
  ? '10.0.2.2'
  : 'localhost';

export const BASE_URL = `http://${host}:${PORT}`;

// Gắn token vào mọi request
let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

// Bóc tách thông báo lỗi từ server (dạng string, ví dụ: "Incorrect password")
export const getServerMessage = (err: any): string | undefined => {
  if (typeof err?.response?.data === 'string') {
    return err.response.data;
  }
  return undefined;
};

// API Client chuẩn REST tương thích hoàn toàn axios, dùng fetch native không lỗi Metro
export const api = {
  async get<T = any>(
    endpoint: string,
    options?: { params?: Record<string, any>; headers?: Record<string, string> }
  ): Promise<{ data: T; status: number; headers?: Headers }> {
    let url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;
    if (options?.params) {
      const query = Object.entries(options.params)
        .filter(([_, v]) => v !== undefined && v !== null)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
        .join('&');
      if (query) url += (url.includes('?') ? '&' : '?') + query;
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    };
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    const res = await fetch(url, { method: 'GET', headers });
    const text = await res.text();
    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }

    if (!res.ok) {
      const error: any = new Error(typeof data === 'string' ? data : `HTTP ${res.status}`);
      error.response = { status: res.status, data };
      throw error;
    }

    return { data, status: res.status, headers: res.headers };
  },

  async post<T = any>(
    endpoint: string,
    body?: any,
    options?: { headers?: Record<string, string> }
  ): Promise<{ data: T; status: number; headers?: Headers }> {
    const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    };
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const text = await res.text();
    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }

    if (!res.ok) {
      const error: any = new Error(typeof data === 'string' ? data : `HTTP ${res.status}`);
      error.response = { status: res.status, data };
      throw error;
    }

    return { data, status: res.status, headers: res.headers };
  },

  async delete<T = any>(
    endpoint: string,
    options?: { headers?: Record<string, string> }
  ): Promise<{ data: T; status: number; headers?: Headers }> {
    const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    };
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    const res = await fetch(url, {
      method: 'DELETE',
      headers,
    });

    const text = await res.text();
    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }

    if (!res.ok) {
      const error: any = new Error(typeof data === 'string' ? data : `HTTP ${res.status}`);
      error.response = { status: res.status, data };
      throw error;
    }

    return { data, status: res.status, headers: res.headers };
  },
};

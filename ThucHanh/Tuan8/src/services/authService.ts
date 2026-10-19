export interface UserInfo {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: UserInfo;
}

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    // Giả lập gọi API login
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      token: 'token_' + Date.now(),
      user: {
        id: '1',
        name: email.split('@')[0],
        email: email,
      },
    };
  },

  register: async (
    email: string,
    password: string,
    name?: string
  ): Promise<AuthResponse> => {
    // Giả lập gọi API register
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      token: 'token_' + Date.now(),
      user: {
        id: 'user_' + Date.now(),
        name: name || email.split('@')[0],
        email: email,
      },
    };
  },
};

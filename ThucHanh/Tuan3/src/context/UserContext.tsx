import React, { createContext, useState, ReactNode } from 'react';

export interface User {
  name: string;
  email: string;
  avatar: string;
}

export interface UserContextType {
  user: User | null;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>({
    name: 'Võ Văn Cảnh',
    email: 'canh.vo@example.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
  });

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, logout }}>
      {children}
    </UserContext.Provider>
  );
}

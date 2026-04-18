import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Role } from '../shared/config/sitemap';

interface AuthContextValue {
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentRole, setCurrentRole] = useState<Role>('admin');

  return (
    <AuthContext.Provider value={{ currentRole, setCurrentRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}

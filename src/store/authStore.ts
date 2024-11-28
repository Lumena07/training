import { create } from 'zustand';
import { AuthState, User, UserRole } from '../types/auth';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string, _password: string) => {
    // TODO: Implement actual API call
    const mockUser: User = {
      id: '1',
      email: email, // this will use the email provided in the login
      password: _password,
      token: 'mock-jwt-token',
      firstName: 'John',
      lastName: 'Doe',
      role: UserRole.TRAINEE,
    };
    set({ user: mockUser, isAuthenticated: true });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));
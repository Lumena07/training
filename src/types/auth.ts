export interface User {
  id: string;
  email: string;
  token?: string;  
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  password?: string;
}

export enum UserRole {
  TRAINEE = 'TRAINEE',
  TRAINING_CAPTAIN = 'TRAINING_CAPTAIN',
  HR_ADMIN = 'HR_ADMIN',
  COMPLIANCE_OFFICER = 'COMPLIANCE_OFFICER'
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
/**
 * Auth user data
 */
export interface AuthUser {
  email: string | null;
  phone: string | null;
}

/**
 * Auth user update data
 */
export interface UpdateAuthUserData {
  email?: string;
  phone?: string;
  password?: string;
}

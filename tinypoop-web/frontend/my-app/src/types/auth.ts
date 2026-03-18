export interface AuthUser {
  id: string;
  user_id: string;
  username: string;
  email?: string;
  role: string;
}

export const AUTH_STORAGE_KEY = "tinypoop.auth.user";

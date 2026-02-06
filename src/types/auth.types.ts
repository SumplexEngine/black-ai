/**
 * Tipos relacionados con autenticación
 */

import type { UserProfile } from "./database.types";

// ============================================
// USUARIO
// ============================================

export interface User {
  id: string;
  email: string;
  emailConfirmedAt?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface UserWithProfile extends User {
  profile: UserProfile | null;
}

// ============================================
// ESTADO DE AUTENTICACIÓN
// ============================================

export interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: AuthError | null;
}

// ============================================
// CREDENCIALES
// ============================================

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  confirmPassword: string;
  username?: string;
  acceptTerms: boolean;
}

export interface ForgotPasswordCredentials {
  email: string;
}

export interface ResetPasswordCredentials {
  password: string;
  confirmPassword: string;
}

// ============================================
// RESPUESTAS Y ERRORES
// ============================================

export interface AuthError {
  message: string;
  code?: string;
  status?: number;
}

export interface AuthResponse<T = null> {
  success: boolean;
  data?: T;
  error?: AuthError;
}

export interface LoginResponse {
  user: User;
  profile: UserProfile | null;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

// ============================================
// SESIÓN
// ============================================

export interface Session {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  user: User;
}

export interface SessionState {
  session: Session | null;
  isLoading: boolean;
  isExpired: boolean;
}

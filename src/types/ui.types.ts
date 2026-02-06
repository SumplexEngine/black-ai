/**
 * Tipos relacionados con la interfaz de usuario
 */

import type { ReactNode } from "react";

// ============================================
// TEMA
// ============================================

export type Theme = "dark" | "light" | "system";

export interface ThemeState {
  theme: Theme;
  resolvedTheme: "dark" | "light";
  setTheme: (theme: Theme) => void;
}

// ============================================
// TOAST / NOTIFICACIONES
// ============================================

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// ============================================
// MODAL
// ============================================

export interface ModalState {
  isOpen: boolean;
  title?: string;
  description?: string;
  content?: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface ModalConfig {
  id: string;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
}

// ============================================
// SIDEBAR
// ============================================

export interface SidebarState {
  isOpen: boolean;
  isCollapsed: boolean;
  width: number;
}

// ============================================
// ESTADO GLOBAL DE UI
// ============================================

export interface UIState {
  theme: Theme;
  sidebar: SidebarState;
  isMobile: boolean;
  isTablet: boolean;
  modals: Record<string, ModalState>;
  toasts: Toast[];
}

// ============================================
// COMPONENTES
// ============================================

export type ButtonVariant =
  | "default"
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "success"
  | "link";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl" | "icon";

export type InputSize = "sm" | "md" | "lg";

export type InputVariant = "default" | "filled" | "outlined";

export interface SelectOption<T = string> {
  value: T;
  label: string;
  disabled?: boolean;
  icon?: ReactNode;
  description?: string;
}

// ============================================
// NAVEGACIÓN
// ============================================

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  isCurrentPage?: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: ReactNode;
  badge?: string | number;
  isActive?: boolean;
  isDisabled?: boolean;
  children?: NavItem[];
}

// ============================================
// TABLA
// ============================================

export interface TableColumn<T> {
  id: string;
  header: string;
  accessor: keyof T | ((row: T) => ReactNode);
  sortable?: boolean;
  width?: string;
}

export interface TableState {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
}

// ============================================
// FORMULARIOS
// ============================================

export interface FormFieldState {
  value: string;
  error?: string;
  touched: boolean;
  isValidating: boolean;
}

export interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
}

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina clases de Tailwind de forma inteligente
 * Maneja conflictos y elimina duplicados
 *
 * @example
 * cn("px-4 py-2", "px-6") // => "py-2 px-6"
 * cn("text-red-500", isActive && "text-blue-500") // condicional
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

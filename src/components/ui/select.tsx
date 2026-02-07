import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import * as React from "react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "onChange"
> {
  options: SelectOption[];
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      options,
      label,
      error,
      helperText,
      placeholder,
      disabled,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e.target.value);
    };

    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="text-sm font-medium text-white">{label}</label>
        )}
        <div className="relative">
          <select
            ref={ref}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            className={cn(
              // Base
              "flex h-11 w-full appearance-none rounded-lg border px-4 py-2 pr-10 text-sm transition-all duration-200",
              // Colors - Fondo negro, texto blanco
              "bg-[#0a0a0a] text-white",
              // Border
              "border-white/20 hover:border-white/40",
              // Focus
              "focus:border-white/40 focus:ring-2 focus:ring-white/20 focus:outline-none",
              // Disabled
              "disabled:cursor-not-allowed disabled:opacity-50",
              // Placeholder color cuando no hay valor
              !value && "text-gray-500",
              // Error
              error &&
                "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20",
              className
            )}
            style={{
              colorScheme: "dark",
            }}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
        {error && (
          <p className="animate-fade-in text-sm text-red-400">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };

import React from 'react';
import { cn } from '../../utils/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    className, 
    variant = 'primary', 
    size = 'md', 
    fullWidth = false, 
    isLoading = false,
    disabled, 
    ...props 
  }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      primary: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
      secondary: "bg-neutral-800 text-white hover:bg-neutral-700 focus-visible:ring-neutral-700",
      outline: "border border-neutral-700 bg-transparent hover:bg-neutral-800 text-white",
      ghost: "bg-transparent hover:bg-neutral-800 text-white"
    };
    
    const sizes = {
      sm: "text-xs px-3 py-1.5",
      md: "text-sm px-4 py-2",
      lg: "text-base px-5 py-2.5"
    };
    
    const widthClass = fullWidth ? "w-full" : "";
    
    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          widthClass,
          isLoading && "opacity-70 cursor-not-allowed",
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
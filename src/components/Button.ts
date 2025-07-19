/**
 * Button component
 * A reusable button component following design system principles
 */

export interface ButtonProps {
  children: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onClick?: () => void;
}

export class Button {
  private props: ButtonProps;

  constructor(props: ButtonProps) {
    this.props = props;
  }

  render(): string {
    const {
      children,
      variant = "primary",
      size = "md",
      disabled = false,
    } = this.props;

    const baseClasses = "button";
    const variantClass = `button--${variant}`;
    const sizeClass = `button--${size}`;
    const disabledClass = disabled ? "button--disabled" : "";

    const classes = [baseClasses, variantClass, sizeClass, disabledClass]
      .filter(Boolean)
      .join(" ");

    return `
      <button 
        class="${classes}" 
        ${disabled ? "disabled" : ""}
        type="button"
      >
        ${children}
      </button>
    `.trim();
  }

  getStyles(): string {
    return `
      .button {
        border: none;
        border-radius: 0.375rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
        font-family: inherit;
      }
      
      .button--primary {
        background-color: #3b82f6;
        color: white;
      }
      
      .button--primary:hover:not(.button--disabled) {
        background-color: #2563eb;
      }
      
      .button--secondary {
        background-color: #6b7280;
        color: white;
      }
      
      .button--secondary:hover:not(.button--disabled) {
        background-color: #4b5563;
      }
      
      .button--outline {
        background-color: transparent;
        border: 1px solid #d1d5db;
        color: #374151;
      }
      
      .button--outline:hover:not(.button--disabled) {
        background-color: #f9fafb;
      }
      
      .button--sm {
        padding: 0.25rem 0.75rem;
        font-size: 0.875rem;
      }
      
      .button--md {
        padding: 0.5rem 1rem;
        font-size: 1rem;
      }
      
      .button--lg {
        padding: 0.75rem 1.5rem;
        font-size: 1.125rem;
      }
      
      .button--disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `.trim();
  }
}

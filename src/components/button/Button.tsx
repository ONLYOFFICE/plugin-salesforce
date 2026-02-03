import type { ComponentChildren } from 'preact';

import './button.css';

type ButtonVariant = 'primary' | 'link' | 'secondary';

interface ButtonProps {
  children: ComponentChildren;
  variant?: ButtonVariant;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
}

export function Button({
  children,
  variant = 'primary',
  type = 'button',
  disabled = false,
  fullWidth = false,
  onClick,
}: ButtonProps) {
  const className = [
    'btn',
    `btn--${variant}`,
    fullWidth ? 'btn--full-width' : '',
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

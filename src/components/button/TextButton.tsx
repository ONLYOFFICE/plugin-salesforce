import type { ComponentChildren } from 'preact';

import './text-button.css';

interface TextButtonProps {
  children: ComponentChildren;
  title?: string;
  disabled?: boolean;
  onClick: () => void;
}

export function TextButton({
  children, title, disabled = false, onClick,
}: TextButtonProps) {
  return (
    <button
      type="button"
      className="text-button"
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  );
}

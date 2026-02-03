import type { ComponentChildren } from 'preact';

import './label.css';

interface LabelProps {
  children: ComponentChildren;
  htmlFor?: string;
  className?: string;
}

export function Label({ children, htmlFor, className = '' }: LabelProps) {
  const classes = ['label', className].filter(Boolean).join(' ');

  return (
    <label className={classes} htmlFor={htmlFor}>
      {children}
    </label>
  );
}

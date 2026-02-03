import type { ComponentChildren } from 'preact';

import './text.css';

interface ParagraphProps {
  children: ComponentChildren;
  className?: string;
}

export function Paragraph({ children, className = '' }: ParagraphProps) {
  const classes = ['text', className].filter(Boolean).join(' ');

  return <p className={classes}>{children}</p>;
}

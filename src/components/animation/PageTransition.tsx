import type { ComponentChildren } from 'preact';

import './transition.css';

interface PageTransitionProps {
  children: ComponentChildren;
  step: string;
}

export function PageTransition({ children, step }: PageTransitionProps) {
  const getClassName = () => {
    if (step === 'loading') return 'page-transition page-transition--loading';
    if (step === 'success') return 'page-transition page-transition--success';
    return 'page-transition';
  };

  return (
    <div key={step} className={getClassName()}>
      {children}
    </div>
  );
}

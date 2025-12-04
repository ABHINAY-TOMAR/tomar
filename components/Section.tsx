import React from 'react';

interface Props {
  children: React.ReactNode;
  align?: 'left' | 'right' | 'center';
  className?: string;
}

export const Section: React.FC<Props> = ({ children, align = 'left', className = '' }) => {
  return (
    <section 
      className={`h-screen w-screen flex flex-col justify-center p-8 md:p-20 relative pointer-events-none ${
        align === 'left' ? 'items-start' : 
        align === 'right' ? 'items-end' : 
        'items-center'
      } ${className}`}
    >
      <div className="pointer-events-auto max-w-4xl w-full">
        {children}
      </div>
    </section>
  );
};
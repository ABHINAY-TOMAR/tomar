import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "px-8 py-3 rounded-sm font-orbitron tracking-widest uppercase text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-cyan-500 text-black hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] font-bold",
    secondary: "bg-purple-600 text-white hover:bg-purple-500 hover:shadow-[0_0_20px_rgba(147,51,234,0.6)] font-bold",
    outline: "border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 backdrop-blur-sm"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
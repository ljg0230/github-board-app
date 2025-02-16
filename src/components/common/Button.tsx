import { FC, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button: FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  return (
    <button className={`button ${variant}`} {...props}>
      {children}
    </button>
  );
}; 
import React from "react";
import { cn } from "../../utils"; // Ensure this points to your cn function

type ButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  className?: string; // Added className prop
};

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  onClick,
  className,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "relative inline-flex h-12 overflow-hidden rounded-lg p-[2px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 transition-transform hover:scale-105 cursor-pointer duration-300 ease-in-out",
        className
      )}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#a2aeff_0%,#3749be_50%,#a2aeff_100%)]" />
      <span className="inline-flex h-full w-full items-center justify-center rounded-lg bg-[#ffffff] px-8 text-sm font-medium text-gray-500 backdrop-blur-3xl transition-transform duration-300 ease-in-out transform">
        {children}
      </span>
    </button>
  );
};

export default Button;

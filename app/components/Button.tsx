import React from "react";

interface ButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function Button({
  text,
  href,
  onClick,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const baseStyle =
    "inline-block px-6 py-2 rounded-full font-base font-medium text-sm transition-all duration-300";

  const variants = {
    primary:
      "bg-primary text-light hover:bg-opacity-90 shadow-md hover:shadow-lg hover:scale-[1.02]",
    secondary:
      "bg-light text-dark border border-primary hover:bg-primary hover:text-light",
  };

  const combined = `${baseStyle} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={combined}>
        {text}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={combined}>
      {text}
    </button>
  );
}

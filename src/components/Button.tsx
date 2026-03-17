import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "rounded-xl font-bold transition-all duration-200 cursor-pointer",
        {
          "bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-md hover:shadow-lg hover:from-orange-600 hover:to-orange-500 active:scale-[0.98]":
            variant === "primary",
          "border-2 border-gray-200 bg-white text-gray-700 hover:border-orange-300 hover:bg-orange-50":
            variant === "secondary",
          "text-gray-500 hover:text-orange-600": variant === "ghost",
        },
        {
          "px-4 py-2 text-sm": size === "sm",
          "px-6 py-3 text-base": size === "md",
          "px-8 py-4 text-lg": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

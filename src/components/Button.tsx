import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: Props) {
  const styles =
    variant === "primary"
      ? "bg-brand text-white hover:bg-brand-dark disabled:bg-stone-300 disabled:text-stone-500"
      : "bg-white text-ink border border-line hover:bg-stone-50 disabled:bg-stone-100 disabled:text-stone-400";

  return (
    <button
      className={`h-12 w-full rounded-lg cursor-pointer font-semibold transition-colors disabled:cursor-not-allowed disabled:hover:bg-stone-300 ${styles} ${className}`}
      {...props}
    />
  );
}

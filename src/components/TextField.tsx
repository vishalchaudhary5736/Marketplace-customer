import { forwardRef, type InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const TextField = forwardRef<HTMLInputElement, Props>(
  ({ label, error, id, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        ref={ref}
        className={`h-12 rounded-lg border bg-white px-3.5 outline-none focus:ring-2 focus:ring-brand/40 ${
          error ? "border-red-600" : "border-line"
        }`}
        {...props}
      />
      {error && <span className="text-sm text-red-700">{error}</span>}
    </div>
  ),
);

import { forwardRef, type SelectHTMLAttributes } from "react";
import type { SELECT_TYPE } from "../types/constantsType";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: SELECT_TYPE[];
  placeholder?: string;
  error?: string;
};

export const SelectField = forwardRef<HTMLSelectElement, Props>(
  ({ label, error, options, placeholder = "Select", id, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <select
        id={id}
        ref={ref}
        className={`h-12 rounded-lg border bg-white px-3.5 outline-none focus:ring-2 focus:ring-brand/40 ${
          error ? "border-red-600" : "border-line"
        }`}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      {error && <span className="text-sm text-red-700">{error}</span>}
    </div>
  ),
);

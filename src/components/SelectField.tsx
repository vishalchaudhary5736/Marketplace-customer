import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import type { SELECT_TYPE } from "../types/constantsType";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: SELECT_TYPE[];
  placeholder?: string;
  error?: string;
};

export const SelectField = forwardRef<HTMLSelectElement, Props>(
  (
    {
      label,
      error,
      options,
      placeholder = "Select",
      id,
      className = "",
      value,
      ...props
    },
    ref,
  ) => (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>

      {/* "group" lets the icon react when the select is focused */}
      <div className="group relative">
        <select
          id={id}
          ref={ref}
          value={value}
          className={`peer h-12 w-full cursor-pointer appearance-none rounded-lg border bg-white pl-3.5 pr-10
            text-stone-900 shadow-sm outline-none transition-all duration-150
            hover:border-brand/60
            focus:border-brand focus:ring-4 focus:ring-brand/15
            disabled:cursor-not-allowed disabled:bg-stone-100 disabled:text-muted
            [&:has(option[value='']:checked)]:text-muted
            ${error ? "border-red-600 focus:border-red-600 focus:ring-red-600/15" : "border-line"}
            ${className}`}
          {...props}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((item) => (
            <option
              key={item.value}
              value={item.value}
              className="text-stone-900"
            >
              {item.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={18}
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted
            transition-transform duration-200
            peer-focus:rotate-180 peer-focus:text-brand"
        />
      </div>

      {error && <span className="text-sm text-red-700">{error}</span>}
    </div>
  ),
);

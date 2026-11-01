import { useState } from "react";
import { CalendarDays, ChevronDown, X } from "lucide-react";

export interface DateRange {
  startDate: string;
  endDate: string;
}

type DateRangePreset =
  | "All dates"
  | "Today"
  | "Last 7 days"
  | "Last 30 days"
  | "This month"
  | "Last month"
  | "Custom range";

interface DateRangeFilterProps {
  onApply?: (range: DateRange) => void;
  initialRange?: DateRange | null;
}

const EMPTY_RANGE: DateRange = {
  startDate: "",
  endDate: "",
};

const PRESETS: DateRangePreset[] = [
  "All dates",
  "Today",
  "Last 7 days",
  "Last 30 days",
  "This month",
  "Last month",
  "Custom range",
];

const getDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getRange = (preset: DateRangePreset): DateRange => {
  const today = new Date();
  const end = getDateString(today);
  const start = new Date(today);

  switch (preset) {
    case "All dates":
    case "Custom range":
      return EMPTY_RANGE;

    case "Today":
      return { startDate: end, endDate: end };

    case "Last 7 days":
      start.setDate(today.getDate() - 6);
      break;

    case "Last 30 days":
      start.setDate(today.getDate() - 29);
      break;

    case "This month":
      start.setDate(1);
      break;

    case "Last month": {
      const firstDay = new Date(today.getFullYear(), today.getMonth() - 1, 1);

      const lastDay = new Date(today.getFullYear(), today.getMonth(), 0);

      return {
        startDate: getDateString(firstDay),
        endDate: getDateString(lastDay),
      };
    }
  }

  return {
    startDate: getDateString(start),
    endDate: end,
  };
};

const formatDate = (date: string): string => {
  if (!date) return "";

  return new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function DateRangeFilter({
  onApply,
  initialRange = null,
}: DateRangeFilterProps) {
  const initial = initialRange ?? EMPTY_RANGE;

  const [open, setOpen] = useState<boolean>(false);
  const [appliedRange, setAppliedRange] = useState<DateRange>(initial);
  const [draftRange, setDraftRange] = useState<DateRange>(initial);

  const [selectedPreset, setSelectedPreset] = useState<DateRangePreset>(
    initial.startDate && initial.endDate ? "Custom range" : "All dates",
  );

  const selectPreset = (preset: DateRangePreset): void => {
    setSelectedPreset(preset);
    setDraftRange(getRange(preset));
  };

  const applyFilter = (): void => {
    const { startDate, endDate } = draftRange;

    if (Boolean(startDate) !== Boolean(endDate)) {
      alert("Please select both start and end dates.");
      return;
    }

    if (startDate && endDate && startDate > endDate) {
      alert("Start date cannot be after end date.");
      return;
    }

    setAppliedRange({ ...draftRange });
    onApply?.({ ...draftRange });
    setOpen(false);
  };

  const cancelFilter = (): void => {
    setDraftRange({ ...appliedRange });

    setSelectedPreset(
      appliedRange.startDate && appliedRange.endDate
        ? "Custom range"
        : "All dates",
    );

    setOpen(false);
  };

  const label =
    appliedRange.startDate && appliedRange.endDate
      ? `${formatDate(appliedRange.startDate)} – ${formatDate(
          appliedRange.endDate,
        )}`
      : "All dates";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => {
          setDraftRange({ ...appliedRange });
          setOpen((previous) => !previous);
        }}
        className="flex w-full items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 shadow-sm transition hover:border-orange-400"
      >
        <span className="flex min-w-0 items-center gap-2">
          <CalendarDays size={17} className="shrink-0 text-gray-500" />
          <span className="truncate">{label}</span>
        </span>

        <ChevronDown
          size={16}
          className={`shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-[min(560px,calc(100vw-2rem))] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr]">
            <div className="border-b border-gray-100 bg-gray-50 p-2 sm:border-b-0 sm:border-r">
              {PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => selectPreset(preset)}
                  className={`mb-1 w-full rounded-md px-3 py-2 text-left text-sm transition ${
                    selectedPreset === preset
                      ? "bg-orange-50 font-medium text-orange-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>

            <div className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">
                  Select date range
                </h3>

                <button
                  type="button"
                  onClick={cancelFilter}
                  aria-label="Close date filter"
                  className="rounded p-1 text-gray-500 hover:bg-gray-100"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="text-sm text-gray-600">
                  Start date
                  <input
                    type="date"
                    value={draftRange.startDate}
                    max={draftRange.endDate || undefined}
                    onChange={(event) => {
                      setDraftRange((previous) => ({
                        ...previous,
                        startDate: event.target.value,
                      }));
                      setSelectedPreset("Custom range");
                    }}
                    className="mt-1 w-full min-w-0 rounded-lg border border-gray-200 px-2 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </label>

                <label className="text-sm text-gray-600">
                  End date
                  <input
                    type="date"
                    value={draftRange.endDate}
                    min={draftRange.startDate || undefined}
                    onChange={(event) => {
                      setDraftRange((previous) => ({
                        ...previous,
                        endDate: event.target.value,
                      }));
                      setSelectedPreset("Custom range");
                    }}
                    className="mt-1 w-full min-w-0 rounded-lg border border-gray-200 px-2 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </label>
              </div>

              <div className="mt-6 flex justify-end gap-2 border-t border-gray-100 pt-4">
                <button
                  type="button"
                  onClick={cancelFilter}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={applyFilter}
                  className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-700"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

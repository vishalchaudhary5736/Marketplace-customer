import { Dot } from "lucide-react";

const titleColors: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-700",
  Confirmed: "bg-blue-100 text-blue-700",
  Processing: "bg-purple-100 text-purple-700",
  Packed: "bg-cyan-100 text-cyan-700",
  Shipped: "bg-indigo-100 text-indigo-700",
  "Out for Delivery": "bg-orange-100 text-orange-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
  Returned: "bg-pink-100 text-pink-700",
  Refunded: "bg-slate-100 text-slate-700",
};

export function TableStatus({ status }: { status: string }) {
  const color = titleColors[status];
  return (
    <div
      className={`inline-flex items-center rounded-[20px] ${color} pl-2 pr-4 py-1`}
    >
      <Dot />
      <span className="text-[14px] font-semibold">{status}</span>
    </div>
  );
}

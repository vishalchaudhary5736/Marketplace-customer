import { ChevronRight, type LucideIcon } from "lucide-react";

type Item = {
  title: string;
  total: string;
  icon: LucideIcon;
  tag: string;
  color: string;
  iconColor: string;
};

export function Box({ item }: { item: Item }) {
  const Icon = item.icon;
  return (
    <div
      className={`p-6 flex flex-col gap-2 rounded-2xl ${item.color ? item.color : ""}`}
    >
      <div className="flex gap-4">
        <div
          className={`w-12 h-12 rounded-full flex justify-center items-center ${item.iconColor}`}
        >
          <Icon />
        </div>
        <div className="flex flex-col gap">
          <p className="font-semibold">{item.title}</p>
          <h1 className="text-2xl font-bold text-black">{item.total}</h1>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="text-[14px] font-light text-[#706D6D]">{item.tag}</p>
        <button type="button" className="cursor-pointer">
          <ChevronRight className="h-5 font-light text-[#5d5b5b]" />
        </button>
      </div>
    </div>
  );
}

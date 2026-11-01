import { Search } from "lucide-react";
import { OrderTable } from "../../components/TableComponents/OrderTable";
import { orders, OrderStatus } from "../../constants/constant";
import DateRangeFilter from "../../components/DateRangeFilter";
import type { DateRange } from "../../components/DateRangeFilter";
import { useState } from "react";
import type { OrderStatusTypes } from "../../types/constantsType";

export function OrdersPage() {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: "",
    endDate: "",
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [skip, setSkip] = useState<number>(0);
  const [totalRecords, setTotalRecords] = useState<number>(orders.length);
  const [statusFilter, setStatusFilter] = useState<string>(
    OrderStatus[0].value,
  );
  return (
    <>
      <div className="flex flex-col gap-6 bg-white px-6 py-5 rounded-2xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-black font-extrabold text-[25px]">Orders</h1>
            <p className="text-[13px] font-light text-[#706D6D]">
              Track and manage all your orders in one place.
            </p>
          </div>
          <div className="flex gap-4">
            <div>
              <div className="w-160 h-11 max-w-70 px-3.5 flex items-center gap-2.5 border border-[rgb(214,211,206)] rounded-[10px]  text-[rgb(87,83,78)] grow shadow-sm transition">
                <Search className="w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by order ID,product name..."
                  className="grow text-[15px] text-[rgb(28,25,23)] border-none outline-none text-sm placeholder:text-[14px]"
                />
              </div>
            </div>
            <div>
              <DateRangeFilter onApply={setDateRange} />
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          {OrderStatus.map((item: OrderStatusTypes) => (
            <button
              onClick={() => setStatusFilter(item.value)}
              className={` px-3 py-1 text-[14px] rounded-[10px] ${statusFilter === item.value ? "bg-brand text-white" : "bg-gray-200"}`}
            >
              {item.label} {item.count > 0 && <span>({item.count})</span>}
            </button>
          ))}
        </div>
        {totalRecords && totalRecords > 0 ? (
          <div className="overflow-x-auto rounded-md">
            <OrderTable
              orders={orders.slice((currentPage - 1) * 10, currentPage * 10)}
            />
          </div>
        ) : (
          <div className=" flex justify-center items-center h-70">
            <p className="text-center">No order</p>
          </div>
        )}
      </div>
    </>
  );
}

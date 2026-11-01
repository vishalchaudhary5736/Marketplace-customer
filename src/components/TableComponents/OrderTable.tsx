import { TableStatus } from "./TableStatus";

type orderTypes = {
  id: string;
  orderId: string;
  date: string;
  items: string;
  status: string;
  total: number;
};

export function OrderTable({ orders }: { orders: orderTypes[] }) {
  return (
    <>
      <table className="w-full text-sm p-2">
        <thead className="text-left text-sm bg-[#fceeee] text-[#63605f]">
          <th className="px-4">Order ID</th>
          <th className="p-2">Date</th>
          <th className="p-2">Items</th>
          <th className="p-2">Status</th>
          <th className="p-2">Total</th>
          <th className="p-2">Action</th>
        </thead>
        <tbody>
          {orders.map((item: orderTypes) => (
            <tr>
              <td className="px-4 font-semibold">#{item.orderId}</td>
              <td className="p-2">{item.date}</td>
              <td className="p-2">{item.items}</td>
              <td className="p-2">
                <TableStatus status={item.status} />
              </td>
              <td className="p-2 font-semibold">₹{item.total}</td>
              <td className="p-2">
                <button className="px-3 py-1 border text-sm font-semibold  border-[#d4ccc9] rounded-md cursor-pointer">
                  View details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

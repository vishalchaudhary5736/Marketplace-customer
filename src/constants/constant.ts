import type {
  GENDER_TYPE,
  OrderStatusTypes,
  orderTypes,
} from "../types/constantsType";

export const orders: orderTypes[] = [
  {
    id: "1",
    orderId: "ORD-1001",
    date: "2026-10-24",
    items: "Wireless Headphones",
    status: "Delivered",
    total: 2499,
  },
  {
    id: "2",
    orderId: "ORD-1002",
    date: "2026-10-23",
    items: "Smart Watch",
    status: "Processing",
    total: 4999,
  },
  {
    id: "3",
    orderId: "ORD-1003",
    date: "2026-10-22",
    items: "Mechanical Keyboard",
    status: "Shipped",
    total: 3299,
  },
  {
    id: "4",
    orderId: "ORD-1004",
    date: "2026-10-21",
    items: "Bluetooth Speaker",
    status: "Pending",
    total: 1799,
  },
  {
    id: "5",
    orderId: "ORD-1005",
    date: "2026-10-20",
    items: "Running Shoes",
    status: "Delivered",
    total: 2999,
  },
  {
    id: "6",
    orderId: "ORD-1006",
    date: "2026-10-19",
    items: "Laptop Backpack",
    status: "Cancelled",
    total: 1499,
  },
  {
    id: "7",
    orderId: "ORD-1007",
    date: "2026-10-18",
    items: "USB-C Hub",
    status: "Out for Delivery",
    total: 1199,
  },
  {
    id: "8",
    orderId: "ORD-1008",
    date: "2026-10-17",
    items: "Gaming Mouse",
    status: "Returned",
    total: 899,
  },
  {
    id: "9",
    orderId: "ORD-1009",
    date: "2026-10-16",
    items: "Monitor",
    status: "Refunded",
    total: 12499,
  },
  {
    id: "10",
    orderId: "ORD-1010",
    date: "2026-10-15",
    items: "Portable SSD",
    status: "Confirmed",
    total: 6499,
  },
];

export const OrderStatus: OrderStatusTypes[] = [
  {
    label: "Pending",
    value: "Pending",
    count: 5,
  },
  {
    label: "Delivered",
    value: "Delivered",
    count: 1,
  },
  {
    label: "Cancelled",
    value: "Cancelled",
    count: 6,
  },
  {
    label: "Returned",
    value: "Returned",
    count: 9,
  },
  {
    label: "Refunded",
    value: "Refunded",
    count: 8,
  },
  {
    label: "Confirmed",
    value: "Confirmed",
    count: 3,
  },
];

export const GENDER: GENDER_TYPE[] = [
  {
    label: "Male",
    value: "Male",
  },
  {
    label: "Female",
    value: "Female",
  },
];

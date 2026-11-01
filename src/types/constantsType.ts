export type orderTypes = {
  id: string;
  orderId: string;
  date: string;
  items: string;
  status: string;
  total: number;
};

export type OrderStatusTypes = {
  value: string;
  label: string;
  count: number;
};

export type SELECT_TYPE = {
  label: string;
  value: string;
};

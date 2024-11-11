import dayjs from "dayjs";

//types
import { PaymentMethod } from "./paymentMethod";

export interface Order {
  id: number;
  scheduleId: number;
  datetime: dayjs.Dayjs;
  priceInCents: number;
  isPaid: boolean;
  isRefunded: boolean;
  paymentMethod: PaymentMethod;
  createdAt: dayjs.Dayjs,
  updatedAt: dayjs.Dayjs | null,
  deletedAt: dayjs.Dayjs | null,
}
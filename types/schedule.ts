import dayjs from "dayjs";

// types
import { Client } from "./client";
import { Coupon } from "./coupon";
import { Procedure } from "./procedure";

export interface Schedule {
  id: number;
  datetime: dayjs.Dayjs;
  realStartDatetime: dayjs.Dayjs | null;
  client: Client;
  procedure: Procedure;
  discountPercent: number | null;
  coupon: Coupon | null;
  isConfirmed: boolean;
  isCancelled: boolean;
  isNoShow: boolean;
  isRescheduled: boolean;
  createdAt: dayjs.Dayjs,
  updatedAt: dayjs.Dayjs | null,
  deletedAt: dayjs.Dayjs | null,
}

import dayjs from "dayjs";

export interface Coupon {
  id: number;
  name: string;
  percent: number;
  isActive: boolean;
  createdAt: dayjs.Dayjs,
  updatedAt: dayjs.Dayjs | null,
  deletedAt: dayjs.Dayjs | null,
}
import dayjs from "dayjs";

export interface Client {
  id: number;
  fullname: string;
  phoneNumber: string;
  createdAt: dayjs.Dayjs,
  updatedAt: dayjs.Dayjs | null,
  deletedAt: dayjs.Dayjs | null,
}
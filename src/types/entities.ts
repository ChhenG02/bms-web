export type PaymentStatus =
  | "Paid"
  | "Unpaid"
  | "Overdue";

export interface Client {
  id: string;

  clientCode: string;
  meterCode: string;

  name: string;
  gender: "ប្រុស" | "ស្រី";

  phone: string;

  room?: string;

  installDate: string;
  lastReadingDate: string;

  note?: string;

  status: "Active" | "Pending" | "MovedOut";
}

export interface Bill {
  id: string;

  clientId: string;

  month: string;
  monthLabel: string;

  issueDate: string;
  dueDate: string;

  oldReading: number;
  newReading: number;
  usage: number;

  unitPrice: number;
  total: number;

  status: PaymentStatus;
}
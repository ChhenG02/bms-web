export type ClientStatus = "Active" | "Pending" | "MovedOut";

export type BillStatus = "Paid" | "Unpaid";

export type BillHistory = {
  key: string;
  no: string;
  dateRange: string;
  oldReading: number;
  newReading: number;
  usage: string;
  total: string;
  status: BillStatus;
};

export type ClientRow = {
  id: string;
  key: string;
  clientCode: string;
  meterCode: string;
  name: string;
  gender: string;
  phone: string;
  phoneNumber: string;
  room: string;
  moveInDate: string;
  installDate: string;
  lastDate: string;
  note: string;
  oldReading: number;
  newReading: number;
  usage: string;
  total: string;
  status: ClientStatus;
  histories: BillHistory[];
};

export const CLIENTS: ClientRow[] = [
  {
    id: "01",
    key: "1",
    clientCode: "NP0392929",
    meterCode: "00019292",
    name: "Chin Savat",
    gender: "Male",
    phone: "012 345 444",
    phoneNumber: "012 345 444",
    room: "A01",
    moveInDate: "01/01/2024",
    installDate: "12 Jan 2020",
    lastDate: "10 Jan 2021",
    note: "N/A",
    oldReading: 80,
    newReading: 120,
    usage: "40kwh",
    total: "40,000៛",
    status: "Active",
    histories: [
      {
        key: "1",
        no: "01",
        dateRange: "10 Jan 2022 - 10 Feb 2022",
        oldReading: 123,
        newReading: 300,
        usage: "77kwh",
        total: "177,000៛",
        status: "Unpaid",
      },
      {
        key: "2",
        no: "02",
        dateRange: "10 Dec 2021 - 10 Jan 2022",
        oldReading: 123,
        newReading: 200,
        usage: "77kwh",
        total: "84,700៛",
        status: "Paid",
      },
    ],
  },
  {
    id: "02",
    key: "2",
    clientCode: "NP0392930",
    meterCode: "00019293",
    name: "Sok Sopheap",
    gender: "Female",
    phone: "011 222 333",
    phoneNumber: "011 222 333",
    room: "A02",
    moveInDate: "15/03/2024",
    installDate: "15 Feb 2020",
    lastDate: "10 Jan 2021",
    note: "VIP",
    oldReading: 250,
    newReading: 300,
    usage: "75kwh",
    total: "75,000៛",
    status: "Pending",
    histories: [
      {
        key: "1",
        no: "01",
        dateRange: "10 Jan 2022 - 10 Feb 2022",
        oldReading: 250,
        newReading: 320,
        usage: "70kwh",
        total: "90,000៛",
        status: "Paid",
      },
    ],
  },
  {
    id: "03",
    key: "3",
    clientCode: "NP0392931",
    meterCode: "00019294",
    name: "Nat Seng",
    gender: "Male",
    phone: "096 111 222",
    phoneNumber: "096 111 222",
    room: "B01",
    moveInDate: "10/06/2023",
    installDate: "20 Mar 2020",
    lastDate: "10 Jan 2021",
    note: "N/A",
    oldReading: 123,
    newReading: 200,
    usage: "77kwh",
    total: "77,000៛",
    status: "Active",
    histories: [
      {
        key: "1",
        no: "01",
        dateRange: "10 Jan 2022 - 10 Feb 2022",
        oldReading: 123,
        newReading: 200,
        usage: "77kwh",
        total: "77,000៛",
        status: "Paid",
      },
    ],
  },
  {
    id: "04",
    key: "4",
    clientCode: "NP0392932",
    meterCode: "00019295",
    name: "Leap Vimean",
    gender: "Female",
    phone: "078 444 555",
    phoneNumber: "078 444 555",
    room: "B02",
    moveInDate: "20/09/2023",
    installDate: "18 Apr 2020",
    lastDate: "10 Jan 2021",
    note: "Monthly customer",
    oldReading: 123,
    newReading: 240,
    usage: "77kwh",
    total: "84,700៛",
    status: "MovedOut",
    histories: [
      {
        key: "1",
        no: "01",
        dateRange: "10 Jan 2022 - 10 Feb 2022",
        oldReading: 123,
        newReading: 240,
        usage: "77kwh",
        total: "84,700៛",
        status: "Paid",
      },
    ],
  },
  {
    id: "05",
    key: "5",
    clientCode: "NP0392933",
    meterCode: "00019296",
    name: "Sin Makara",
    gender: "Male",
    phone: "085 666 777",
    phoneNumber: "085 666 777",
    room: "C01",
    moveInDate: "05/11/2023",
    installDate: "10 Jun 2020",
    lastDate: "12 Jan 2022",
    note: "VIP",
    oldReading: 123,
    newReading: 200,
    usage: "77kwh",
    total: "84,700៛",
    status: "Active",
    histories: [
      {
        key: "1",
        no: "01",
        dateRange: "10 Jan 2022 - 10 Feb 2022",
        oldReading: 123,
        newReading: 200,
        usage: "77kwh",
        total: "84,700៛",
        status: "Paid",
      },
    ],
  },
  {
    id: "06",
    key: "6",
    clientCode: "NP0392934",
    meterCode: "00019297",
    name: "Prak Seng",
    gender: "Male",
    phone: "093 888 999",
    phoneNumber: "093 888 999",
    room: "C02",
    moveInDate: "01/02/2024",
    installDate: "22 Aug 2020",
    lastDate: "12 Jan 2022",
    note: "N/A",
    oldReading: 123,
    newReading: 200,
    usage: "77kwh",
    total: "84,700៛",
    status: "Active",
    histories: [
      {
        key: "1",
        no: "01",
        dateRange: "10 Jan 2022 - 10 Feb 2022",
        oldReading: 123,
        newReading: 200,
        usage: "77kwh",
        total: "84,700៛",
        status: "Paid",
      },
    ],
  },
];
export type ClientStatus = "Paid" | "Unpaid";

export type BillHistory = {
  key: string;
  no: string;
  dateRange: string;
  oldReading: number;
  newReading: number;
  usage: string;
  total: string;
  status: ClientStatus;
};

export type ClientRow = {
  id: string;
  key: string;

  clientCode: string;
  meterCode: string;

  name: string;
  gender: string;

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

    name: "ចិន សាវ៉ាត",
    gender: "ប្រុស",

    installDate: "12 Jan 2020",
    lastDate: "10 Jan 2021",

    note: "N/A",

    oldReading: 80,
    newReading: 120,

    usage: "40kwh",
    total: "40,000៛",

    status: "Unpaid",

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

    name: "សុខ សុភ័ណ្ឌ",
    gender: "ស្រី",

    installDate: "15 Feb 2020",
    lastDate: "10 Jan 2021",

    note: "VIP",

    oldReading: 250,
    newReading: 300,

    usage: "75kwh",
    total: "75,000៛",

    status: "Paid",

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

    name: "ណាត សេង",
    gender: "ប្រុស",

    installDate: "20 Mar 2020",
    lastDate: "10 Jan 2021",

    note: "N/A",

    oldReading: 123,
    newReading: 200,

    usage: "77kwh",
    total: "77,000៛",

    status: "Paid",

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

    name: "លាភ វិមាន",
    gender: "ស្រី",

    installDate: "18 Apr 2020",
    lastDate: "10 Jan 2021",

    note: "Monthly customer",

    oldReading: 123,
    newReading: 240,

    usage: "77kwh",
    total: "84,700៛",

    status: "Paid",

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

    name: "ស៊ីន មករា",
    gender: "ប្រុស",

    installDate: "10 Jun 2020",
    lastDate: "12 Jan 2022",

    note: "VIP",

    oldReading: 123,
    newReading: 200,

    usage: "77kwh",
    total: "84,700៛",

    status: "Paid",

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

    name: "ប្រាក់ សេង",
    gender: "ប្រុស",

    installDate: "22 Aug 2020",
    lastDate: "12 Jan 2022",

    note: "N/A",

    oldReading: 123,
    newReading: 200,

    usage: "77kwh",
    total: "84,700៛",

    status: "Paid",

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

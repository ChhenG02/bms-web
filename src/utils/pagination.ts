import type { TablePaginationConfig } from "antd";

type BuildTablePaginationProps = {
  page: number;
  pageSize?: number;
  total: number;
};

export function buildPeopleTablePagination({
  page,
  pageSize = 10,
  total,
}: BuildTablePaginationProps): TablePaginationConfig {
  return {
    current: page,
    pageSize,
    total,

    showSizeChanger: {
      options: [
        {
          label: "5/ទំព័រ",
          value: 5,
        },
        {
          label: "10/ទំព័រ",
          value: 10,
        },
        {
          label: "20/ទំព័រ",
          value: 20,
        },
        {
          label: "50/ទំព័រ",
          value: 50,
        },
      ],
    },

    showTotal: (total) => `ចំនួន ${total} នាក់`,
  };
}

export function buildHistoryTablePagination({
  page,
  pageSize = 10,
  total,
}: BuildTablePaginationProps): TablePaginationConfig {
  return {
    current: page,
    pageSize,
    total,

    showSizeChanger: {
      options: [
        {
          label: "5/ទំព័រ",
          value: 5,
        },
        {
          label: "10/ទំព័រ",
          value: 10,
        },
        {
          label: "20/ទំព័រ",
          value: 20,
        },
        {
          label: "50/ទំព័រ",
          value: 50,
        },
      ],
    },

    showTotal: (total) => `ចំនួន ${total} ប្រវត្តិ`,
  };
}

export function buildEnergyUsageTablePagination({
  page,
  pageSize = 10,
  total,
}: BuildTablePaginationProps): TablePaginationConfig {
  return {
    current: page,
    pageSize,
    total,

    showSizeChanger: {
      options: [
        {
          label: "5/ទំព័រ",
          value: 5,
        },
        {
          label: "10/ទំព័រ",
          value: 10,
        },
        {
          label: "20/ទំព័រ",
          value: 20,
        },
        {
          label: "50/ទំព័រ",
          value: 50,
        },
      ],
    },

    showTotal: (total) => `ចំនួន ${total} ​វិក្កយបត្រ`,
  };
}
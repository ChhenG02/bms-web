import { CheckOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Input, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { buildTablePagination } from "../utils/pagination";
import ClientModal from "./ClientModal";

type ClientRow = {
  id: string;
  key: string;
  lastDate: string;
  name: string;
  newReading: number;
  oldReading: number;
  status: "Paid" | "Unpaid";
  total: string;
  usage: string;
};

function ClientPage() {
  const [search, setSearch] = useState("");

  const [debouncedSearch] = useDebounce(search, 300);

  const rows: ClientRow[] = [
    {
      id: "01",
      key: "1",
      name: "ចិន សាវ៉ាត",
      lastDate: "10 Jan 2021",
      oldReading: 80,
      newReading: 120,
      usage: "40kwh",
      total: "40,000៛",
      status: "Unpaid",
    },
    {
      id: "02",
      key: "2",
      name: "សុខ សុភ័ណ្ឌ",
      lastDate: "10 Jan 2021",
      oldReading: 250,
      newReading: 300,
      usage: "75kwh",
      total: "75,000៛",
      status: "Paid",
    },
    {
      id: "03",
      key: "3",
      name: "ណាត សេង",
      lastDate: "10 Jan 2021",
      oldReading: 123,
      newReading: 200,
      usage: "77kwh",
      total: "77,000៛",
      status: "Paid",
    },
    {
      id: "04",
      key: "4",
      name: "លាភ វិមាន",
      lastDate: "10 Jan 2021",
      oldReading: 123,
      newReading: 240,
      usage: "77kwh",
      total: "84,700៛",
      status: "Paid",
    },
    {
      id: "05",
      key: "5",
      name: "ស៊ីន មករា",
      lastDate: "12 Jan 2022",
      oldReading: 123,
      newReading: 200,
      usage: "77kwh",
      total: "84,700៛",
      status: "Paid",
    },
    {
      id: "06",
      key: "6",
      name: "ប្រាក់ សេង",
      lastDate: "12 Jan 2022",
      oldReading: 123,
      newReading: 200,
      usage: "77kwh",
      total: "84,700៛",
      status: "Paid",
    },
  ];

  const filteredRows = useMemo(() => {
    if (!debouncedSearch.trim()) {
      return rows;
    }

    const keyword = debouncedSearch.toLowerCase();

    return rows.filter((row) => {
      return (
        row.name.toLowerCase().includes(keyword) ||
        row.id.toLowerCase().includes(keyword) ||
        row.total.toLowerCase().includes(keyword) ||
        row.usage.toLowerCase().includes(keyword) ||
        row.lastDate.toLowerCase().includes(keyword)
      );
    });
  }, [debouncedSearch, rows]);

  const [page, setPage] = useState(1);

  const [pageSize, setPageSize] = useState(5);

  const [openModal, setOpenModal] = useState(false);

  const paginatedRows = useMemo(() => {
    const start = (page - 1) * pageSize;

    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, page, pageSize]);

  const columns: ColumnsType<ClientRow> = [
    {
      title: "ល.រ",
      dataIndex: "id",
      key: "id",
      width: 70,
      render: (value: string) => (
        <span
          style={{
            color: "#6b7280",
            fontWeight: 500,
          }}
        >
          {value}
        </span>
      ),
    },

    {
      title: "ឈ្មោះ",
      dataIndex: "name",
      key: "name",
      render: (value: string) => (
        <span
          style={{
            color: "#4f74e8",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {value}
        </span>
      ),
    },

    {
      title: "កាលបរិច្ឆេទចុងក្រោយ",
      dataIndex: "lastDate",
      key: "lastDate",
    },

    {
      title: "លេខចាស់",
      dataIndex: "oldReading",
      key: "oldReading",
    },

    {
      title: "លេខថ្មី",
      dataIndex: "newReading",
      key: "newReading",
    },

    {
      title: "ចំនួនប្រើប្រាស់",
      dataIndex: "usage",
      key: "usage",
      render: (value: string) => (
        <span
          style={{
            fontWeight: 600,
            color: "#6b7280",
          }}
        >
          {value}
        </span>
      ),
    },

    {
      title: "គិតជាទឹកប្រាក់",
      dataIndex: "total",
      key: "total",
      render: (value: string) => (
        <span
          style={{
            fontWeight: 700,
            color: "#374151",
          }}
        >
          {value}
        </span>
      ),
    },

    {
      title: "ស្ថានភាព",
      dataIndex: "status",
      key: "status",
      width: 170,

      render: (value: ClientRow["status"]) =>
        value === "Paid" ? (
          <Tag
            color="success"
            style={{
              borderRadius: 999,
              paddingInline: 12,
              height: 30,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontWeight: 600,
              border: "none",
            }}
          >
            <CheckOutlined />
            បានបង់
          </Tag>
        ) : (
          <Tag
            color="error"
            style={{
              borderRadius: 999,
              paddingInline: 12,
              height: 30,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontWeight: 600,
              border: "none",
            }}
          >
            ✕ មិនទាន់បង់
          </Tag>
        ),
    },
  ];

  return (
    <div
      style={{
        background: "#f6f8fb",
        minHeight: "100vh",
      }}
    >
      {/* MAIN CONTENT */}
      <Card
        bordered={false}
        style={{
          borderRadius: 16,
          border: "1px solid #edf0f5",
          background: "#ffffff",
          boxShadow: "none",
          overflow: "hidden",
        }}
        bodyStyle={{
          padding: 0,
        }}
      >
        {/* TOOLBAR */}
        <div
          style={{
            padding: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
            borderBottom: "1px solid #f1f5f9",
          }}
        >
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ស្វែងរក..."
            prefix={
              <SearchOutlined
                style={{
                  color: "#9ca3af",
                }}
              />
            }
            allowClear
            style={{
              maxWidth: 420,
              height: 44,
              borderRadius: 10,
              background: "#f9fafb",
              borderColor: "#e5e7eb",
            }}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => setOpenModal(true)}
          >
            បង្កើតថ្មី
          </Button>
        </div>

        {/* TABLE */}
        <div
          style={{
            padding: "8px 16px 16px",
          }}
        >
          <Table<ClientRow>
            columns={columns}
            dataSource={paginatedRows}
            pagination={buildTablePagination({
              page,
              pageSize,
              total: filteredRows.length,
            })}
            onChange={(pagination) => {
              setPage(pagination.current || 1);
              setPageSize(pagination.pageSize || 5);
            }}
            rowKey="key"
            size="middle"
          />
        </div>
      </Card>

      <ClientModal
        open={openModal}
        title="បង្កើតអតិថិជន"
        onCancel={() => setOpenModal(false)}
        onSubmit={(values) => {
          console.log(values);

          setOpenModal(false);
        }}
      />

      {/* LOCAL STYLE */}
      <style>
        {`
          .ant-table {
            background: transparent !important;
          }

          .ant-table-thead > tr > th {
            background: #fafbfc !important;
            color: #4f74e8 !important;
            font-size: 14px !important;
            font-weight: 700 !important;
            border-bottom: 1px solid #eef2f7 !important;
            padding-top: 14px !important;
            padding-bottom: 14px !important;
          }

          .ant-table-tbody > tr > td {
            border-bottom: 1px solid #f3f4f6 !important;
            color: #6b7280;
            font-size: 14px;
            padding-top: 16px !important;
            padding-bottom: 16px !important;
          }

          .ant-table-tbody > tr:nth-child(odd) > td {
            background: #fafafa;
          }

          .ant-table-tbody > tr:nth-child(even) > td {
            background: #ffffff;
          }

          .ant-table-tbody > tr:hover > td {
            background: #f3f7ff !important;
          }

          .ant-input:focus,
          .ant-input-focused {
            border-color: #4f74e8 !important;
            box-shadow: 0 0 0 2px rgba(79, 116, 232, 0.08) !important;
          }

          .ant-btn-primary:hover {
            background: #3f63d8 !important;
          }
        `}
      </style>
    </div>
  );
}

export default ClientPage;

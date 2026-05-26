import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { App, Button, Card, Dropdown, Input, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

import ClientModal from "./ClientForm";
import { NavLink, useNavigate } from "react-router-dom";
import { CLIENTS, type ClientRow } from "../../data/clientData";
import { buildPeopleTablePagination } from "../../utils/pagination";

function ClientPage() {
  const [search, setSearch] = useState("");

  const [debouncedSearch] = useDebounce(search, 300);

  const filteredRows = useMemo(() => {
    if (!debouncedSearch.trim()) {
      return CLIENTS;
    }

    const keyword = debouncedSearch.toLowerCase();

    return CLIENTS.filter((row) => {
      return (
        row.name.toLowerCase().includes(keyword) ||
        row.id.toLowerCase().includes(keyword) ||
        row.total.toLowerCase().includes(keyword) ||
        row.usage.toLowerCase().includes(keyword) ||
        row.lastDate.toLowerCase().includes(keyword)
      );
    });
  }, [debouncedSearch, CLIENTS]);

  const [page, setPage] = useState(1);

  const [pageSize, setPageSize] = useState(5);

  const [openModal, setOpenModal] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientRow | null>(null);

  const navigate = useNavigate();

  const { modal } = App.useApp();

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
      title: "ឈ្មោះពេញ",
      dataIndex: "name",
      key: "name",
      width: 220,

      render: (value: string, record) => (
        <NavLink
          to={`/client/${record.id}`}
          style={{
            color: "#4f74e8",
            fontWeight: 600,
          }}
        >
          {value}
        </NavLink>
      ),
    },

    {
      title: "កាលបរិច្ឆេទចុះឈ្មោះ",
      dataIndex: "lastDate",
      key: "lastDate",
      width: 180,
    },

    {
      title: "លេខកុងទ័រចាស់",
      dataIndex: "oldReading",
      key: "oldReading",
      width: 120,
    },

    {
      title: "លេខកុងទ័រថ្មី",
      dataIndex: "newReading",
      key: "newReading",
      width: 120,
    },

    {
      title: "ទំហំប្រើប្រាស់",
      dataIndex: "usage",
      key: "usage",
      width: 160,

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
      width: 180,

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
      width: 190,

      render: (value: ClientRow["status"]) =>
        value === "Paid" ? (
          <Tag
            color="success"
            style={{
              borderRadius: 999,
              paddingInline: 12,
              height: 32,
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
              height: 32,
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

    {
      title: "សកម្មភាព",
      key: "action",
      width: 70,
      align: "center",

      render: (_, record) => (
        <Dropdown
          trigger={["click"]}
          menu={{
            items: [
              {
                key: "view",
                icon: <EyeOutlined />,
                label: "មើល",
              },
              {
                key: "update",
                icon: <EditOutlined />,
                label: "កែប្រែ",
              },
              {
                type: "divider",
              },
              {
                key: "delete",
                icon: <DeleteOutlined />,
                label: "លុប",
                danger: true,
              },
            ],

            onClick: ({ key }) => {
              if (key === "view") {
                navigate(`/client/${record.id}`);
              }

              if (key === "update") {
                setEditingClient(record);
                setOpenModal(true);
              }

              if (key === "delete") {
                modal.confirm({
                  title: "បញ្ជាក់ការលុប",
                  content: (
                    <span>
                      តើអ្នកពិតជាចង់លុប <strong>{record.name}</strong> មែនទេ?
                    </span>
                  ),
                  okText: "លុប",
                  cancelText: "បោះបង់",

                  okButtonProps: {
                    danger: true,
                  },

                  centered: true,

                  onOk() {
                    console.log("delete", record);
                  },
                });
              }
            },
          }}
        >
          <Button
            type="text"
            icon={<MoreOutlined />}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
            }}
          />
        </Dropdown>
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
        variant="borderless"
        styles={{
          body: {
            padding: 0,
          },
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
            onClick={() => {
              setEditingClient(null);
              setOpenModal(true);
            }}
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
            scroll={{ x: 1200 }}
            pagination={buildPeopleTablePagination({
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
        title={editingClient ? "កែប្រែអតិថិជន" : "បង្កើតអតិថិជន"}
        initialValues={editingClient || undefined}
        onCancel={() => {
          setOpenModal(false);
          setEditingClient(null);
        }}
        onSubmit={(values) => {
          if (editingClient) {
            console.log("update", values);
          } else {
            console.log("create", values);
          }

          setOpenModal(false);
          setEditingClient(null);
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
            padding-top: 12px !important;
            padding-bottom: 12px !important;
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

// import {
//   DeleteOutlined,
//   EditOutlined,
//   MoreOutlined,
//   PlusOutlined,
//   SearchOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
// import {
//   App,
//   Avatar,
//   Button,
//   Card,
//   Dropdown,
//   Input,
//   message,
//   Table,
//   Tag,
//   Select,
//   Space,
// } from "antd";
// import type { ColumnsType } from "antd/es/table";
// import { useMemo, useState } from "react";
// import { useDebounce } from "use-debounce";

// // ─── Types ───────────────────────────────────────────────────────────────────

// export type UserRole = "Super Admin" | "Admin" | "Staff";

// export interface UserRow {
//   key: string;
//   id: number;
//   avatar?: string;
//   name: string;
//   gender: "ប្រុស" | "ស្រី";
//   email: string;
//   role: UserRole;
//   createdAt: string;
//   status: "Active" | "Inactive";
// }

// // ─── Mock Data ────────────────────────────────────────────────────────────────

// const USERS: UserRow[] = [
//   {
//     key: "1",
//     id: 1,
//     name: "Supper Admin",
//     gender: "ប្រុស",
//     email: "admin@gmail.com",
//     role: "Super Admin",
//     createdAt: "Wed, 09 Feb 2022",
//     status: "Active",
//   },
//   {
//     key: "2",
//     id: 2,
//     name: "សុខ សុភា",
//     gender: "ស្រី",
//     email: "sopha@example.com",
//     role: "Admin",
//     createdAt: "Mon, 14 Mar 2022",
//     status: "Active",
//   },
//   {
//     key: "3",
//     id: 3,
//     name: "ចាន់ វិចិត្រ",
//     gender: "ប្រុស",
//     email: "vichit@example.com",
//     role: "Staff",
//     createdAt: "Fri, 02 Jun 2023",
//     status: "Inactive",
//   },
//   {
//     key: "4",
//     id: 4,
//     name: "លី នារី",
//     gender: "ស្រី",
//     email: "nary@example.com",
//     role: "Staff",
//     createdAt: "Tue, 11 Jan 2023",
//     status: "Active",
//   },
// ];

// // ─── Component ────────────────────────────────────────────────────────────────

// function UsersPage() {
//   const [search, setSearch] = useState("");
//   const [debouncedSearch] = useDebounce(search, 300);
//   const [roleFilter, setRoleFilter] = useState<string>("all");
//   const [statusFilter, setStatusFilter] = useState<string>("all");
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(5);
//   const [openModal, setOpenModal] = useState(false);
//   const [, setEditingUser] = useState<UserRow | null>(null);

//   const hasActiveFilters =
//     debouncedSearch.trim() !== "" ||
//     roleFilter !== "all" ||
//     statusFilter !== "all";

//   const { modal } = App.useApp();

//   const filteredRows = useMemo(() => {
//     let filtered = USERS;

//     // Apply search filter
//     if (debouncedSearch.trim()) {
//       const kw = debouncedSearch.toLowerCase();
//       filtered = filtered.filter(
//         (r) =>
//           r.name.toLowerCase().includes(kw) ||
//           r.email.toLowerCase().includes(kw) ||
//           r.role.toLowerCase().includes(kw) ||
//           r.gender.includes(kw) ||
//           r.createdAt.toLowerCase().includes(kw),
//       );
//     }

//     // Apply role filter
//     if (roleFilter !== "all") {
//       filtered = filtered.filter((r) => r.role === roleFilter);
//     }

//     // Apply status filter
//     if (statusFilter !== "all") {
//       filtered = filtered.filter((r) => r.status === statusFilter);
//     }

//     return filtered;
//   }, [debouncedSearch, roleFilter, statusFilter]);

//   const paginatedRows = useMemo(() => {
//     const start = (page - 1) * pageSize;
//     return filteredRows.slice(start, start + pageSize);
//   }, [filteredRows, page, pageSize]);

//   const handleClearFilters = () => {
//     setSearch("");
//     setRoleFilter("all");
//     setStatusFilter("all");
//   };

//   const columns: ColumnsType<UserRow> = [
//     {
//       title: "ល.រ",
//       dataIndex: "id",
//       key: "id",
//       width: 60,
//       render: (v: number) => (
//         <span style={{ color: "#6b7280", fontWeight: 500 }}>{v}</span>
//       ),
//     },
// {
//   title: "ឈ្មោះពេញ",
//   key: "user",
//   width: 240,

//   render: (_, record) => (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         gap: 12,
//       }}
//     >
//       {record.avatar ? (
//         <Avatar
//           src={record.avatar}
//           size={40}
//         />
//       ) : (
//         <Avatar
//           size={40}
//           icon={<UserOutlined />}
//           style={{
//             background: "#e0e7ff",
//             color: "#4f74e8",
//             flexShrink: 0,
//           }}
//         />
//       )}

//       <div
//         style={{
//           color: "#374151",
//           fontWeight: 600,
//           lineHeight: 1.2,
//         }}
//       >
//         {record.name}
//       </div>
//     </div>
//   ),
// },

//     {
//       title: "ភេទ",
//       dataIndex: "gender",
//       key: "gender",
//       width: 80,
//       render: (v: string) => <span style={{ color: "#6b7280" }}>{v}</span>,
//     },

//     {
//       title: "អីមែល",
//       dataIndex: "email",
//       key: "email",
//       width: 220,
//       render: (v: string) => (
//         <a href={`mailto:${v}`} style={{ color: "#4f74e8", fontWeight: 500 }}>
//           {v}
//         </a>
//       ),
//     },

//     {
//       title: "កាលបរិច្ឆេទចូលរួម",
//       dataIndex: "createdAt",
//       key: "createdAt",
//       width: 180,
//       render: (v: string) => <span style={{ color: "#6b7280" }}>{v}</span>,
//     },

//     {
//       title: "ស្ថានភាព",
//       dataIndex: "status",
//       key: "status",
//       width: 120,
//       render: (v: UserRow["status"]) =>
//         v === "Active" ? (
//           <Tag
//             style={{
//               borderRadius: 999,
//               paddingInline: 12,
//               height: 28,
//               display: "inline-flex",
//               alignItems: "center",
//               fontWeight: 600,
//               fontSize: 12,
//               background: "#d1fae5",
//               color: "#065f46",
//               border: "none",
//             }}
//           >
//             សកម្ម
//           </Tag>
//         ) : (
//           <Tag
//             style={{
//               borderRadius: 999,
//               paddingInline: 12,
//               height: 28,
//               display: "inline-flex",
//               alignItems: "center",
//               fontWeight: 600,
//               fontSize: 12,
//               background: "#fee2e2",
//               color: "#991b1b",
//               border: "none",
//             }}
//           >
//             អសកម្ម
//           </Tag>
//         ),
//     },

//     {
//       title: "សកម្មភាព",
//       key: "action",
//       width: 70,
//       align: "center",

//       render: (_, record) => (
//         <Dropdown
//           trigger={["click"]}
//           menu={{
//             items: [
//               {
//                 key: "update",
//                 icon: <EditOutlined />,
//                 label: (
//                   <span style={{ cursor: "not-allowed", opacity: 0.7 }}>
//                     កែប្រែ
//                   </span>
//                 ),
//               },
//               {
//                 type: "divider",
//               },
//               {
//                 key: "delete",
//                 icon: <DeleteOutlined />,
//                 danger: true,
//                 label: (
//                   <span style={{ cursor: "not-allowed", opacity: 0.7 }}>
//                     លុប
//                   </span>
//                 ),
//               },
//             ],

//             onClick: ({ key }) => {
//               if (key === "update") {
//                 setEditingUser(record);
//                 setOpenModal(true);
//               }

//               if (key === "delete") {
//                 modal.confirm({
//                   title: "បញ្ជាក់ការលុប",
//                   content: (
//                     <span>
//                       តើអ្នកពិតជាចង់លុប <strong>{record.name}</strong> មែនទេ?
//                     </span>
//                   ),
//                   okText: "លុប",
//                   cancelText: "បោះបង់",

//                   okButtonProps: {
//                     danger: true,
//                   },

//                   centered: true,

//                   onOk() {
//                     console.log("delete", record);
//                   },
//                 });
//               }
//             },
//           }}
//         >
//           <Button
//             type="text"
//             icon={<MoreOutlined />}
//             style={{
//               width: 36,
//               height: 36,
//               borderRadius: 10,
//             }}
//           />
//         </Dropdown>
//       ),
//     },
//   ];

//   return (
//     <div style={{ background: "#f6f8fb", minHeight: "100vh" }}>
//       <Card variant="borderless" styles={{ body: { padding: 0 } }}>
//         {/* TOOLBAR - First Row */}
//         <div
//           style={{
//             padding: "20px 20px 16px 20px",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             gap: 16,
//             flexWrap: "wrap",
//             borderBottom: "1px solid #f1f5f9",
//           }}
//         >
//           <Input
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="ស្វែងរក..."
//             prefix={<SearchOutlined style={{ color: "#9ca3af" }} />}
//             allowClear
//             style={{
//               width: "100%",
//               maxWidth: 420,
//               height: 44,
//               borderRadius: 10,
//               background: "#f9fafb",
//               borderColor: "#e5e7eb",
//             }}
//           />
//           <Button
//             type="primary"
//             icon={<PlusOutlined />}
//             size="large"
//             onClick={() => {
//               message.info("Coming soon");
//             }}
//             style={{
//               cursor: "not-allowed",
//             }}
//           >
//             បង្កើត
//           </Button>
//         </div>

//         {/* FILTERS - Second Row */}
//         <div
//           style={{
//             padding: "12px 20px",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             gap: 16,
//             flexWrap: "wrap",
//             borderBottom: "1px solid #f1f5f9",
//             background: "#fafbfc",
//           }}
//         >
//           <Space size={12} wrap>
//             <Select
//               value={roleFilter}
//               onChange={setRoleFilter}
//               style={{ width: 180 }}
//               placeholder="ជ្រើសរើសតួនាទី"
//               options={[
//                 { value: "all", label: "ទាំងអស់" },
//                 { value: "Super Admin", label: "Super Admin" },
//                 { value: "Admin", label: "Admin" },
//                 { value: "Staff", label: "Staff" },
//               ]}
//             />
//             <Select
//               value={statusFilter}
//               onChange={setStatusFilter}
//               style={{ width: 150 }}
//               placeholder="ជ្រើសរើសស្ថានភាព"
//               options={[
//                 { value: "all", label: "ទាំងអស់" },
//                 { value: "Active", label: "សកម្ម" },
//                 { value: "Inactive", label: "អសកម្ម" },
//               ]}
//             />
//           </Space>
//           {hasActiveFilters && (
//             <Button
//               onClick={handleClearFilters}
//               style={{
//                 height: 36,
//                 borderRadius: 8,
//                 color: "#6b7280",
//               }}
//             >
//               ជម្រះតម្រង
//             </Button>
//           )}
//         </div>

//         {/* TABLE */}
//         <div style={{ padding: "8px 16px 16px" }}>
//           <Table<UserRow>
//             columns={columns}
//             dataSource={paginatedRows}
//             scroll={{ x: 1100 }}
//             pagination={{
//               current: page,
//               pageSize,
//               total: filteredRows.length,
//               showSizeChanger: true,
//               pageSizeOptions: ["5", "10", "20"],
//               showTotal: (total) => `សរុប ${total} នាក់`,
//               onChange(p, ps) {
//                 setPage(p);
//                 setPageSize(ps);
//               },
//             }}
//             onChange={(pagination) => {
//               setPage(pagination.current || 1);
//               setPageSize(pagination.pageSize || 5);
//             }}
//             rowKey="key"
//             size="middle"
//           />
//         </div>
//       </Card>

//       {/* Placeholder — swap in your real UserModal */}
//       {openModal && (
//         <div style={{ display: "none" }}>
//           {/* <UserModal
//             open={openModal}
//             title={editingUser ? "កែប្រែអ្នកប្រើប្រាស់" : "បង្កើតអ្នកប្រើប្រាស់"}
//             initialValues={editingUser || undefined}
//             onCancel={() => { setOpenModal(false); setEditingUser(null); }}
//             onSubmit={(values) => {
//               console.log(editingUser ? "update" : "create", values);
//               setOpenModal(false);
//               setEditingUser(null);
//             }}
//           /> */}
//         </div>
//       )}

//       {/* LOCAL STYLES — mirrors ClientPage exactly */}
//       <style>{`
//         .ant-table {
//           background: transparent !important;
//         }
//         .ant-table-thead > tr > th {
//           background: #fafbfc !important;
//           color: #4f74e8 !important;
//           font-size: 14px !important;
//           font-weight: 700 !important;
//           border-bottom: 1px solid #eef2f7 !important;
//           padding-top: 14px !important;
//           padding-bottom: 14px !important;
//         }
//         .ant-table-tbody > tr > td {
//           border-bottom: 1px solid #f3f4f6 !important;
//           color: #6b7280;
//           font-size: 14px;
//           padding-top: 12px !important;
//           padding-bottom: 12px !important;
//         }
//         .ant-table-tbody > tr:nth-child(odd) > td {
//           background: #fafafa;
//         }
//         .ant-table-tbody > tr:nth-child(even) > td {
//           background: #ffffff;
//         }
//         .ant-table-tbody > tr:hover > td {
//           background: #f3f7ff !important;
//         }
//         .ant-input:focus,
//         .ant-input-focused {
//           border-color: #4f74e8 !important;
//           box-shadow: 0 0 0 2px rgba(79, 116, 232, 0.08) !important;
//         }
//         .ant-btn-primary:hover {
//           background: #3f63d8 !important;
//         }
//         .ant-select-focused .ant-select-selector,
//         .ant-select-selector:focus,
//         .ant-select-selector:hover {
//           border-color: #4f74e8 !important;
//           box-shadow: 0 0 0 2px rgba(79, 116, 232, 0.08) !important;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default UsersPage;


import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  App,
  Avatar,
  Button,
  Card,
  Dropdown,
  Input,
  message,
  Table,
  Tag,
  Select,
  Space,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

// ─── Types ───────────────────────────────────────────────────────────────────

export type UserRole = "Super Admin" | "Admin" | "Staff";

export interface UserRow {
  key: string;
  id: number;
  avatar?: string;
  name: string;
  gender: "Male" | "Female";
  email: string;
  role: UserRole;
  createdAt: string;
  status: "Active" | "Inactive";
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const USERS: UserRow[] = [
  {
    key: "1",
    id: 1,
    name: "Super Admin",
    gender: "Male",
    email: "admin@gmail.com",
    role: "Super Admin",
    createdAt: "Wed, 09 Feb 2022",
    status: "Active",
  },
  {
    key: "2",
    id: 2,
    name: "Sok Sopha",
    gender: "Female",
    email: "sopha@example.com",
    role: "Admin",
    createdAt: "Mon, 14 Mar 2022",
    status: "Active",
  },
  {
    key: "3",
    id: 3,
    name: "Chan Vichit",
    gender: "Male",
    email: "vichit@example.com",
    role: "Staff",
    createdAt: "Fri, 02 Jun 2023",
    status: "Inactive",
  },
  {
    key: "4",
    id: 4,
    name: "Li Nary",
    gender: "Female",
    email: "nary@example.com",
    role: "Staff",
    createdAt: "Tue, 11 Jan 2023",
    status: "Active",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

function UsersPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [, setEditingUser] = useState<UserRow | null>(null);

  const hasActiveFilters =
    debouncedSearch.trim() !== "" ||
    roleFilter !== "all" ||
    statusFilter !== "all";

  const { modal } = App.useApp();

  const filteredRows = useMemo(() => {
    let filtered = USERS;

    // Apply search filter
    if (debouncedSearch.trim()) {
      const kw = debouncedSearch.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(kw) ||
          r.email.toLowerCase().includes(kw) ||
          r.role.toLowerCase().includes(kw) ||
          r.gender.toLowerCase().includes(kw) ||
          r.createdAt.toLowerCase().includes(kw),
      );
    }

    // Apply role filter
    if (roleFilter !== "all") {
      filtered = filtered.filter((r) => r.role === roleFilter);
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((r) => r.status === statusFilter);
    }

    return filtered;
  }, [debouncedSearch, roleFilter, statusFilter]);

  const paginatedRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, page, pageSize]);

  const handleClearFilters = () => {
    setSearch("");
    setRoleFilter("all");
    setStatusFilter("all");
  };

  const columns: ColumnsType<UserRow> = [
    {
      title: "No.",
      dataIndex: "id",
      key: "id",
      width: 60,
      render: (v: number) => (
        <span style={{ color: "#6b7280", fontWeight: 500 }}>{v}</span>
      ),
    },
{
  title: "Full Name",
  key: "user",
  width: 240,

  render: (_, record) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      {record.avatar ? (
        <Avatar
          src={record.avatar}
          size={40}
        />
      ) : (
        <Avatar
          size={40}
          icon={<UserOutlined />}
          style={{
            background: "#e0e7ff",
            color: "#4f74e8",
            flexShrink: 0,
          }}
        />
      )}

      <div
        style={{
          color: "#374151",
          fontWeight: 600,
          lineHeight: 1.2,
        }}
      >
        {record.name}
      </div>
    </div>
  ),
},

    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: 80,
      render: (v: string) => <span style={{ color: "#6b7280" }}>{v}</span>,
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 220,
      render: (v: string) => (
        <a href={`mailto:${v}`} style={{ color: "#4f74e8", fontWeight: 500 }}>
          {v}
        </a>
      ),
    },

    {
      title: "Join Date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 180,
      render: (v: string) => <span style={{ color: "#6b7280" }}>{v}</span>,
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (v: UserRow["status"]) =>
        v === "Active" ? (
          <Tag
            style={{
              borderRadius: 999,
              paddingInline: 12,
              height: 28,
              display: "inline-flex",
              alignItems: "center",
              fontWeight: 600,
              fontSize: 12,
              background: "#d1fae5",
              color: "#065f46",
              border: "none",
            }}
          >
            Active
          </Tag>
        ) : (
          <Tag
            style={{
              borderRadius: 999,
              paddingInline: 12,
              height: 28,
              display: "inline-flex",
              alignItems: "center",
              fontWeight: 600,
              fontSize: 12,
              background: "#fee2e2",
              color: "#991b1b",
              border: "none",
            }}
          >
            Inactive
          </Tag>
        ),
    },

    {
      title: "Actions",
      key: "action",
      width: 70,
      align: "center",

      render: (_, record) => (
        <Dropdown
          trigger={["click"]}
          menu={{
            items: [
              {
                key: "update",
                icon: <EditOutlined />,
                label: (
                  <span style={{ cursor: "not-allowed", opacity: 0.7 }}>
                    Edit
                  </span>
                ),
              },
              {
                type: "divider",
              },
              {
                key: "delete",
                icon: <DeleteOutlined />,
                danger: true,
                label: (
                  <span style={{ cursor: "not-allowed", opacity: 0.7 }}>
                    Delete
                  </span>
                ),
              },
            ],

            onClick: ({ key }) => {
              if (key === "update") {
                setEditingUser(record);
                setOpenModal(true);
              }

              if (key === "delete") {
                modal.confirm({
                  title: "Confirm Deletion",
                  content: (
                    <span>
                      Are you sure you want to delete <strong>{record.name}</strong>?
                    </span>
                  ),
                  okText: "Delete",
                  cancelText: "Cancel",

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
    <div style={{ background: "#f6f8fb", minHeight: "100vh" }}>
      <Card variant="borderless" styles={{ body: { padding: 0 } }}>
        {/* TOOLBAR - First Row */}
        <div
          style={{
            padding: "20px 20px 16px 20px",
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
            placeholder="Search..."
            prefix={<SearchOutlined style={{ color: "#9ca3af" }} />}
            allowClear
            style={{
              width: "100%",
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
              message.info("Coming soon");
            }}
            style={{
              cursor: "not-allowed",
            }}
          >
            Create
          </Button>
        </div>

        {/* FILTERS - Second Row */}
        <div
          style={{
            padding: "12px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
            borderBottom: "1px solid #f1f5f9",
            background: "#fafbfc",
          }}
        >
          <Space size={12} wrap>
            <Select
              value={roleFilter}
              onChange={setRoleFilter}
              style={{ width: 180 }}
              placeholder="Select role"
              options={[
                { value: "all", label: "All" },
                { value: "Super Admin", label: "Super Admin" },
                { value: "Admin", label: "Admin" },
                { value: "Staff", label: "Staff" },
              ]}
            />
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: 150 }}
              placeholder="Select status"
              options={[
                { value: "all", label: "All" },
                { value: "Active", label: "Active" },
                { value: "Inactive", label: "Inactive" },
              ]}
            />
          </Space>
          {hasActiveFilters && (
            <Button
              onClick={handleClearFilters}
              style={{
                height: 36,
                borderRadius: 8,
                color: "#6b7280",
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* TABLE */}
        <div style={{ padding: "8px 16px 16px" }}>
          <Table<UserRow>
            columns={columns}
            dataSource={paginatedRows}
            scroll={{ x: 1100 }}
            pagination={{
              current: page,
              pageSize,
              total: filteredRows.length,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20"],
              showTotal: (total) => `Total ${total} users`,
              onChange(p, ps) {
                setPage(p);
                setPageSize(ps);
              },
            }}
            onChange={(pagination) => {
              setPage(pagination.current || 1);
              setPageSize(pagination.pageSize || 5);
            }}
            rowKey="key"
            size="middle"
          />
        </div>
      </Card>

      {/* Placeholder — swap in your real UserModal */}
      {openModal && (
        <div style={{ display: "none" }}>
          {/* <UserModal
            open={openModal}
            title={editingUser ? "Edit User" : "Create User"}
            initialValues={editingUser || undefined}
            onCancel={() => { setOpenModal(false); setEditingUser(null); }}
            onSubmit={(values) => {
              console.log(editingUser ? "update" : "create", values);
              setOpenModal(false);
              setEditingUser(null);
            }}
          /> */}
        </div>
      )}

      {/* LOCAL STYLES — mirrors ClientPage exactly */}
      <style>{`
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
        .ant-select-focused .ant-select-selector,
        .ant-select-selector:focus,
        .ant-select-selector:hover {
          border-color: #4f74e8 !important;
          box-shadow: 0 0 0 2px rgba(79, 116, 232, 0.08) !important;
        }
      `}</style>
    </div>
  );
}

export default UsersPage;
// import {
//   DeleteOutlined,
//   EditOutlined,
//   EyeOutlined,
//   FilterOutlined,
//   HomeOutlined,
//   MoreOutlined,
//   PlusOutlined,
//   SearchOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
// import { App, Button, Card, Dropdown, Input, Select, Table } from "antd";
// import type { ColumnsType } from "antd/es/table";
// import { useMemo, useState } from "react";
// import { useDebounce } from "use-debounce";
// import { NavLink, useNavigate } from "react-router-dom";
// import { CLIENTS, type ClientRow, type ClientStatus } from "../../data/clientData";
// import { buildPeopleTablePagination } from "../../utils/pagination";
// import ClientForm from "./ClientForm";

// // ─── Status Tag ───────────────────────────────────────────────────────────────

// const STATUS_CONFIG: Record<
//   ClientStatus,
//   { color: string; bg: string; label: string; dot: string }
// > = {
//   Active: {
//     color: "#15803d",
//     bg: "#f0fdf4",
//     label: "កំពុងស្នាក់",
//     dot: "#22c55e",
//   },
//   Pending: {
//     color: "#b45309",
//     bg: "#fffbeb",
//     label: "កំពុងរង់ចាំ",
//     dot: "#f59e0b",
//   },
//   MovedOut: {
//     color: "#b91c1c",
//     bg: "#fef2f2",
//     label: "បានចាកចេញ",
//     dot: "#ef4444",
//   },
// };

// function StatusTag({ value }: { value: ClientStatus }) {
//   const cfg = STATUS_CONFIG[value];
//   return (
//     <span
//       style={{
//         display: "inline-flex",
//         alignItems: "center",
//         gap: 6,
//         background: cfg.bg,
//         color: cfg.color,
//         fontWeight: 600,
//         fontSize: 13,
//         borderRadius: 999,
//         paddingInline: 12,
//         paddingBlock: 4,
//       }}
//     >
//       <span
//         style={{
//           width: 7,
//           height: 7,
//           borderRadius: "50%",
//           background: cfg.dot,
//           flexShrink: 0,
//         }}
//       />
//       {cfg.label}
//     </span>
//   );
// }

// // ─── ClientPage ───────────────────────────────────────────────────────────────

// function ClientPage() {
//   const [search, setSearch] = useState("");
//   const [debouncedSearch] = useDebounce(search, 300);
//   const [selectedStatus, setSelectedStatus] = useState<ClientStatus | "">("");
//   const [selectedRoom, setSelectedRoom] = useState("");
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(7);
//   const [openModal, setOpenModal] = useState(false);
//   const [editingClient, setEditingClient] = useState<ClientRow | null>(null);

//   const navigate = useNavigate();
//   const { modal } = App.useApp();

//   const filteredRows = useMemo(() => {
//     let rows = CLIENTS;

//     if (selectedStatus) {
//       rows = rows.filter((r) => r.status === selectedStatus);
//     }

//     if (selectedRoom) {
//       rows = rows.filter((r) => r.room === selectedRoom);
//     }

//     if (debouncedSearch.trim()) {
//       const kw = debouncedSearch.toLowerCase();
//       rows = rows.filter(
//         (r) =>
//           r.name.toLowerCase().includes(kw) ||
//           r.clientCode.toLowerCase().includes(kw) ||
//           r.id.toLowerCase().includes(kw) ||
//           r.phone.toLowerCase().includes(kw) ||
//           r.room.toLowerCase().includes(kw),
//       );
//     }

//     return rows;
//   }, [debouncedSearch, selectedStatus, selectedRoom]);

//   const paginatedRows = useMemo(() => {
//     const start = (page - 1) * pageSize;
//     return filteredRows.slice(start, start + pageSize);
//   }, [filteredRows, page, pageSize]);

//   // ── Quick stats ────────────────────────────────────────────────────────────
//   const stats = useMemo(
//     () => ({
//       total: CLIENTS.length,
//       active: CLIENTS.filter((r) => r.status === "Active").length,
//       pending: CLIENTS.filter((r) => r.status === "Pending").length,
//       movedOut: CLIENTS.filter((r) => r.status === "MovedOut").length,
//     }),
//     [],
//   );

//   // ── Room options from data ─────────────────────────────────────────────────
//   const roomOptions = useMemo(() => {
//     const rooms = Array.from(new Set(CLIENTS.map((r) => r.room))).sort();
//     return [
//       { value: "", label: "ទាំងអស់" },
//       ...rooms.map((r) => ({ value: r, label: `បន្ទប់ ${r}` })),
//     ];
//   }, []);

//   // Check if any filter has a value selected (not default/empty)
//   const hasActiveFilters = useMemo(() => {
//     return selectedStatus !== "" || selectedRoom !== "" || debouncedSearch.trim() !== "";
//   }, [selectedStatus, selectedRoom, debouncedSearch]);

//   const handleClearFilters = () => {
//     setSelectedStatus("");
//     setSelectedRoom("");
//     setSearch("");
//     setPage(1);
//   };

//   const columns: ColumnsType<ClientRow> = [
//     {
//       title: "ល.រ",
//       dataIndex: "id",
//       key: "id",
//       width: 85,
//       render: (v: string) => (
//         <span style={{ color: "#9ca3af", fontWeight: 500, fontSize: 13 }}>
//           {v}
//         </span>
//       ),
//     },
//     {
//       title: "ឈ្មោះពេញ",
//       dataIndex: "name",
//       key: "name",
//       width: 200,
//       render: (v: string, record) => (
//         <NavLink
//           to={`/client/${record.id}`}
//           style={{
//             color: "#4f74e8",
//             fontWeight: 700,
//             display: "flex",
//             alignItems: "center",
//             gap: 8,
//           }}
//         >
//           <span
//             style={{
//               width: 32,
//               height: 32,
//               borderRadius: "50%",
//               background: "#eff3fe",
//               display: "inline-flex",
//               alignItems: "center",
//               justifyContent: "center",
//               flexShrink: 0,
//             }}
//           >
//             <UserOutlined style={{ fontSize: 14, color: "#4f74e8" }} />
//           </span>
//           {v}
//         </NavLink>
//       ),
//     },
//     {
//       title: "លេខទូរស័ព្ទ",
//       dataIndex: "phone",
//       key: "phone",
//       width: 155,
//       render: (v: string) => (
//         <span
//           style={{ color: "#374151", fontFamily: "monospace", fontSize: 13 }}
//         >
//           {v}
//         </span>
//       ),
//     },
//     {
//       title: "បន្ទប់",
//       dataIndex: "room",
//       key: "room",
//       width: 90,
//       render: (v: string) => (
//         <span
//           style={{
//             background: "#f3f4f6",
//             color: "#374151",
//             fontWeight: 700,
//             fontSize: 13,
//             borderRadius: 8,
//             paddingInline: 10,
//             paddingBlock: 4,
//             letterSpacing: 0.5,
//           }}
//         >
//           {v}
//         </span>
//       ),
//     },
//     {
//       title: "កាលបរិច្ឆេទចូលស្នាក់",
//       dataIndex: "moveInDate",
//       key: "moveInDate",
//       width: 175,
//       render: (v: string) => (
//         <span style={{ color: "#6b7280", fontSize: 13 }}>{v}</span>
//       ),
//     },
//     {
//       title: "ស្ថានភាព",
//       dataIndex: "status",
//       key: "status",
//       width: 160,
//       render: (v: ClientStatus) => <StatusTag value={v} />,
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
//               { key: "view", icon: <EyeOutlined />, label: "មើល" },
//               { key: "update", icon: <EditOutlined />, label: "កែប្រែ" },
//               { type: "divider" },
//               {
//                 key: "delete",
//                 icon: <DeleteOutlined />,
//                 label: "លុប",
//                 danger: true,
//               },
//             ],
//             onClick: ({ key }) => {
//               if (key === "view") navigate(`/client/${record.id}`);
//               if (key === "update") {
//                 setEditingClient(record);
//                 setOpenModal(true);
//               }
//               if (key === "delete") {
//                 modal.confirm({
//                   title: "បញ្ជាក់ការលុប",
//                   content: (
//                     <span>
//                       តើអ្នកពិតជាចង់លុប <strong>{record.name}</strong> (បន្ទប់{" "}
//                       {record.room}) មែនទេ?
//                     </span>
//                   ),
//                   okText: "លុប",
//                   cancelText: "បោះបង់",
//                   okButtonProps: { danger: true },
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
//             style={{ width: 36, height: 36, borderRadius: 10 }}
//           />
//         </Dropdown>
//       ),
//     },
//   ];

//   return (
//     <div>
//       {/* ── STAT CARDS (Dashboard Style) ── */}
//         <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
//           {/* Total Clients */}
//           <div
//             style={{
//               background: "#ffffff",
//               borderRadius: 5,
//               borderLeft: "5px solid #4f74e8",
//               padding: "18px 20px",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
//               flex: 1,
//               minWidth: 0,
//             }}
//           >
//             <div>
//               <div
//                 style={{
//                   fontSize: 13,
//                   color: "#555",
//                   marginBottom: 6,
//                   fontWeight: 700,
//                 }}
//               >
//                 អតិថិជនសរុប
//               </div>
//               <div style={{ fontSize: 22, fontWeight: 700, color: "#4f74e8" }}>
//                 {stats.total}
//               </div>
//             </div>
//             <div style={{ fontSize: 32, color: "#bdbdbd", opacity: 0.5 }}>
//               <UserOutlined />
//             </div>
//           </div>

//           {/* Active Clients */}
//           <div
//             style={{
//               background: "#ffffff",
//               borderRadius: 5,
//               borderLeft: "5px solid #16a34a",
//               padding: "18px 20px",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
//               flex: 1,
//               minWidth: 0,
//             }}
//           >
//             <div>
//               <div
//                 style={{
//                   fontSize: 13,
//                   color: "#555",
//                   marginBottom: 6,
//                   fontWeight: 700,
//                 }}
//               >
//                 កំពុងស្នាក់
//               </div>
//               <div style={{ fontSize: 22, fontWeight: 700, color: "#16a34a" }}>
//                 {stats.active}
//               </div>
//             </div>
//             <div style={{ fontSize: 32, color: "#bdbdbd", opacity: 0.5 }}>
//               <HomeOutlined />
//             </div>
//           </div>

//           {/* Pending Clients */}
//           <div
//             style={{
//               background: "#ffffff",
//               borderRadius: 5,
//               borderLeft: "5px solid #d97706",
//               padding: "18px 20px",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
//               flex: 1,
//               minWidth: 0,
//             }}
//           >
//             <div>
//               <div
//                 style={{
//                   fontSize: 13,
//                   color: "#555",
//                   marginBottom: 6,
//                   fontWeight: 700,
//                 }}
//               >
//                 កំពុងរង់ចាំ
//               </div>
//               <div style={{ fontSize: 22, fontWeight: 700, color: "#d97706" }}>
//                 {stats.pending}
//               </div>
//             </div>
//             <div style={{ fontSize: 32, color: "#bdbdbd", opacity: 0.5 }}>
//               <FilterOutlined />
//             </div>
//           </div>

//           {/* Moved Out Clients */}
//           <div
//             style={{
//               background: "#ffffff",
//               borderRadius: 5,
//               borderLeft: "5px solid #dc2626",
//               padding: "18px 20px",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
//               flex: 1,
//               minWidth: 0,
//             }}
//           >
//             <div>
//               <div
//                 style={{
//                   fontSize: 13,
//                   color: "#555",
//                   marginBottom: 6,
//                   fontWeight: 700,
//                 }}
//               >
//                 បានចាកចេញ
//               </div>
//               <div style={{ fontSize: 22, fontWeight: 700, color: "#dc2626" }}>
//                 {stats.movedOut}
//               </div>
//             </div>
//             <div style={{ fontSize: 32, color: "#bdbdbd", opacity: 0.5 }}>
//               <DeleteOutlined />
//             </div>
//           </div>
//         </div>
   

//       {/* ── MAIN CARD ── */}
//       <div style={{ paddingTop: "20px" }}>
//         <Card
//           variant="borderless"
//           style={{ borderRadius: 16 }}
//           styles={{ body: { padding: 0 } }}
//         >
//           {/* TOOLBAR - First Row */}
//           <div
//             style={{
//               padding: "16px 20px",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               gap: 12,
//               flexWrap: "wrap",
//               borderBottom: "1px solid #f1f5f9",
//             }}
//           >
//             {/* Search input - extended width */}
//             <Input
//               value={search}
//               onChange={(e) => {
//                 setSearch(e.target.value);
//                 setPage(1);
//               }}
//               placeholder="ស្វែងរកតាមឈ្មោះ, លេខ, ឬបន្ទប់..."
//               prefix={<SearchOutlined style={{ color: "#9ca3af" }} />}
//               allowClear
//               style={{
//                 width: "100%",
//                 maxWidth: 420,
//                 height: 42,
//                 borderRadius: 10,
//                 background: "#f9fafb",
//                 borderColor: "#e5e7eb",
//               }}
//             />

//             {/* Right: add button */}
//             <Button
//               type="primary"
//               icon={<PlusOutlined />}
//               style={{
//                 height: 42,
//                 borderRadius: 10,
//                 paddingInline: 20,
//                 flexShrink: 0,
//               }}
//               onClick={() => {
//                 setEditingClient(null);
//                 setOpenModal(true);
//               }}
//             >
//               បង្កើត
//             </Button>
//           </div>

//           {/* FILTERS - Second Row (Always visible) */}
//           <div
//             style={{
//               padding: "12px 20px",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               gap: 12,
//               flexWrap: "wrap",
//               borderBottom: "1px solid #f1f5f9",
//               background: "#fafbfc",
//             }}
//           >
//             <div style={{ display: "flex", gap: 10, flexWrap: "wrap", flex: 1 }}>
//               {/* Status filter */}
//               <Select
//                 value={selectedStatus}
//                 onChange={(v) => {
//                   setSelectedStatus(v);
//                   setPage(1);
//                 }}
//                 style={{ width: 170, height: 42 }}
//                 suffixIcon={<FilterOutlined style={{ color: "#9ca3af" }} />}
//                 options={[
//                   { value: "", label: "ទាំងអស់" },
//                   { value: "Active", label: "កំពុងស្នាក់" },
//                   { value: "Pending", label: "កំពុងរង់ចាំ" },
//                   { value: "MovedOut", label: "បានចាកចេញ" },
//                 ]}
//                 optionRender={(opt) => {
//                   const cfgMap: Record<string, { dot: string }> = {
//                     Active: { dot: "#22c55e" },
//                     Pending: { dot: "#f59e0b" },
//                     MovedOut: { dot: "#ef4444" },
//                   };
//                   const cfg = cfgMap[opt.value as string];
//                   return cfg ? (
//                     <span
//                       style={{ display: "flex", alignItems: "center", gap: 8 }}
//                     >
//                       <span
//                         style={{
//                           width: 8,
//                           height: 8,
//                           borderRadius: "50%",
//                           background: cfg.dot,
//                           flexShrink: 0,
//                         }}
//                       />
//                       {opt.label}
//                     </span>
//                   ) : (
//                     <span>{opt.label}</span>
//                   );
//                 }}
//               />

//               {/* Room filter */}
//               <Select
//                 value={selectedRoom}
//                 onChange={(v) => {
//                   setSelectedRoom(v);
//                   setPage(1);
//                 }}
//                 style={{ width: 150, height: 42 }}
//                 suffixIcon={<HomeOutlined style={{ color: "#9ca3af" }} />}
//                 options={roomOptions}
//               />
//             </div>

//             {/* Clear filters button - Only shows when filters are active */}
//             {hasActiveFilters && (
//               <Button
//                 style={{
//                   height: 42,
//                   borderRadius: 10,
//                   color: "#6b7280",
//                   borderColor: "#e5e7eb",
//                 }}
//                 onClick={handleClearFilters}
//               >
//                 ជម្រះតម្រង
//               </Button>
//             )}
//           </div>

//           {/* TABLE */}
//           <div style={{ padding: "8px 16px 16px" }}>
//             <Table<ClientRow>
//               columns={columns}
//               dataSource={paginatedRows}
//               scroll={{ x: 900 }}
//               rowKey="key"
//               size="middle"
//               pagination={{
//                 ...buildPeopleTablePagination({
//                   page,
//                   pageSize,
//                   total: filteredRows.length,
//                 }),

//                 onChange: (p, ps) => {
//                   setPage(p);
//                   setPageSize(ps);
//                 },
//               }}
//             />
//           </div>
//         </Card>
//       </div>

//       <ClientForm
//         open={openModal}
//         title={editingClient ? "កែប្រែអតិថិជន" : "បន្ថែមអតិថិជន"}
//         initialValues={
//           editingClient
//             ? {
//                 customerCode: editingClient.clientCode,
//                 name: editingClient.name,
//                 phone: editingClient.phone,
//                 meterCode: editingClient.meterCode,
//                 installDate: editingClient.installDate,
//               }
//             : undefined
//         }
//         onCancel={() => {
//           setOpenModal(false);
//           setEditingClient(null);
//         }}
//         onSubmit={(values) => {
//           console.log(editingClient ? "update" : "create", values);
//           setOpenModal(false);
//           setEditingClient(null);
//         }}
//       />

//       {/* SCOPED STYLES */}
//       <style>{`
//         .ant-table { background: transparent !important; }

//         .ant-table-thead > tr > th {
//           background: #fafbfc !important;
//           color: #4f74e8 !important;
//           font-size: 13px !important;
//           font-weight: 700 !important;
//           border-bottom: 1px solid #eef2f7 !important;
//           padding-top: 13px !important;
//           padding-bottom: 13px !important;
//         }

//         .ant-table-tbody > tr > td {
//           border-bottom: 1px solid #f3f4f6 !important;
//           font-size: 13px;
//           padding-top: 11px !important;
//           padding-bottom: 11px !important;
//         }

//         .ant-table-tbody > tr:nth-child(odd) > td  { background: #fafafa; }
//         .ant-table-tbody > tr:nth-child(even) > td { background: #ffffff; }
//         .ant-table-tbody > tr:hover > td           { background: #f3f7ff !important; }

//         .ant-input:focus, .ant-input-focused {
//           border-color: #4f74e8 !important;
//           box-shadow: 0 0 0 2px rgba(79,116,232,0.08) !important;
//         }

//         .ant-btn-primary:hover { background: #3f63d8 !important; }

//         .ant-select-selector {
//           border-radius: 10px !important;
//           background: #f9fafb !important;
//           border-color: #e5e7eb !important;
//         }
//         .ant-select-focused .ant-select-selector {
//           border-color: #4f74e8 !important;
//           box-shadow: 0 0 0 2px rgba(79,116,232,0.08) !important;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default ClientPage;


import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FilterOutlined,
  HomeOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { App, Button, Card, Dropdown, Input, Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { NavLink, useNavigate } from "react-router-dom";
import { CLIENTS, type ClientRow, type ClientStatus } from "../../data/clientData";
import { buildPeopleTablePagination } from "../../utils/pagination";
import ClientForm from "./ClientForm";

// ─── Status Tag ───────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  ClientStatus,
  { color: string; bg: string; label: string; dot: string }
> = {
  Active: {
    color: "#15803d",
    bg: "#f0fdf4",
    label: "Active",
    dot: "#22c55e",
  },
  Pending: {
    color: "#b45309",
    bg: "#fffbeb",
    label: "Pending",
    dot: "#f59e0b",
  },
  MovedOut: {
    color: "#b91c1c",
    bg: "#fef2f2",
    label: "Moved Out",
    dot: "#ef4444",
  },
};

function StatusTag({ value }: { value: ClientStatus }) {
  const cfg = STATUS_CONFIG[value];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: cfg.bg,
        color: cfg.color,
        fontWeight: 600,
        fontSize: 13,
        borderRadius: 999,
        paddingInline: 12,
        paddingBlock: 4,
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: cfg.dot,
          flexShrink: 0,
        }}
      />
      {cfg.label}
    </span>
  );
}

// ─── ClientPage ───────────────────────────────────────────────────────────────

function ClientPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [selectedStatus, setSelectedStatus] = useState<ClientStatus | "">("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [openModal, setOpenModal] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientRow | null>(null);

  const navigate = useNavigate();
  const { modal } = App.useApp();

  const filteredRows = useMemo(() => {
    let rows = CLIENTS;

    if (selectedStatus) {
      rows = rows.filter((r) => r.status === selectedStatus);
    }

    if (selectedRoom) {
      rows = rows.filter((r) => r.room === selectedRoom);
    }

    if (debouncedSearch.trim()) {
      const kw = debouncedSearch.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.name.toLowerCase().includes(kw) ||
          r.clientCode.toLowerCase().includes(kw) ||
          r.id.toLowerCase().includes(kw) ||
          r.phone.toLowerCase().includes(kw) ||
          r.room.toLowerCase().includes(kw),
      );
    }

    return rows;
  }, [debouncedSearch, selectedStatus, selectedRoom]);

  const paginatedRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, page, pageSize]);

  // ── Quick stats ────────────────────────────────────────────────────────────
  const stats = useMemo(
    () => ({
      total: CLIENTS.length,
      active: CLIENTS.filter((r) => r.status === "Active").length,
      pending: CLIENTS.filter((r) => r.status === "Pending").length,
      movedOut: CLIENTS.filter((r) => r.status === "MovedOut").length,
    }),
    [],
  );

  // ── Room options from data ─────────────────────────────────────────────────
  const roomOptions = useMemo(() => {
    const rooms = Array.from(new Set(CLIENTS.map((r) => r.room))).sort();
    return [
      { value: "", label: "All" },
      ...rooms.map((r) => ({ value: r, label: `Room ${r}` })),
    ];
  }, []);

  // Check if any filter has a value selected (not default/empty)
  const hasActiveFilters = useMemo(() => {
    return selectedStatus !== "" || selectedRoom !== "" || debouncedSearch.trim() !== "";
  }, [selectedStatus, selectedRoom, debouncedSearch]);

  const handleClearFilters = () => {
    setSelectedStatus("");
    setSelectedRoom("");
    setSearch("");
    setPage(1);
  };

  const columns: ColumnsType<ClientRow> = [
    {
      title: "No.",
      dataIndex: "id",
      key: "id",
      width: 85,
      render: (v: string) => (
        <span style={{ color: "#9ca3af", fontWeight: 500, fontSize: 13 }}>
          {v}
        </span>
      ),
    },
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
      width: 200,
      render: (v: string, record) => (
        <NavLink
          to={`/client/${record.id}`}
          style={{
            color: "#4f74e8",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#eff3fe",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <UserOutlined style={{ fontSize: 14, color: "#4f74e8" }} />
          </span>
          {v}
        </NavLink>
      ),
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      width: 155,
      render: (v: string) => (
        <span
          style={{ color: "#374151", fontFamily: "monospace", fontSize: 13 }}
        >
          {v}
        </span>
      ),
    },
    {
      title: "Room",
      dataIndex: "room",
      key: "room",
      width: 90,
      render: (v: string) => (
        <span
          style={{
            background: "#f3f4f6",
            color: "#374151",
            fontWeight: 700,
            fontSize: 13,
            borderRadius: 8,
            paddingInline: 10,
            paddingBlock: 4,
            letterSpacing: 0.5,
          }}
        >
          {v}
        </span>
      ),
    },
    {
      title: "Move In Date",
      dataIndex: "moveInDate",
      key: "moveInDate",
      width: 175,
      render: (v: string) => (
        <span style={{ color: "#6b7280", fontSize: 13 }}>{v}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 160,
      render: (v: ClientStatus) => <StatusTag value={v} />,
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
              { key: "view", icon: <EyeOutlined />, label: "View" },
              { key: "update", icon: <EditOutlined />, label: "Edit" },
              { type: "divider" },
              {
                key: "delete",
                icon: <DeleteOutlined />,
                label: "Delete",
                danger: true,
              },
            ],
            onClick: ({ key }) => {
              if (key === "view") navigate(`/client/${record.id}`);
              if (key === "update") {
                setEditingClient(record);
                setOpenModal(true);
              }
              if (key === "delete") {
                modal.confirm({
                  title: "Confirm Deletion",
                  content: (
                    <span>
                      Are you sure you want to delete <strong>{record.name}</strong> (Room{" "}
                      {record.room})?
                    </span>
                  ),
                  okText: "Delete",
                  cancelText: "Cancel",
                  okButtonProps: { danger: true },
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
            style={{ width: 36, height: 36, borderRadius: 10 }}
          />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      {/* ── STAT CARDS (Dashboard Style) ── */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {/* Total Clients */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: 5,
              borderLeft: "5px solid #4f74e8",
              padding: "18px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              flex: 1,
              minWidth: 0,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 13,
                  color: "#555",
                  marginBottom: 6,
                  fontWeight: 700,
                }}
              >
                Total Clients
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#4f74e8" }}>
                {stats.total}
              </div>
            </div>
            <div style={{ fontSize: 32, color: "#bdbdbd", opacity: 0.5 }}>
              <UserOutlined />
            </div>
          </div>

          {/* Active Clients */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: 5,
              borderLeft: "5px solid #16a34a",
              padding: "18px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              flex: 1,
              minWidth: 0,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 13,
                  color: "#555",
                  marginBottom: 6,
                  fontWeight: 700,
                }}
              >
                Active
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#16a34a" }}>
                {stats.active}
              </div>
            </div>
            <div style={{ fontSize: 32, color: "#bdbdbd", opacity: 0.5 }}>
              <HomeOutlined />
            </div>
          </div>

          {/* Pending Clients */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: 5,
              borderLeft: "5px solid #d97706",
              padding: "18px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              flex: 1,
              minWidth: 0,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 13,
                  color: "#555",
                  marginBottom: 6,
                  fontWeight: 700,
                }}
              >
                Pending
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#d97706" }}>
                {stats.pending}
              </div>
            </div>
            <div style={{ fontSize: 32, color: "#bdbdbd", opacity: 0.5 }}>
              <FilterOutlined />
            </div>
          </div>

          {/* Moved Out Clients */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: 5,
              borderLeft: "5px solid #dc2626",
              padding: "18px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              flex: 1,
              minWidth: 0,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 13,
                  color: "#555",
                  marginBottom: 6,
                  fontWeight: 700,
                }}
              >
                Moved Out
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#dc2626" }}>
                {stats.movedOut}
              </div>
            </div>
            <div style={{ fontSize: 32, color: "#bdbdbd", opacity: 0.5 }}>
              <DeleteOutlined />
            </div>
          </div>
        </div>
   

      {/* ── MAIN CARD ── */}
      <div style={{ paddingTop: "20px" }}>
        <Card
          variant="borderless"
          style={{ borderRadius: 16 }}
          styles={{ body: { padding: 0 } }}
        >
          {/* TOOLBAR - First Row */}
          <div
            style={{
              padding: "16px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
              borderBottom: "1px solid #f1f5f9",
            }}
          >
            {/* Search input - extended width */}
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by name, number, or room..."
              prefix={<SearchOutlined style={{ color: "#9ca3af" }} />}
              allowClear
              style={{
                width: "100%",
                maxWidth: 420,
                height: 42,
                borderRadius: 10,
                background: "#f9fafb",
                borderColor: "#e5e7eb",
              }}
            />

            {/* Right: add button */}
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{
                height: 42,
                borderRadius: 10,
                paddingInline: 20,
                flexShrink: 0,
              }}
              onClick={() => {
                setEditingClient(null);
                setOpenModal(true);
              }}
            >
              Create
            </Button>
          </div>

          {/* FILTERS - Second Row (Always visible) */}
          <div
            style={{
              padding: "12px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
              borderBottom: "1px solid #f1f5f9",
              background: "#fafbfc",
            }}
          >
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", flex: 1 }}>
              {/* Status filter */}
              <Select
                value={selectedStatus}
                onChange={(v) => {
                  setSelectedStatus(v);
                  setPage(1);
                }}
                style={{ width: 170, height: 42 }}
                suffixIcon={<FilterOutlined style={{ color: "#9ca3af" }} />}
                options={[
                  { value: "", label: "All" },
                  { value: "Active", label: "Active" },
                  { value: "Pending", label: "Pending" },
                  { value: "MovedOut", label: "Moved Out" },
                ]}
                optionRender={(opt) => {
                  const cfgMap: Record<string, { dot: string }> = {
                    Active: { dot: "#22c55e" },
                    Pending: { dot: "#f59e0b" },
                    MovedOut: { dot: "#ef4444" },
                  };
                  const cfg = cfgMap[opt.value as string];
                  return cfg ? (
                    <span
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: cfg.dot,
                          flexShrink: 0,
                        }}
                      />
                      {opt.label}
                    </span>
                  ) : (
                    <span>{opt.label}</span>
                  );
                }}
              />

              {/* Room filter */}
              <Select
                value={selectedRoom}
                onChange={(v) => {
                  setSelectedRoom(v);
                  setPage(1);
                }}
                style={{ width: 150, height: 42 }}
                suffixIcon={<HomeOutlined style={{ color: "#9ca3af" }} />}
                options={roomOptions}
              />
            </div>

            {/* Clear filters button - Only shows when filters are active */}
            {hasActiveFilters && (
              <Button
                style={{
                  height: 42,
                  borderRadius: 10,
                  color: "#6b7280",
                  borderColor: "#e5e7eb",
                }}
                onClick={handleClearFilters}
              >
                Clear Filters
              </Button>
            )}
          </div>

          {/* TABLE */}
          <div style={{ padding: "8px 16px 16px" }}>
            <Table<ClientRow>
              columns={columns}
              dataSource={paginatedRows}
              scroll={{ x: 900 }}
              rowKey="key"
              size="middle"
              pagination={{
                ...buildPeopleTablePagination({
                  page,
                  pageSize,
                  total: filteredRows.length,
                }),

                onChange: (p, ps) => {
                  setPage(p);
                  setPageSize(ps);
                },
              }}
            />
          </div>
        </Card>
      </div>

      <ClientForm
        open={openModal}
        title={editingClient ? "Edit Customer" : "Add Customer"}
        initialValues={
          editingClient
            ? {
                customerCode: editingClient.clientCode,
                name: editingClient.name,
                phone: editingClient.phone,
                meterCode: editingClient.meterCode,
                installDate: editingClient.installDate,
              }
            : undefined
        }
        onCancel={() => {
          setOpenModal(false);
          setEditingClient(null);
        }}
        onSubmit={(values) => {
          console.log(editingClient ? "update" : "create", values);
          setOpenModal(false);
          setEditingClient(null);
        }}
      />

      {/* SCOPED STYLES */}
      <style>{`
        .ant-table { background: transparent !important; }

        .ant-table-thead > tr > th {
          background: #fafbfc !important;
          color: #4f74e8 !important;
          font-size: 13px !important;
          font-weight: 700 !important;
          border-bottom: 1px solid #eef2f7 !important;
          padding-top: 13px !important;
          padding-bottom: 13px !important;
        }

        .ant-table-tbody > tr > td {
          border-bottom: 1px solid #f3f4f6 !important;
          font-size: 13px;
          padding-top: 11px !important;
          padding-bottom: 11px !important;
        }

        .ant-table-tbody > tr:nth-child(odd) > td  { background: #fafafa; }
        .ant-table-tbody > tr:nth-child(even) > td { background: #ffffff; }
        .ant-table-tbody > tr:hover > td           { background: #f3f7ff !important; }

        .ant-input:focus, .ant-input-focused {
          border-color: #4f74e8 !important;
          box-shadow: 0 0 0 2px rgba(79,116,232,0.08) !important;
        }

        .ant-btn-primary:hover { background: #3f63d8 !important; }

        .ant-select-selector {
          border-radius: 10px !important;
          background: #f9fafb !important;
          border-color: #e5e7eb !important;
        }
        .ant-select-focused .ant-select-selector {
          border-color: #4f74e8 !important;
          box-shadow: 0 0 0 2px rgba(79,116,232,0.08) !important;
        }
      `}</style>
    </div>
  );
}

export default ClientPage;
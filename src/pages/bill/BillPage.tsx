// import {
//   CheckOutlined,
//   DeleteOutlined,
//   DownloadOutlined,
//   EditOutlined,
//   EyeOutlined,
//   FilterOutlined,
//   MoreOutlined,
//   PlusOutlined,
//   SearchOutlined,
//   CalendarOutlined,
// } from "@ant-design/icons";
// import {
//   App,
//   Button,
//   Card,
//   Dropdown,
//   Input,
//   Select,
//   Table,
//   Tag,
// } from "antd";
// import type { ColumnsType } from "antd/es/table";
// import { useMemo, useState } from "react";
// import { useDebounce } from "use-debounce";
// import { buildEnergyUsageTablePagination } from "../../utils/pagination";
// import { GenerateBillsModal, type GenerateBillsFormValues } from "./GenerateBillsModal";


// // ─── Types ──────────────────────────────────────────────────────────────────

// export type BillStatus = "Paid" | "Unpaid" | "Overdue";

// export interface BillRow {
//   key: string;
//   id: string;
//   clientId: string;
//   clientName: string;
//   month: string;
//   monthLabel: string;
//   oldReading: number;
//   newReading: number;
//   usage: number;
//   unitPrice: number;
//   total: string;
//   issueDate: string;
//   dueDate: string;
//   status: BillStatus;
// }

// // ─── Mock Data ───────────────────────────────────────────────────────────────

// const BILLS: BillRow[] = [
//   {
//     key: "1",
//     id: "B-001",
//     clientId: "C-001",
//     clientName: "សុខ សុភា",
//     month: "2025-05",
//     monthLabel: "ឧសភា 2025",
//     oldReading: 1200,
//     newReading: 1345,
//     usage: 145,
//     unitPrice: 900,
//     total: "130,500៛",
//     issueDate: "01/05/2025",
//     dueDate: "15/05/2025",
//     status: "Paid",
//   },
//   {
//     key: "2",
//     id: "B-002",
//     clientId: "C-002",
//     clientName: "វង្ស ចន្ថា",
//     month: "2025-05",
//     monthLabel: "ឧសភា 2025",
//     oldReading: 870,
//     newReading: 980,
//     usage: 110,
//     unitPrice: 900,
//     total: "99,000៛",
//     issueDate: "01/05/2025",
//     dueDate: "15/05/2025",
//     status: "Unpaid",
//   },
//   {
//     key: "3",
//     id: "B-003",
//     clientId: "C-003",
//     clientName: "ហេង សុវណ្ណ",
//     month: "2025-05",
//     monthLabel: "ឧសភា 2025",
//     oldReading: 560,
//     newReading: 710,
//     usage: 150,
//     unitPrice: 900,
//     total: "135,000៛",
//     issueDate: "01/05/2025",
//     dueDate: "15/05/2025",
//     status: "Overdue",
//   },
//   {
//     key: "4",
//     id: "B-004",
//     clientId: "C-001",
//     clientName: "សុខ សុភា",
//     month: "2025-04",
//     monthLabel: "មេសា 2025",
//     oldReading: 1060,
//     newReading: 1200,
//     usage: 140,
//     unitPrice: 900,
//     total: "126,000៛",
//     issueDate: "01/04/2025",
//     dueDate: "15/04/2025",
//     status: "Paid",
//   },
//   {
//     key: "5",
//     id: "B-005",
//     clientId: "C-004",
//     clientName: "ម៉ៅ ច័ន្ទបូ",
//     month: "2025-05",
//     monthLabel: "ឧសភា 2025",
//     oldReading: 2100,
//     newReading: 2280,
//     usage: 180,
//     unitPrice: 900,
//     total: "162,000៛",
//     issueDate: "01/05/2025",
//     dueDate: "15/05/2025",
//     status: "Paid",
//   },
//   {
//     key: "6",
//     id: "B-006",
//     clientId: "C-005",
//     clientName: "ទូច រ៉ាណា",
//     month: "2025-05",
//     monthLabel: "ឧសភា 2025",
//     oldReading: 430,
//     newReading: 560,
//     usage: 130,
//     unitPrice: 900,
//     total: "117,000៛",
//     issueDate: "01/05/2025",
//     dueDate: "15/05/2025",
//     status: "Unpaid",
//   },
//   {
//     key: "7",
//     id: "B-007",
//     clientId: "C-006",
//     clientName: "ឃុន លីណា",
//     month: "2025-04",
//     monthLabel: "មេសា 2025",
//     oldReading: 980,
//     newReading: 1095,
//     usage: 115,
//     unitPrice: 900,
//     total: "103,500៛",
//     issueDate: "01/04/2025",
//     dueDate: "15/04/2025",
//     status: "Overdue",
//   },
//   {
//     key: "8",
//     id: "B-008",
//     clientId: "C-007",
//     clientName: "នួន សុធារ៉ា",
//     month: "2025-05",
//     monthLabel: "ឧសភា 2025",
//     oldReading: 1500,
//     newReading: 1670,
//     usage: 170,
//     unitPrice: 900,
//     total: "153,000៛",
//     issueDate: "01/05/2025",
//     dueDate: "15/05/2025",
//     status: "Paid",
//   },
// ];

// // ─── Month options ───────────────────────────────────────────────────────────

// const MONTH_OPTIONS = [
//   { value: "", label: "ទាំងអស់" },
//   { value: "2025-05", label: "ឧសភា 2025" },
//   { value: "2025-04", label: "មេសា 2025" },
//   { value: "2025-03", label: "មីនា 2025" },
// ];

// const STATUS_OPTIONS = [
//   { value: "", label: "ទាំងអស់" },
//   { value: "Paid", label: "បានបង់" },
//   { value: "Unpaid", label: "មិនទាន់បង់" },
//   { value: "Overdue", label: "ហួសកំណត់" },
// ];

// // ─── Helpers ─────────────────────────────────────────────────────────────────

// function StatusTag({ value }: { value: BillStatus }) {
//   const tagStyle = {
//     borderRadius: 999,
//     paddingInline: 12,
//     height: 30,
//     display: "inline-flex" as const,
//     alignItems: "center",
//     gap: 6,
//     fontWeight: 600,
//     border: "none",
//     fontSize: 13,
//   };

//   if (value === "Paid") {
//     return (
//       <Tag color="success" style={tagStyle}>
//         <CheckOutlined /> បានបង់
//       </Tag>
//     );
//   }
//   if (value === "Overdue") {
//     return (
//       <Tag color="warning" style={tagStyle}>
//         ⚠ ហួសកំណត់
//       </Tag>
//     );
//   }
//   return (
//     <Tag color="error" style={tagStyle}>
//       ✕ មិនទាន់បង់
//     </Tag>
//   );
// }

// // ─── BillPage ────────────────────────────────────────────────────────────────

// function BillPage() {
//   const [search, setSearch] = useState("");
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(7);
//   const [generateModalOpen, setGenerateModalOpen] = useState(false);

//   const [debouncedSearch] = useDebounce(search, 300);

//   const { modal, message: appMessage } = App.useApp();

//   // ── Filtered rows ──────────────────────────────────────────────────────────
//   const filteredRows = useMemo(() => {
//     let rows = BILLS;

//     if (selectedMonth) {
//       rows = rows.filter((r) => r.month === selectedMonth);
//     }

//     if (selectedStatus) {
//       rows = rows.filter((r) => r.status === selectedStatus);
//     }

//     if (debouncedSearch.trim()) {
//       const kw = debouncedSearch.toLowerCase();
//       rows = rows.filter(
//         (r) =>
//           r.clientName.toLowerCase().includes(kw) ||
//           r.id.toLowerCase().includes(kw) ||
//           r.clientId.toLowerCase().includes(kw) ||
//           r.monthLabel.toLowerCase().includes(kw),
//       );
//     }

//     return rows;
//   }, [debouncedSearch, selectedMonth, selectedStatus]);

//   // ── Stats ──────────────────────────────────────────────────────────────────
//   const stats = useMemo(() => {
//     const scope = selectedMonth
//       ? BILLS.filter((r) => r.month === selectedMonth)
//       : BILLS;

//     return {
//       total: scope.length,
//       paid: scope.filter((r) => r.status === "Paid").length,
//       unpaid: scope.filter((r) => r.status === "Unpaid").length,
//       overdue: scope.filter((r) => r.status === "Overdue").length,
//     };
//   }, [selectedMonth]);

//   // ── Paginated ──────────────────────────────────────────────────────────────
//   const paginatedRows = useMemo(() => {
//     const start = (page - 1) * pageSize;
//     return filteredRows.slice(start, start + pageSize);
//   }, [filteredRows, page, pageSize]);

//   // Check if any filter is active
//   const hasActiveFilters = useMemo(() => {
//     return selectedMonth !== "" || selectedStatus !== "" || debouncedSearch.trim() !== "";
//   }, [selectedMonth, selectedStatus, debouncedSearch]);

//   const handleClearFilters = () => {
//     setSelectedMonth("");
//     setSelectedStatus("");
//     setSearch("");
//     setPage(1);
//   };

//   const handleGenerateBills = (values: GenerateBillsFormValues) => {
//     console.log("Generating bills with:", values);
//     appMessage.success("​វិក្កយបត្រត្រូវបានបង្កើតដោយជោគជ័យ!");
//     setGenerateModalOpen(false);
//   };

//   // ── Columns ────────────────────────────────────────────────────────────────
//   const columns: ColumnsType<BillRow> = [
//     {
//       title: "ល.រ",
//       dataIndex: "id",
//       key: "id",
//       width: 90,
//       render: (v: string) => (
//         <span style={{ color: "#6b7280", fontWeight: 500 }}>{v}</span>
//       ),
//     },
//     {
//       title: "ឈ្មោះអតិថិជន",
//       dataIndex: "clientName",
//       key: "clientName",
//       width: 180,
//       render: (v: string, record) => (
//         <span style={{ color: "#4f74e8", fontWeight: 600 }}>
//           {v}
//           <br />
//           <span style={{ color: "#9ca3af", fontSize: 12, fontWeight: 400 }}>
//             {record.clientId}
//           </span>
//         </span>
//       ),
//     },
//     {
//       title: "ខែ",
//       dataIndex: "monthLabel",
//       key: "monthLabel",
//       width: 140,
//       render: (v: string) => (
//         <span style={{ color: "#374151", fontWeight: 500 }}>
//           <CalendarOutlined style={{ marginRight: 6, color: "#4f74e8" }} />
//           {v}
//         </span>
//       ),
//     },
//     {
//       title: "លេខកុងទ័រចាស់",
//       dataIndex: "oldReading",
//       key: "oldReading",
//       width: 130,
//       render: (v: number) => (
//         <span style={{ color: "#6b7280" }}>{v.toLocaleString()}</span>
//       ),
//     },
//     {
//       title: "លេខកុងទ័រថ្មី",
//       dataIndex: "newReading",
//       key: "newReading",
//       width: 120,
//       render: (v: number) => (
//         <span style={{ color: "#6b7280" }}>{v.toLocaleString()}</span>
//       ),
//     },
//     {
//       title: "ទំហំប្រើប្រាស់ (kWh)",
//       dataIndex: "usage",
//       key: "usage",
//       width: 155,
//       render: (v: number) => (
//         <span style={{ fontWeight: 600, color: "#374151" }}>
//           {v.toLocaleString()} kWh
//         </span>
//       ),
//     },
//     {
//       title: "គិតជាទឹកប្រាក់",
//       dataIndex: "total",
//       key: "total",
//       width: 160,
//       render: (v: string) => (
//         <span style={{ fontWeight: 700, color: "#1d4ed8" }}>{v}</span>
//       ),
//     },
//     {
//       title: "កាលបរិច្ឆេទ",
//       key: "dates",
//       width: 165,
//       render: (_, record) => (
//         <span style={{ fontSize: 12, color: "#6b7280", lineHeight: "1.8" }}>
//           ចេញ: {record.issueDate}
//           <br />
//           ផុតកំណត់:{" "}
//           <span
//             style={{
//               color: record.status === "Overdue" ? "#ef4444" : "#6b7280",
//             }}
//           >
//             {record.dueDate}
//           </span>
//         </span>
//       ),
//     },
//     {
//       title: "ស្ថានភាព",
//       dataIndex: "status",
//       key: "status",
//       width: 150,
//       render: (v: BillStatus) => <StatusTag value={v} />,
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
//               { key: "view", icon: <EyeOutlined />, label: "មើលព័ត៌មាន" },
//               { key: "edit", icon: <EditOutlined />, label: "កែប្រែ" },
//               {
//                 key: "download",
//                 icon: <DownloadOutlined />,
//                 label: "ទាញយក PDF",
//               },
//               { type: "divider" },
//               {
//                 key: "delete",
//                 icon: <DeleteOutlined />,
//                 label: "លុប",
//                 danger: true,
//               },
//             ],
//             onClick: ({ key }) => {
//               if (key === "delete") {
//                 modal.confirm({
//                   title: "បញ្ជាក់ការលុប",
//                   content: (
//                     <span>
//                       តើអ្នកពិតជាចង់លុប​វិក្កយបត្រ <strong>{record.id}</strong>{" "}
//                       របស់ <strong>{record.clientName}</strong> មែនទេ?
//                     </span>
//                   ),
//                   okText: "លុប",
//                   cancelText: "បោះបង់",
//                   okButtonProps: { danger: true },
//                   centered: true,
//                   onOk() {
//                     console.log("delete bill", record);
//                   },
//                 });
//               } else {
//                 console.log(key, record);
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
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         gap: 16,
//       }}
//     >
//       {/* ── STAT CARDS (Client Page Style) ── */}
//       <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
//         <div
//           style={{
//             background: "#ffffff",
//             borderRadius: 5,
//             borderLeft: "5px solid #4f74e8",
//             padding: "18px 20px",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
//             flex: 1,
//             minWidth: 0,
//           }}
//         >
//           <div>
//             <div style={{ fontSize: 13, color: "#555", marginBottom: 6, fontWeight: 700 }}>
//               ​វិក្កយបត្រសរុប
//             </div>
//             <div style={{ fontSize: 22, fontWeight: 700, color: "#4f74e8" }}>{stats.total}</div>
//           </div>
//           <div style={{ fontSize: 32, color: "#bdbdbd", opacity: 0.5 }}>
//             <CalendarOutlined />
//           </div>
//         </div>

//         <div
//           style={{
//             background: "#ffffff",
//             borderRadius: 5,
//             borderLeft: "5px solid #16a34a",
//             padding: "18px 20px",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
//             flex: 1,
//             minWidth: 0,
//           }}
//         >
//           <div>
//             <div style={{ fontSize: 13, color: "#555", marginBottom: 6, fontWeight: 700 }}>
//               បានបង់
//             </div>
//             <div style={{ fontSize: 22, fontWeight: 700, color: "#16a34a" }}>{stats.paid}</div>
//           </div>
//           <div style={{ fontSize: 32, color: "#bdbdbd", opacity: 0.5 }}>
//             <CheckOutlined />
//           </div>
//         </div>

//         <div
//           style={{
//             background: "#ffffff",
//             borderRadius: 5,
//             borderLeft: "5px solid #dc2626",
//             padding: "18px 20px",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
//             flex: 1,
//             minWidth: 0,
//           }}
//         >
//           <div>
//             <div style={{ fontSize: 13, color: "#555", marginBottom: 6, fontWeight: 700 }}>
//               មិនទាន់បង់
//             </div>
//             <div style={{ fontSize: 22, fontWeight: 700, color: "#dc2626" }}>{stats.unpaid}</div>
//           </div>
//           <div style={{ fontSize: 32, color: "#bdbdbd", opacity: 0.5 }}>
//             <DeleteOutlined />
//           </div>
//         </div>

//         <div
//           style={{
//             background: "#ffffff",
//             borderRadius: 5,
//             borderLeft: "5px solid #d97706",
//             padding: "18px 20px",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
//             flex: 1,
//             minWidth: 0,
//           }}
//         >
//           <div>
//             <div style={{ fontSize: 13, color: "#555", marginBottom: 6, fontWeight: 700 }}>
//               ហួសកំណត់
//             </div>
//             <div style={{ fontSize: 22, fontWeight: 700, color: "#d97706" }}>{stats.overdue}</div>
//           </div>
//           <div style={{ fontSize: 32, color: "#bdbdbd", opacity: 0.5 }}>
//             <FilterOutlined />
//           </div>
//         </div>
//       </div>

//       {/* ── MAIN TABLE CARD ── */}
//       <div style={{ paddingTop: "20px" }}>
//         <Card
//           variant="borderless"
//           styles={{ body: { padding: 0 } }}
//           style={{ borderRadius: 16 }}
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
//               placeholder="ស្វែងរកតាមឈ្មោះ, លេខ..."
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

//             {/* Action Buttons */}
//             <div style={{ display: "flex", gap: 10 }}>
//               <Button
//                 icon={<DownloadOutlined />}
//                 style={{ height: 42, borderRadius: 10 }}
//               >
//                 ទាញយក
//               </Button>
//               <Button
//                 type="primary"
//                 icon={<PlusOutlined />}
//                 style={{ height: 42, borderRadius: 10 }}
//                 onClick={() => setGenerateModalOpen(true)}
//               >
//                 បង្កើត
//               </Button>
//             </div>
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
//               {/* Month filter */}
//               <Select
//                 value={selectedMonth}
//                 onChange={(v) => {
//                   setSelectedMonth(v);
//                   setPage(1);
//                 }}
//                 options={MONTH_OPTIONS}
//                 style={{ width: 170, height: 42 }}
//                 suffixIcon={<CalendarOutlined style={{ color: "#9ca3af" }} />}
//               />

//               {/* Status filter */}
//               <Select
//                 value={selectedStatus}
//                 onChange={(v) => {
//                   setSelectedStatus(v);
//                   setPage(1);
//                 }}
//                 options={STATUS_OPTIONS}
//                 style={{ width: 170, height: 42 }}
//                 suffixIcon={<FilterOutlined style={{ color: "#9ca3af" }} />}
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
//             <Table<BillRow>
//               columns={columns}
//               dataSource={paginatedRows}
//               scroll={{ x: 1400 }}
//               rowKey="key"
//               size="middle"
//               pagination={{
//                 ...buildEnergyUsageTablePagination({
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

//       {/* Generate Bills Modal */}
//       <GenerateBillsModal
//         open={generateModalOpen}
//         onCancel={() => setGenerateModalOpen(false)}
//         onGenerate={handleGenerateBills}
//       />

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
//           color: #6b7280;
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

// export default BillPage;

import {
  CheckOutlined,
  DeleteOutlined,
  DownloadOutlined,
  FilterOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import {
  App,
  Button,
  Card,
  Dropdown,
  Input,
  Select,
  Table,
  Tag,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { buildEnergyUsageTablePagination } from "../../utils/pagination";
import { GenerateBillsModal, type GenerateBillsFormValues } from "./GenerateBillsModal";
import { generatePDFBlobUrl } from "../../utils/handlePreviewPDF";
import PDFPreviewOverlay from "../../utils/PDFPreviewOverlay";
import InvoiceTemplate from "../../components/InvoiceTemplate";


// ─── Types ──────────────────────────────────────────────────────────────────

export type BillStatus = "Paid" | "Unpaid" | "Overdue";

export interface BillRow {
  key: string;
  id: string;
  clientId: string;
  clientName: string;
  month: string;
  monthLabel: string;
  oldReading: number;
  newReading: number;
  usage: number;
  unitPrice: number;
  total: string;
  issueDate: string;
  dueDate: string;
  status: BillStatus;
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

const BILLS: BillRow[] = [
  {
    key: "1",
    id: "B-001",
    clientId: "C-001",
    clientName: "Sok Sopha",
    month: "2025-05",
    monthLabel: "May 2025",
    oldReading: 1200,
    newReading: 1345,
    usage: 145,
    unitPrice: 900,
    total: "130,500៛",
    issueDate: "01/05/2025",
    dueDate: "15/05/2025",
    status: "Paid",
  },
  {
    key: "2",
    id: "B-002",
    clientId: "C-002",
    clientName: "Vong Chantha",
    month: "2025-05",
    monthLabel: "May 2025",
    oldReading: 870,
    newReading: 980,
    usage: 110,
    unitPrice: 900,
    total: "99,000៛",
    issueDate: "01/05/2025",
    dueDate: "15/05/2025",
    status: "Unpaid",
  },
  {
    key: "3",
    id: "B-003",
    clientId: "C-003",
    clientName: "Heng Sovanna",
    month: "2025-05",
    monthLabel: "May 2025",
    oldReading: 560,
    newReading: 710,
    usage: 150,
    unitPrice: 900,
    total: "135,000៛",
    issueDate: "01/05/2025",
    dueDate: "15/05/2025",
    status: "Overdue",
  },
  {
    key: "4",
    id: "B-004",
    clientId: "C-001",
    clientName: "Sok Sopha",
    month: "2025-04",
    monthLabel: "April 2025",
    oldReading: 1060,
    newReading: 1200,
    usage: 140,
    unitPrice: 900,
    total: "126,000៛",
    issueDate: "01/04/2025",
    dueDate: "15/04/2025",
    status: "Paid",
  },
  {
    key: "5",
    id: "B-005",
    clientId: "C-004",
    clientName: "Mao Chanborey",
    month: "2025-05",
    monthLabel: "May 2025",
    oldReading: 2100,
    newReading: 2280,
    usage: 180,
    unitPrice: 900,
    total: "162,000៛",
    issueDate: "01/05/2025",
    dueDate: "15/05/2025",
    status: "Paid",
  },
  {
    key: "6",
    id: "B-006",
    clientId: "C-005",
    clientName: "Touch Rana",
    month: "2025-05",
    monthLabel: "May 2025",
    oldReading: 430,
    newReading: 560,
    usage: 130,
    unitPrice: 900,
    total: "117,000៛",
    issueDate: "01/05/2025",
    dueDate: "15/05/2025",
    status: "Unpaid",
  },
  {
    key: "7",
    id: "B-007",
    clientId: "C-006",
    clientName: "Khun Leena",
    month: "2025-04",
    monthLabel: "April 2025",
    oldReading: 980,
    newReading: 1095,
    usage: 115,
    unitPrice: 900,
    total: "103,500៛",
    issueDate: "01/04/2025",
    dueDate: "15/04/2025",
    status: "Overdue",
  },
  {
    key: "8",
    id: "B-008",
    clientId: "C-007",
    clientName: "Noun Sotheara",
    month: "2025-05",
    monthLabel: "May 2025",
    oldReading: 1500,
    newReading: 1670,
    usage: 170,
    unitPrice: 900,
    total: "153,000៛",
    issueDate: "01/05/2025",
    dueDate: "15/05/2025",
    status: "Paid",
  },
];

// ─── Month options ───────────────────────────────────────────────────────────

const MONTH_OPTIONS = [
  { value: "", label: "All" },
  { value: "2025-05", label: "May 2025" },
  { value: "2025-04", label: "April 2025" },
  { value: "2025-03", label: "March 2025" },
];

const STATUS_OPTIONS = [
  { value: "", label: "All" },
  { value: "Paid", label: "Paid" },
  { value: "Unpaid", label: "Unpaid" },
  { value: "Overdue", label: "Overdue" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function StatusTag({ value }: { value: BillStatus }) {
  const tagStyle = {
    borderRadius: 999,
    paddingInline: 12,
    height: 30,
    display: "inline-flex" as const,
    alignItems: "center",
    gap: 6,
    fontWeight: 600,
    border: "none",
    fontSize: 13,
  };

  if (value === "Paid") {
    return (
      <Tag color="success" style={tagStyle}>
        <CheckOutlined /> Paid
      </Tag>
    );
  }
  if (value === "Overdue") {
    return (
      <Tag color="warning" style={tagStyle}>
        ⚠ Overdue
      </Tag>
    );
  }
  return (
    <Tag color="error" style={tagStyle}>
      ✕ Unpaid
    </Tag>
  );
}

// ─── BillPage ────────────────────────────────────────────────────────────────

function BillPage() {
  const [search, setSearch] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [generateModalOpen, setGenerateModalOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string>();

  const [debouncedSearch] = useDebounce(search, 300);

  const { modal, message: appMessage } = App.useApp();

  // ── Filtered rows ──────────────────────────────────────────────────────────
  const filteredRows = useMemo(() => {
    let rows = BILLS;

    if (selectedMonth) {
      rows = rows.filter((r) => r.month === selectedMonth);
    }

    if (selectedStatus) {
      rows = rows.filter((r) => r.status === selectedStatus);
    }

    if (debouncedSearch.trim()) {
      const kw = debouncedSearch.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.clientName.toLowerCase().includes(kw) ||
          r.id.toLowerCase().includes(kw) ||
          r.clientId.toLowerCase().includes(kw) ||
          r.monthLabel.toLowerCase().includes(kw),
      );
    }

    return rows;
  }, [debouncedSearch, selectedMonth, selectedStatus]);

  // ── Stats ──────────────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const scope = selectedMonth
      ? BILLS.filter((r) => r.month === selectedMonth)
      : BILLS;

    return {
      total: scope.length,
      paid: scope.filter((r) => r.status === "Paid").length,
      unpaid: scope.filter((r) => r.status === "Unpaid").length,
      overdue: scope.filter((r) => r.status === "Overdue").length,
    };
  }, [selectedMonth]);

  // ── Paginated ──────────────────────────────────────────────────────────────
  const paginatedRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, page, pageSize]);

  // Check if any filter is active
  const hasActiveFilters = useMemo(() => {
    return selectedMonth !== "" || selectedStatus !== "" || debouncedSearch.trim() !== "";
  }, [selectedMonth, selectedStatus, debouncedSearch]);

  const handleClearFilters = () => {
    setSelectedMonth("");
    setSelectedStatus("");
    setSearch("");
    setPage(1);
  };

  const handleGenerateBills = (values: GenerateBillsFormValues) => {
    console.log("Generating bills with:", values);
    appMessage.success("Bills have been successfully generated!");
    setGenerateModalOpen(false);
  };

  // ── Columns ────────────────────────────────────────────────────────────────
  const columns: ColumnsType<BillRow> = [
    {
      title: "No.",
      dataIndex: "id",
      key: "id",
      width: 90,
      render: (v: string) => (
        <span style={{ color: "#6b7280", fontWeight: 500 }}>{v}</span>
      ),
    },
    {
      title: "Customer Name",
      dataIndex: "clientName",
      key: "clientName",
      width: 180,
      render: (v: string, record) => (
        <span style={{ color: "#4f74e8", fontWeight: 600 }}>
          {v}
          <br />
          <span style={{ color: "#9ca3af", fontSize: 12, fontWeight: 400 }}>
            {record.clientId}
          </span>
        </span>
      ),
    },
    {
      title: "Month",
      dataIndex: "monthLabel",
      key: "monthLabel",
      width: 140,
      render: (v: string) => (
        <span style={{ color: "#374151", fontWeight: 500 }}>
          <CalendarOutlined style={{ marginRight: 6, color: "#4f74e8" }} />
          {v}
        </span>
      ),
    },
    {
      title: "Old Meter",
      dataIndex: "oldReading",
      key: "oldReading",
      width: 130,
      render: (v: number) => (
        <span style={{ color: "#6b7280" }}>{v.toLocaleString()}</span>
      ),
    },
    {
      title: "New Meter",
      dataIndex: "newReading",
      key: "newReading",
      width: 120,
      render: (v: number) => (
        <span style={{ color: "#6b7280" }}>{v.toLocaleString()}</span>
      ),
    },
    {
      title: "Usage",
      dataIndex: "usage",
      key: "usage",
      width: 155,
      render: (v: number) => (
        <span style={{ fontWeight: 600, color: "#374151" }}>
          {v.toLocaleString()} kWh
        </span>
      ),
    },
    {
      title: "Amount",
      dataIndex: "total",
      key: "total",
      width: 160,
      render: (v: string) => (
        <span style={{ fontWeight: 700, color: "#1d4ed8" }}>{v}</span>
      ),
    },
    {
      title: "Date",
      key: "dates",
      width: 165,
      render: (_, record) => (
        <span style={{ fontSize: 12, color: "#6b7280", lineHeight: "1.8" }}>
          Issued: {record.issueDate}
          <br />
          Due:{" "}
          <span
            style={{
              color: record.status === "Overdue" ? "#ef4444" : "#6b7280",
            }}
          >
            {record.dueDate}
          </span>
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (v: BillStatus) => <StatusTag value={v} />,
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
              // { key: "view", icon: <EyeOutlined />, label: "View Details" },
              { key: "download", icon: <DownloadOutlined />, label: "Download PDF" },
              { type: "divider" },
              {
                key: "delete",
                icon: <DeleteOutlined />,
                label: "Delete",
                danger: true,
              },
            ],
            onClick: async ({ key }) => {
              if (key === "download") {
                const url = await generatePDFBlobUrl({
                  elementId: `invoice-pdf-${record.id}`,
                });
                if (!url) return;
                setPdfUrl(url);
                setPreviewOpen(true);
              } else if (key === "delete") {
                modal.confirm({
                  title: "Confirm Deletion",
                  content: (
                    <span>
                      Are you sure you want to delete bill <strong>{record.id}</strong>{" "}
                      for <strong>{record.clientName}</strong>?
                    </span>
                  ),
                  okText: "Delete",
                  cancelText: "Cancel",
                  okButtonProps: { danger: true },
                  centered: true,
                  onOk() {
                    console.log("delete bill", record);
                  },
                });
              } else {
                console.log(key, record);
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      {/* ── STAT CARDS (Client Page Style) ── */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
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
            <div style={{ fontSize: 13, color: "#555", marginBottom: 6, fontWeight: 700 }}>
              Total Bills
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#4f74e8" }}>{stats.total}</div>
          </div>
          <div style={{ fontSize: 32, color: "#bdbdbd", opacity: 0.5 }}>
            <CalendarOutlined />
          </div>
        </div>

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
            <div style={{ fontSize: 13, color: "#555", marginBottom: 6, fontWeight: 700 }}>
              Paid
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#16a34a" }}>{stats.paid}</div>
          </div>
          <div style={{ fontSize: 32, color: "#bdbdbd", opacity: 0.5 }}>
            <CheckOutlined />
          </div>
        </div>

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
            <div style={{ fontSize: 13, color: "#555", marginBottom: 6, fontWeight: 700 }}>
              Unpaid
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#dc2626" }}>{stats.unpaid}</div>
          </div>
          <div style={{ fontSize: 32, color: "#bdbdbd", opacity: 0.5 }}>
            <DeleteOutlined />
          </div>
        </div>

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
            <div style={{ fontSize: 13, color: "#555", marginBottom: 6, fontWeight: 700 }}>
              Overdue
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#d97706" }}>{stats.overdue}</div>
          </div>
          <div style={{ fontSize: 32, color: "#bdbdbd", opacity: 0.5 }}>
            <FilterOutlined />
          </div>
        </div>
      </div>

      {/* ── MAIN TABLE CARD ── */}
      <div style={{ paddingTop: "20px" }}>
        <Card
          variant="borderless"
          styles={{ body: { padding: 0 } }}
          style={{ borderRadius: 16 }}
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
              placeholder="Search by name, number..."
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

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: 10 }}>
              {/* <Button
                icon={<DownloadOutlined />}
                style={{ height: 42, borderRadius: 10 }}
              >
                Export
              </Button> */}
              <Button
                type="primary"
                icon={<PlusOutlined />}
                style={{ height: 42, borderRadius: 10 }}
                onClick={() => setGenerateModalOpen(true)}
              >
                Generate
              </Button>
            </div>
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
              {/* Month filter */}
              <Select
                value={selectedMonth}
                onChange={(v) => {
                  setSelectedMonth(v);
                  setPage(1);
                }}
                options={MONTH_OPTIONS}
                style={{ width: 170, height: 42 }}
                suffixIcon={<CalendarOutlined style={{ color: "#9ca3af" }} />}
              />

              {/* Status filter */}
              <Select
                value={selectedStatus}
                onChange={(v) => {
                  setSelectedStatus(v);
                  setPage(1);
                }}
                options={STATUS_OPTIONS}
                style={{ width: 170, height: 42 }}
                suffixIcon={<FilterOutlined style={{ color: "#9ca3af" }} />}
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
            <Table<BillRow>
              columns={columns}
              dataSource={paginatedRows}
              scroll={{ x: 1400 }}
              rowKey="key"
              size="middle"
              pagination={{
                ...buildEnergyUsageTablePagination({
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

      {/* Generate Bills Modal */}
      <GenerateBillsModal
        open={generateModalOpen}
        onCancel={() => setGenerateModalOpen(false)}
        onGenerate={handleGenerateBills}
      />

      <PDFPreviewOverlay
        open={previewOpen}
        pdfUrl={pdfUrl}
        title="Exported_Bills.pdf"
        onClose={() => {
          setPreviewOpen(false);
          if (pdfUrl) {
            URL.revokeObjectURL(pdfUrl);
          }
        }}
      />
      <div style={{ position: "fixed", left: "-99999px", top: 0 }}>
        {BILLS.length > 0 && (
          <InvoiceTemplate
            invoiceId="billpage-export-pdf"
            client={{
              id: BILLS[0].clientId,
              name: BILLS[0].clientName,
              phoneNumber: "077 999 316",
              installDate: "",
              lastDate: "",
              oldReading: BILLS[0].oldReading,
              newReading: BILLS[0].newReading,
              usage: BILLS[0].usage,
              total: BILLS[0].total,
              status: "Active",
              histories: [],
            } as any}
            history={{
              key: BILLS[0].id,
              no: BILLS[0].id,
              dateRange: BILLS[0].monthLabel,
              oldReading: BILLS[0].oldReading,
              newReading: BILLS[0].newReading,
              usage: BILLS[0].usage,
              total: BILLS[0].total,
              status: BILLS[0].status,
            } as any}
          />
        )}
        {BILLS.map((row) => (
          <InvoiceTemplate
            key={row.id}
            invoiceId={`invoice-pdf-${row.id}`}
            client={{
              id: row.clientId,
              name: row.clientName,
              phoneNumber: "077 999 316",
              installDate: "",
              lastDate: "",
              oldReading: row.oldReading,
              newReading: row.newReading,
              usage: row.usage,
              total: row.total,
              status: "Active",
              histories: [],
            } as any}
            history={{
              key: row.id,
              no: row.id,
              dateRange: row.monthLabel,
              oldReading: row.oldReading,
              newReading: row.newReading,
              usage: row.usage,
              total: row.total,
              status: row.status,
            } as any}
          />
        ))}
      </div>

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
          color: #6b7280;
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

export default BillPage;
import {
  DeleteOutlined,
  EditOutlined,
  LockOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  App,
  Badge,
  Button,
  Card,
  Checkbox,
  Dropdown,
  Input,
  Modal,
  Table,
  Tag,
  Tooltip,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

// ─── Types ────────────────────────────────────────────────────────────────────

export type PermissionAction = "view" | "create" | "edit" | "delete";

export interface ModulePermission {
  module: string;
  moduleLabel: string;
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
}

export interface RoleRow {
  key: string;
  id: number;
  name: string;
  nameKh: string;
  description: string;
  userCount: number;
  permissions: ModulePermission[];
  createdAt: string;
  status: "Active" | "Inactive";
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const DEFAULT_MODULES: Omit<ModulePermission, "view" | "create" | "edit" | "delete">[] = [
  { module: "dashboard", moduleLabel: "ផ្ទាំងគ្រប់គ្រង" },
  { module: "clients", moduleLabel: "អតិថិជន" },
  { module: "users", moduleLabel: "អ្នកប្រើប្រាស់" },
  { module: "billing", moduleLabel: "​វិក្កយបត្រ" },
  { module: "reports", moduleLabel: "របាយការណ៍" },
  { module: "settings", moduleLabel: "ការកំណត់" },
];

const makePerms = (all: boolean, overrides: Partial<Record<string, Partial<Record<PermissionAction, boolean>>>> = {}): ModulePermission[] =>
  DEFAULT_MODULES.map(({ module, moduleLabel }) => ({
    module,
    moduleLabel,
    view: overrides[module]?.view ?? all,
    create: overrides[module]?.create ?? all,
    edit: overrides[module]?.edit ?? all,
    delete: overrides[module]?.delete ?? all,
  }));

const ROLES: RoleRow[] = [
  {
    key: "1",
    id: 1,
    name: "Super Admin",
    nameKh: "អ្នកគ្រប់គ្រងកំពូល",
    description: "អ្នកមានសិទ្ធិពេញលេញក្នុងប្រព័ន្ធទាំងមូល",
    userCount: 1,
    createdAt: "Wed, 09 Feb 2022",
    status: "Active",
    permissions: makePerms(true),
  },
  {
    key: "2",
    id: 2,
    name: "Admin",
    nameKh: "អ្នកគ្រប់គ្រង",
    description: "គ្រប់គ្រងអតិថិជន និង​វិក្កយបត្រ តែគ្មានសិទ្ធិលុបអ្នកប្រើ",
    userCount: 3,
    createdAt: "Mon, 14 Mar 2022",
    status: "Active",
    permissions: makePerms(true, {
      users: { view: true, create: false, edit: false, delete: false },
      settings: { view: true, create: false, edit: false, delete: false },
    }),
  },
  {
    key: "3",
    id: 3,
    name: "Staff",
    nameKh: "បុគ្គលិក",
    description: "មើល និងបង្កើតទិន្នន័យប៉ុណ្ណោះ",
    userCount: 8,
    createdAt: "Fri, 02 Jun 2023",
    status: "Active",
    permissions: makePerms(false, {
      dashboard: { view: true, create: false, edit: false, delete: false },
      clients: { view: true, create: true, edit: false, delete: false },
      billing: { view: true, create: true, edit: false, delete: false },
      reports: { view: true, create: false, edit: false, delete: false },
    }),
  },
  {
    key: "4",
    id: 4,
    name: "Viewer",
    nameKh: "អ្នកមើល",
    description: "មើលទិន្នន័យតែប៉ុណ្ណោះ មិនអាចផ្លាស់ប្តូរអ្វីបាន",
    userCount: 5,
    createdAt: "Tue, 11 Jan 2023",
    status: "Inactive",
    permissions: makePerms(false, {
      dashboard: { view: true, create: false, edit: false, delete: false },
      clients: { view: true, create: false, edit: false, delete: false },
      reports: { view: true, create: false, edit: false, delete: false },
    }),
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ROLE_COLOR: Record<string, { bg: string; color: string; border: string }> = {
  "Super Admin": { bg: "#eff2ff", color: "#4f74e8", border: "#c7d2fe" },
  Admin:         { bg: "#f5f3ff", color: "#7c3aed", border: "#ddd6fe" },
  Staff:         { bg: "#ecfeff", color: "#0891b2", border: "#a5f3fc" },
  Viewer:        { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" },
};

const ACTION_LABELS: Record<PermissionAction, string> = {
  view: "មើល",
  create: "បង្កើត",
  edit: "កែប្រែ",
  delete: "លុប",
};

const ACTION_COLORS: Record<PermissionAction, string> = {
  view: "#4f74e8",
  create: "#16a34a",
  edit: "#d97706",
  delete: "#dc2626",
};

function countGranted(perms: ModulePermission[]): number {
  return perms.reduce(
    (sum, p) =>
      sum +
      (p.view ? 1 : 0) +
      (p.create ? 1 : 0) +
      (p.edit ? 1 : 0) +
      (p.delete ? 1 : 0),
    0
  );
}

// ─── Permission Detail Modal ──────────────────────────────────────────────────

function PermissionDetailModal({
  role,
  open,
  onClose,
}: {
  role: RoleRow | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!role) return null;

  const actions: PermissionAction[] = ["view", "create", "edit", "delete"];

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <LockOutlined style={{ color: "#4f74e8" }} />
          <span>
            សិទ្ធិអនុញ្ញាត —{" "}
            <span style={{ color: "#4f74e8" }}>{role.nameKh}</span>
          </span>
        </div>
      }
      width={660}
      centered
      styles={{ body: { padding: "16px 0 0" } }}
    >
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 13,
          }}
        >
          <thead>
            <tr style={{ background: "#fafbfc" }}>
              <th
                style={{
                  padding: "10px 16px",
                  textAlign: "left",
                  color: "#4f74e8",
                  fontWeight: 700,
                  borderBottom: "1px solid #eef2f7",
                  minWidth: 160,
                }}
              >
                ម៉ូឌុល
              </th>
              {actions.map((a) => (
                <th
                  key={a}
                  style={{
                    padding: "10px 16px",
                    textAlign: "center",
                    color: ACTION_COLORS[a],
                    fontWeight: 700,
                    borderBottom: "1px solid #eef2f7",
                    width: 90,
                  }}
                >
                  {ACTION_LABELS[a]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {role.permissions.map((perm, i) => (
              <tr
                key={perm.module}
                style={{
                  background: i % 2 === 0 ? "#fafafa" : "#ffffff",
                }}
              >
                <td
                  style={{
                    padding: "10px 16px",
                    color: "#374151",
                    fontWeight: 600,
                    borderBottom: "1px solid #f3f4f6",
                  }}
                >
                  {perm.moduleLabel}
                </td>
                {actions.map((a) => (
                  <td
                    key={a}
                    style={{
                      padding: "10px 16px",
                      textAlign: "center",
                      borderBottom: "1px solid #f3f4f6",
                    }}
                  >
                    <Checkbox
                      checked={perm[a]}
                      disabled
                      style={{ pointerEvents: "none" }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        style={{
          padding: "12px 16px",
          borderTop: "1px solid #f1f5f9",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button onClick={onClose}>បិទ</Button>
      </div>
    </Modal>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

function PermissionPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [detailRole, setDetailRole] = useState<RoleRow | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const { modal } = App.useApp();

  const filteredRows = useMemo(() => {
    if (!debouncedSearch.trim()) return ROLES;
    const kw = debouncedSearch.toLowerCase();
    return ROLES.filter(
      (r) =>
        r.name.toLowerCase().includes(kw) ||
        r.nameKh.includes(kw) ||
        r.description.includes(kw)
    );
  }, [debouncedSearch]);

  const paginatedRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, page, pageSize]);

  const ACTIONS: PermissionAction[] = ["view", "create", "edit", "delete"];

  const columns: ColumnsType<RoleRow> = [
    {
      title: "ល.រ",
      dataIndex: "id",
      key: "id",
      width: 60,
      render: (v: number) => (
        <span style={{ color: "#6b7280", fontWeight: 500 }}>{v}</span>
      ),
    },

    {
      title: "តួនាទី",
      key: "role",
      width: 200,
      render: (_, record) => {
        const c = ROLE_COLOR[record.name] ?? ROLE_COLOR["Viewer"];
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Tag
              style={{
                borderRadius: 999,
                paddingInline: 10,
                height: 26,
                display: "inline-flex",
                alignItems: "center",
                fontWeight: 700,
                fontSize: 12,
                background: c.bg,
                color: c.color,
                border: `1.5px solid ${c.border}`,
                width: "fit-content",
              }}
            >
              {record.name}
            </Tag>
            <span style={{ color: "#374151", fontWeight: 600, fontSize: 13 }}>
              {record.nameKh}
            </span>
          </div>
        );
      },
    },

    {
      title: "ការពិពណ៌នា",
      dataIndex: "description",
      key: "description",
      width: 260,
      render: (v: string) => (
        <span style={{ color: "#6b7280", fontSize: 13 }}>{v}</span>
      ),
    },

    {
      title: "សិទ្ធិអនុញ្ញាត",
      key: "permissions",
      width: 240,
      render: (_, record) => {
        const total = DEFAULT_MODULES.length * 4;
        const granted = countGranted(record.permissions);
        return (
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {ACTIONS.map((a) => {
              const count = record.permissions.filter((p) => p[a]).length;
              return (
                <Tooltip
                  key={a}
                  title={`${ACTION_LABELS[a]}: ${count}/${DEFAULT_MODULES.length} ម៉ូឌុល`}
                >
                  <Tag
                    style={{
                      borderRadius: 6,
                      paddingInline: 7,
                      height: 22,
                      display: "inline-flex",
                      alignItems: "center",
                      fontSize: 11,
                      fontWeight: 600,
                      background: count === 0 ? "#f3f4f6" : `${ACTION_COLORS[a]}15`,
                      color: count === 0 ? "#9ca3af" : ACTION_COLORS[a],
                      border: `1px solid ${count === 0 ? "#e5e7eb" : ACTION_COLORS[a] + "40"}`,
                      cursor: "default",
                    }}
                  >
                    {ACTION_LABELS[a]} {count}/{DEFAULT_MODULES.length}
                  </Tag>
                </Tooltip>
              );
            })}
            <div
              style={{
                width: "100%",
                marginTop: 4,
                height: 4,
                background: "#f3f4f6",
                borderRadius: 99,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${(granted / total) * 100}%`,
                  background: "linear-gradient(90deg, #4f74e8, #7c3aed)",
                  borderRadius: 99,
                  transition: "width 0.3s",
                }}
              />
            </div>
          </div>
        );
      },
    },

    {
      title: "អ្នកប្រើ",
      dataIndex: "userCount",
      key: "userCount",
      width: 90,
      align: "center",
      render: (v: number) => (
        <Badge
          count={v}
          style={{
            background: "#eff2ff",
            color: "#4f74e8",
            fontWeight: 700,
            boxShadow: "none",
            border: "1.5px solid #c7d2fe",
          }}
          showZero
        />
      ),
    },

    {
      title: "កាលបរិច្ឆេទ",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 160,
      render: (v: string) => <span style={{ color: "#6b7280" }}>{v}</span>,
    },

    {
      title: "ស្ថានភាព",
      dataIndex: "status",
      key: "status",
      width: 110,
      render: (v: RoleRow["status"]) =>
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
            សកម្ម
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
            អសកម្ម
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
                icon: <LockOutlined />,
                label: "មើលសិទ្ធិ",
              },
              {
                key: "update",
                icon: <EditOutlined />,
                label: "កែប្រែ",
              },
              { type: "divider" },
              {
                key: "delete",
                icon: <DeleteOutlined />,
                label: "លុប",
                danger: true,
              },
            ],
            onClick: ({ key }) => {
              if (key === "view") {
                setDetailRole(record);
                setDetailOpen(true);
              }
              if (key === "update") {
                console.log("edit", record);
              }
              if (key === "delete") {
                modal.confirm({
                  title: "បញ្ជាក់ការលុប",
                  content: (
                    <span>
                      តើអ្នកពិតជាចង់លុបតួនាទី{" "}
                      <strong>{record.nameKh}</strong> មែនទេ?
                    </span>
                  ),
                  okText: "លុប",
                  cancelText: "បោះបង់",
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
    <div style={{ background: "#f6f8fb", minHeight: "100vh" }}>
      <Card variant="borderless" styles={{ body: { padding: 0 } }}>
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
            prefix={<SearchOutlined style={{ color: "#9ca3af" }} />}
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
            onClick={() => console.log("create role")}
          >
            បង្កើតថ្មី
          </Button>
        </div>

        {/* TABLE */}
        <div style={{ padding: "8px 16px 16px" }}>
          <Table<RoleRow>
            columns={columns}
            dataSource={paginatedRows}
            scroll={{ x: 1200 }}
            pagination={{
              current: page,
              pageSize,
              total: filteredRows.length,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20"],
              showTotal: (total) => `សរុប ${total} តួនាទី`,
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

      {/* Permission Detail Modal */}
      <PermissionDetailModal
        role={detailRole}
        open={detailOpen}
        onClose={() => {
          setDetailOpen(false);
          setDetailRole(null);
        }}
      />

      {/* LOCAL STYLES */}
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
      `}</style>
    </div>
  );
}

export default PermissionPage;
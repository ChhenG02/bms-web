/**
 * EnergyUsagePage.tsx
 *
 * Energy usage report page (​វិក្កយបត្រប្រើប្រាស់ថាមពល) for PATech – Pisnuk AutoTech.
 *
 * HOW TO CONNECT TO BACKEND:
 *   - Replace each constant in the "STATIC DATA" section with your API call.
 *   - e.g. const { data: FILTER_TABS } = useQuery(['filterTabs'], fetchFilterTabs)
 *   - Table rows: replace BILLING_ROWS with your paginated API response.
 *   - Stat cards: replace STAT_CARDS with computed values from your API.
 *   - Chart: replace MONTHLY_ENERGY with time-series data from your API.
 *
 * Dependencies already in project:
 *   antd, @ant-design/icons, echarts, echarts-for-react
 */

import {
  DollarOutlined,
  SearchOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { Card, Checkbox, DatePicker, Input, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import ReactECharts from "echarts-for-react";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { CLIENTS, type BillStatus } from "../../data/clientData";
import { buildEnergyUsageTablePagination } from "../../utils/pagination";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface FilterTab {
  key: string;
  label: string;
  color: string; // active background
}

interface StatCard {
  id: string;
  label: string;
  value: string;
  accent: string;
  borderColor: string;
  icon: React.ReactNode;
}

interface MonthlyPoint {
  month: string;
  kwh: number;
}

interface BillingRow {
  key: string;
  id: string;

  clientCode: string;
  meterCode: string;

  name: string;
  gender: string;

  phoneNumber: string;

  dateRange: string;

  oldReading: number;
  newReading: number;

  usage: string;
  total: string;

  status: BillStatus;
}

// ─────────────────────────────────────────────────────────────────────────────
// STATIC DATA  ← swap each constant for your API / useQuery call later
// ─────────────────────────────────────────────────────────────────────────────

/** Filter tabs shown at the top (e.g. period selectors) */
const FILTER_TABS: FilterTab[] = [
  { key: "today", label: "ប្រចាំថ្ងៃនេះ", color: "#4f74e8" },
  { key: "week", label: "ប្រចាំសប្តាហ៍នេះ", color: "#4f74e8" },
  { key: "month", label: "ប្រចាំខែ", color: "#4f74e8" },
  { key: "year", label: "ប្រចាំឆ្នាំ", color: "#4f74e8" },
];

/** Stat summary cards */
const STAT_CARDS: StatCard[] = [
  {
    id: "total_energy",
    label: "ថាមពលប្រើប្រាស់សរុប",
    value: "1500kwh",
    accent: "#e53935",
    borderColor: "#4f74e8",
    icon: <ThunderboltOutlined />,
  },
  {
    id: "monthly_cost",
    label: "គិតជាសាច់ប្រាក់",
    value: "$1,203,000.00",
    accent: "#e53935",
    borderColor: "#00bcd4",
    icon: <DollarOutlined />,
  },
];

/** Monthly energy for the line chart */
const MONTHLY_ENERGY: MonthlyPoint[] = [
  { month: "Jan", kwh: 15 },
  { month: "Feb", kwh: 100 },
  { month: "Mar", kwh: 80 },
  { month: "Apr", kwh: 90 },
  { month: "May", kwh: 120 },
  { month: "Jun", kwh: 200 },
  { month: "Jul", kwh: 100 },
  { month: "Aug", kwh: 118 },
  { month: "Sep", kwh: 140 },
  { month: "Oct", kwh: 135 },
  { month: "Nov", kwh: 152 },
  { month: "Dec", kwh: -5 },
];
const BILLING_ROWS: BillingRow[] = CLIENTS.flatMap((client) =>
  client.histories.map((history) => ({
    key: `${client.id}-${history.key}`,
    id: history.no,

    clientCode: client.clientCode,
    meterCode: client.meterCode,

    name: client.name,
    gender: client.gender,

    phoneNumber: client.phoneNumber,

    dateRange: history.dateRange,

    oldReading: history.oldReading,
    newReading: history.newReading,

    usage: history.usage,
    total: history.total,

    status: history.status,
  })),
);

// ─────────────────────────────────────────────────────────────────────────────
// CHART OPTION BUILDER
// ─────────────────────────────────────────────────────────────────────────────

function buildLineChartOption(data: MonthlyPoint[]) {
  return {
    tooltip: {
      trigger: "axis",
      formatter: (params: any[]) => `${params[0].name}: ${params[0].value} kWh`,
    },
    grid: { left: 48, right: 16, top: 16, bottom: 32 },
    xAxis: {
      type: "category",
      data: data.map((d) => d.month),
      axisLine: { lineStyle: { color: "#e0e0e0" } },
      axisTick: { show: false },
      axisLabel: { color: "#888", fontSize: 12 },
      boundaryGap: false,
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: "#f0f0f0" } },
      axisLabel: { color: "#888", fontSize: 12 },
    },
    series: [
      {
        data: data.map((d) => d.kwh),
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 7,
        lineStyle: { color: "#4f74e8", width: 2.5 },
        itemStyle: { color: "#4f74e8", borderColor: "#fff", borderWidth: 2 },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(79,116,232,0.22)" },
              { offset: 1, color: "rgba(79,116,232,0)" },
            ],
          },
        },
      },
    ],
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// TABLE COLUMNS
// ─────────────────────────────────────────────────────────────────────────────

const BILLING_COLUMNS: ColumnsType<BillingRow> = [
  {
    title: "ល.រ",
    dataIndex: "id",
    key: "id",
    width: 60,
    render: (v) => (
      <span style={{ color: "#6b7280", fontWeight: 500 }}>{v}</span>
    ),
  },
  {
    title: "កាលបរិច្ឆេទ",
    dataIndex: "dateRange",
    key: "dateRange",
    render: (v) => (
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          color: "#374151",
        }}
      >
        {v}
      </span>
    ),
  },
  {
    title: "លេខកុងទ័រចាស់",
    dataIndex: "oldReading",
    key: "oldReading",
    width: 160,
    render: (v) => <span style={{ color: "#374151" }}>{v}</span>,
  },
  {
    title: "លេខកុងទ័រថ្មី",
    dataIndex: "newReading",
    key: "newReading",
    width: 140,
    render: (v) => <span style={{ color: "#374151" }}>{v}</span>,
  },
  {
    title: "ទំហំប្រើប្រាស់",
    dataIndex: "usage",
    key: "usage",
    width: 130,
    render: (v) => <span style={{ color: "#374151" }}>{v}</span>,
  },
  {
    title: "គិតជាទឹកប្រាក់",
    dataIndex: "total",
    key: "total",
    width: 150,
    render: (v) => <span style={{ color: "#374151" }}>{v}</span>,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function EnergyUsagePage() {
  const [activeTab, setActiveTab] = useState<string>(FILTER_TABS[0].key);
  const [includeHistory, setIncludeHistory] = useState(false);
  const [search, setSearch] = useState("");

  const [debouncedSearch] = useDebounce(search, 300);
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);

  const [page, setPage] = useState(1);

  const [pageSize, setPageSize] = useState(5);
  const filteredRows = useMemo(() => {
    if (!debouncedSearch.trim()) {
      return BILLING_ROWS;
    }

    const keyword = debouncedSearch.toLowerCase();

    return BILLING_ROWS.filter((row) => {
      return (
        row.id.toLowerCase().includes(keyword) ||
        row.dateRange.toLowerCase().includes(keyword) ||
        row.total.toLowerCase().includes(keyword)
      );
    });
  }, [debouncedSearch]);
  const paginatedRows = useMemo(() => {
    const start = (page - 1) * pageSize;

    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, page, pageSize]);

  return (
    <div
      style={{
        background: "#f6f8fb",
        minHeight: "100vh",
        paddingBottom: "24",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      {/* ── FILTER TABS ─────────────────────────────────────────────── */}
      <Card
        variant="borderless"
        style={{
          borderRadius: 14,
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}
        styles={{
          body: {
            padding: 20,
          },
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 18,
          }}
        >
          {/* Tabs */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                color: "#374151",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              របាយការណ៍លឿន៖
            </span>

            {FILTER_TABS.map((tab) => (
              <Tag
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  cursor: "pointer",
                  borderRadius: 8,
                  padding: "6px 14px",
                  fontWeight: 600,
                  fontSize: 13,
                  border: "none",
                  background: activeTab === tab.key ? tab.color : "#f3f4f6",
                  color: activeTab === tab.key ? "#fff" : "#6b7280",
                  transition: "all 0.2s",
                }}
              >
                {tab.label}
              </Tag>
            ))}
          </div>

          {/* Checkbox */}
          <Checkbox
            checked={includeHistory}
            onChange={(e) => setIncludeHistory(e.target.checked)}
            style={{
              color: "#374151",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            ជ្រើសរើសកាលបរិច្ឆេទ
          </Checkbox>
        </div>

        {/* Filter Section */}
        {includeHistory && (
          <div
            style={{
              borderTop: "1px solid #f0f0f0",
              paddingTop: 18,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 18,
            }}
          >
            {/* Client */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label
                style={{
                  fontSize: 12,
                  color: "#6b7280",
                  fontWeight: 600,
                }}
              >
                ឈ្មោះអតិថិជន :
              </label>

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
                  width: "100%",
                  height: 40,
                  borderRadius: 10,
                  background: "#f9fafb",
                  borderColor: "#e5e7eb",
                }}
              />
            </div>

            {/* Start date */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label
                style={{
                  fontSize: 12,
                  color: "#6b7280",
                  fontWeight: 600,
                }}
              >
                ចាប់ពីថ្ងៃទី :
              </label>

              <DatePicker
                value={startDate}
                onChange={setStartDate}
                format="DD/MM/YYYY"
                placeholder="dd/mm/yyyy"
                size="large"
                style={{ width: "100%" }}
                disabledDate={(current) =>
                  endDate && current && current.isAfter(endDate, "day")
                }
              />
            </div>

            {/* End date */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label
                style={{
                  fontSize: 12,
                  color: "#6b7280",
                  fontWeight: 600,
                }}
              >
                រហូតដល់ថ្ងៃទី :
              </label>

              <DatePicker
                value={endDate}
                onChange={setEndDate}
                format="DD/MM/YYYY"
                placeholder="dd/mm/yyyy"
                size="large"
                style={{ width: "100%" }}
                disabledDate={(current) =>
                  startDate && current && current.isBefore(startDate, "day")
                }
              />
            </div>
          </div>
        )}
      </Card>

      {/* ── STAT CARDS ──────────────────────────────────────────────── */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {STAT_CARDS.map((card) => (
          <div
            key={card.id}
            style={{
              background: "#fff",
              borderRadius: 10,
              borderLeft: `5px solid ${card.borderColor}`,
              padding: "18px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              flex: "1 1 220px",
              minWidth: 200,
              maxWidth: 340,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 13,
                  color: "#555",
                  marginBottom: 6,
                  fontWeight: 600,
                }}
              >
                {card.label}
              </div>
              <div
                style={{ fontSize: 22, fontWeight: 800, color: card.accent }}
              >
                {card.value}
              </div>
            </div>
            <div style={{ fontSize: 30, color: "#d1d5db" }}>{card.icon}</div>
          </div>
        ))}
      </div>

      {/* ── LINE CHART ──────────────────────────────────────────────── */}
      <Card
        title={
          <span style={{ fontWeight: 700, fontSize: 16, color: "#374151" }}>
            ទិន្នន័យសង្ខេបជាក្រាប
          </span>
        }
        variant="borderless"
        style={{
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
        styles={{ body: { padding: "8px 16px 20px" } }}
      >
        <ReactECharts
          option={buildLineChartOption(MONTHLY_ENERGY)}
          style={{ height: 300 }}
          notMerge
        />
      </Card>

      {/* ── BILLING TABLE ───────────────────────────────────────────── */}
      <Card
        title={
          <span style={{ fontWeight: 700, fontSize: 16, color: "#374151" }}>
            ទិន្នន័យលំអិតជាតារាង
          </span>
        }
        variant="borderless"
        style={{
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
        styles={{
          body: {
            padding: "8px 16px 16px",
          },
        }}
      >
        <Table<BillingRow>
          columns={BILLING_COLUMNS}
          dataSource={paginatedRows}
          pagination={{
            ...buildEnergyUsageTablePagination({
              page,
              pageSize,
              total: filteredRows.length,
            }),
            size: "small",
          }}
          onChange={(pagination) => {
            setPage(pagination.current || 1);
            setPageSize(pagination.pageSize || 5);
          }}
          rowKey="key"
          size="middle"
          scroll={{ x: 800 }}
        />
      </Card>

      {/* ── TABLE STYLES ────────────────────────────────────────────── */}
      <style>{`
        .ant-table-thead > tr > th {
          background: #fafbfc !important;
          color: #4f74e8 !important;
          font-weight: 700 !important;
          font-size: 13px !important;
          border-bottom: 1px solid #eef2f7 !important;
        }
        .ant-table-tbody > tr:nth-child(odd) > td {
          background: #fafafa;
        }
        .ant-table-tbody > tr:nth-child(even) > td {
          background: #ffffff;
        }
        .ant-table-tbody > tr:hover > td {
          background: #f0f5ff !important;
        }
        .ant-table-tbody > tr > td {
          border-bottom: 1px solid #f3f4f6 !important;
          font-size: 13px;
          padding-top: 11px !important;
          padding-bottom: 11px !important;
        }
      `}</style>
    </div>
  );
}

export default EnergyUsagePage;

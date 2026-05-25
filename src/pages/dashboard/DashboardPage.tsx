/**
 * DashboardPage.tsx
 *
 * Energy management dashboard (ផ្ទាំងគ្រប់គ្រង) for PATech – Pisnuk AutoTech.
 *
 * Static data is isolated in the DATA section at the top so you can
 * swap each constant for an API call (useQuery, SWR, fetch, etc.) later
 * without touching any rendering logic.
 *
 * Dependencies:
 *   npm install echarts echarts-for-react
 *   (antd, @ant-design/icons already in project)
 */

import {
  DollarOutlined,
  MoreOutlined,
  SettingOutlined,
  TeamOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
import ReactECharts from "echarts-for-react";

// ─────────────────────────────────────────────────────────────────────────────
// STATIC DATA  ← replace each constant with your API response later
// ─────────────────────────────────────────────────────────────────────────────

/** Stat cards shown at the top of the dashboard */
const STAT_CARDS = [
  {
    id: "total_energy",
    label: "ថាមពលប្រើប្រាស់សរុប", // Total energy consumption
    value: "1500kwh",
    accent: "#e53935",
    border: "#e53935",
    icon: <ThunderboltOutlined />,
    iconColor: "#bdbdbd",
  },
  {
    id: "total_clients",
    label: "ចំនួនអតិថិជន  ", // Total clients
    value: "5",
    accent: "#00c853",
    border: "#00c853",
    icon: <TeamOutlined />,
    iconColor: "#bdbdbd",
  },
  {
    id: "monthly_cost",
    label: "គិតជាសាច់ប្រាក់", // Monetary value
    value: "$1,203,000.00",
    accent: "#ffa000",
    border: "#00bcd4",
    icon: <DollarOutlined />,
    iconColor: "#bdbdbd",
  },
  {
    id: "pending_approvals",
    label: "ចំនួនអ្នកប្រើប្រាស់", // Number of users
    value: "1",
    accent: "#ffa000",
    border: "#ffa000",
    icon: <SettingOutlined />,
    iconColor: "#bdbdbd",
  },
];

/** Monthly energy consumption data for the line chart (Jan–Dec) */
const MONTHLY_ENERGY = [
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
  { month: "Dec", kwh: -5 }, // negative shown in screenshot
];

/** Customer / client distribution for the donut chart */
const CLIENT_DISTRIBUTION = [
  { name: "ភ្នំពេញ", value: 40, color: "#4f74e8" }, // Phnom Penh – blue
  { name: "សៀមរាប", value: 25, color: "#41c98f" }, // Siem Reap – green
  { name: "បាត់ដំបង", value: 20, color: "#53c3df" }, // Battambang – cyan
  { name: "ព្រះសីហនុ 1", value: 15, color: "#bdbdbd" }, // Sihanoukville – grey
  { name: "ព្រះសីហនុ 2", value: 14.5, color: "#c4c4c4" }, // different value
  { name: "ព្រះសីហនុ 3", value: 14, color: "#cacaca" }, // different value
  { name: "ព្រះសីហនុ 4", value: 13.5, color: "#d0d0d0" }, // different value
  { name: "ព្រះសីហនុ 5", value: 13, color: "#d6d6d6" }, // different value
  { name: "ព្រះសីហនុ 6", value: 12.5, color: "#dcdcdc" }, // different value
  { name: "ព្រះសីហនុ 7", value: 12, color: "#e2e2e2" }, // different value
  { name: "ព្រះសីហនុ 8", value: 11.5, color: "#e8e8e8" }, // different value
  { name: "ព្រះសីហនុ 9", value: 11, color: "#eeeeee" }, // different value
  { name: "ព្រះសីហនុ 10", value: 10.5, color: "#f4f4f4" }, // different value
  { name: "ព្រះសីហនុ 11", value: 10, color: "#fafafa" }, // different value
  { name: "ព្រះសីហនុ 12", value: 9.5, color: "#e1e1e1" }, // different value
  { name: "ព្រះសីហនុ 13", value: 9, color: "#d8d8d8" }, // different value
  { name: "ព្រះសីហនុ 14", value: 8.5, color: "#cfcfcf" }, // different value
  { name: "ព្រះសីហនុ 15", value: 8, color: "#c6c6c6" }, // different value
  { name: "ព្រះសីហនុ 16", value: 7.5, color: "#bdbdbd" }, // different value
];
// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  accent,
  border,
  icon,
  iconColor,
}: (typeof STAT_CARDS)[0]) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 5,
        borderLeft: `5px solid ${border}`,
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
          {label}
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: accent }}>
          {value}
        </div>
      </div>
      <div style={{ fontSize: 32, color: iconColor, opacity: 0.5 }}>{icon}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ECHART OPTIONS  (pure data → no JSX, easy to unit-test or move to a util)
// ─────────────────────────────────────────────────────────────────────────────

function buildLineChartOption(data: typeof MONTHLY_ENERGY) {
  return {
    tooltip: {
      trigger: "axis",
      formatter: (params: any[]) => {
        const p = params[0];
        return `${p.name}: ${p.value} kWh`;
      },
    },
    grid: { left: 40, right: 16, top: 16, bottom: 32 },
    xAxis: {
      type: "category",
      data: data.map((d) => d.month),
      axisLine: { lineStyle: { color: "#e0e0e0" } },
      axisTick: { show: false },
      axisLabel: { color: "#888", fontSize: 12 },
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
        smooth: false,
        symbol: "circle",
        symbolSize: 6,
        lineStyle: { color: "#4f74e8", width: 2.5 },
        itemStyle: { color: "#4f74e8" },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(79,116,232,0.18)" },
              { offset: 1, color: "rgba(79,116,232,0)" },
            ],
          },
        },
      },
    ],
  };
}

function buildDonutChartOption(data: typeof CLIENT_DISTRIBUTION) {
  return {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {d}%",

      confine: true,

      textStyle: {
        fontSize: 12,
      },

      extraCssText: `
        padding: 6px 10px;
        border-radius: 8px;
      `,
    },

    legend: {
      show: false,
    },

    series: [
      {
        type: "pie",

        radius: ["52%", "78%"],

        center: ["50%", "50%"],

        avoidLabelOverlap: false,

        selectedMode: false,

        label: {
          show: false,
        },

        labelLine: {
          show: false,
        },

        data: data.map((d) => ({
          name: d.name,
          value: d.value,

          itemStyle: {
            color: d.color,
          },
        })),
      },
    ],
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function DashboardPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* ── STAT CARDS ────────────────────────────────────────────────── */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {STAT_CARDS.map((card) => (
          <StatCard key={card.id} {...card} />
        ))}
      </div>

      {/* ── CHARTS ROW ────────────────────────────────────────────────── */}
      <div style={{ display: "flex", gap: 16, alignItems: "stretch" }}>
        {/* Line chart */}
        <Card
          style={{
            flex: 2,
            minWidth: 0,
            borderRadius: 12,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
          styles={{
            body: {
              padding: "16px 20px",
            },
          }}
          title={
            <span style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>
              ទំហំថាមពលដែលបានប្រើប្រាស់ប្រចាំខែ{" "}
              {/* Monthly energy usage chart */}
            </span>
          }
          extra={<MoreOutlined style={{ color: "#999", cursor: "pointer" }} />}
        >
          <ReactECharts
            option={buildLineChartOption(MONTHLY_ENERGY)}
            style={{ height: 320 }}
            notMerge
          />
        </Card>

        {/* Donut chart */}
        <Card
          style={{
            flex: 1,
            minWidth: 220,
            borderRadius: 12,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
          styles={{
            body: {
              padding: "16px 20px",
            },
          }}
          title={
            <span style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>
              របាយការណ៍តាមដានអតិថិជន {/* Customer distribution */}
            </span>
          }
        >
          <ReactECharts
            option={buildDonutChartOption(CLIENT_DISTRIBUTION)}
            style={{ height: 280 }}
            notMerge
          />

          {/* Legend */}
          <div
            style={{
              marginTop: 12,

              display: "flex",
              flexDirection: "column",

              gap: 6,

              maxHeight: 100,

              overflowY: "auto",

              paddingRight: 4,
            }}
          >
            {CLIENT_DISTRIBUTION.map((item) => (
              <div
                key={item.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 13,
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: item.color,
                    flexShrink: 0,
                  }}
                />
                <span style={{ flex: 1, color: "#555" }}>{item.name}</span>
                <strong style={{ color: "#333" }}>{item.value}%</strong>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default DashboardPage;

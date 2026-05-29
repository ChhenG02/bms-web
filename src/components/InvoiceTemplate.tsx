import Logo from "../assets/patech.png";

import type { BillHistory, ClientRow } from "../data/clientData";

type Props = {
  client: ClientRow;
  history?: BillHistory;
  invoiceId?: string;
};

const usageHistoryTable = [
  { date1: "16/07/19", kwh1: 513, date2: "15/08/19", kwh2: 394 },
  { date1: "16/09/19", kwh1: 386, date2: "15/10/18", kwh2: 533 },
  { date1: "16/11/18", kwh1: 356, date2: "15/12/18", kwh2: 476 },
  { date1: "16/01/19", kwh1: 450, date2: "16/02/19", kwh2: 420 },
  { date1: "15/03/19", kwh1: 390, date2: "16/04/19", kwh2: 326 },
  { date1: "15/05/19", kwh1: 353, date2: "16/06/19", kwh2: 477 },
];

const chartData = [
  { month: "Jul", kwh: 513 },
  { month: "Aug", kwh: 386 },
  { month: "Sep", kwh: 356 },
  { month: "Oct", kwh: 450 },
  { month: "Nov", kwh: 390 },
  { month: "Dec", kwh: 353 },
  { month: "Jan", kwh: 394 },
  { month: "Feb", kwh: 533 },
  { month: "Mar", kwh: 476 },
  { month: "Apr", kwh: 420 },
  { month: "May", kwh: 326 },
  { month: "Jun", kwh: 477 },
];

function UsageChart() {
  const W = 500;
  const H = 160;
  const padX = 40;
  const padY = 20;
  const max = 600;

  const pts = chartData.map((d, i) => {
    const x = padX + (i / (chartData.length - 1)) * (W - padX * 2);
    const y = H - padY - (d.kwh / max) * (H - padY * 2);
    return { x, y, kwh: d.kwh, month: d.month };
  });

  const polyline = pts.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div style={{ marginTop: 24 }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ display: "block" }}>
        {[0, 200, 400, 600].map((tick) => {
          const y = H - padY - (tick / max) * (H - padY * 2);
          return (
            <g key={tick}>
              <text x={padX - 8} y={y + 3} fontSize={10} fontWeight={600} fill="#4b5563" textAnchor="end">
                {tick}
              </text>
              <line x1={padX} x2={W - 12} y1={y} y2={y} stroke="#e5e7eb" strokeWidth={1} strokeDasharray="3,3" />
            </g>
          );
        })}
        
        <text x={padX - 8} y={12} fontSize={10} fontWeight={600} fill="#4b5563" textAnchor="end">kWh</text>

        {pts.map((p, i) => (
          <text key={i} x={p.x} y={H - 6} fontSize={9} fontWeight={600} fill="#4b5563" textAnchor="middle">
            {p.month}
          </text>
        ))}

        <polyline points={polyline} fill="none" stroke="#4f74e8" strokeWidth={2} />

        {pts.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={3.5} fill="#4f74e8" />
            <text x={p.x} y={p.y - 8} fontSize={9} fontWeight={600} fill="#4f74e8" textAnchor="middle">
              {p.kwh}
            </text>
          </g>
        ))}
        
        <line x1={padX} x2={padX} y1={8} y2={H - padY} stroke="#374151" strokeWidth={1} />
        <line x1={padX} x2={W - 12} y1={H - padY} y2={H - padY} stroke="#374151" strokeWidth={1} />
      </svg>
    </div>
  );
}

function ElectricityUsageHistory() {

  const RowCell = ({ children }: { children: React.ReactNode }) => (
    <div style={{ textAlign: "center", padding: "8px 0", borderBottom: "1px dashed #e5e7eb", fontWeight: 500, fontSize: 12, color: "#374151" }}>
      {children}
    </div>
  );

  return (
    <div style={{ borderRadius: 8, marginTop: 32, fontFamily: "'Noto Sans Khmer', sans-serif", background: "#fff" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ display: "inline-block", borderBottom: "2px solid #4f74e8", paddingBottom: 4 }}>
          <h3 style={{ color: "#4f74e8", fontSize: 18, fontWeight: 700, margin: 0, letterSpacing: 1 }}>
            ELECTRICITY USAGE HISTORY
          </h3>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 24 }}>
        {/* Left Table */}
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 6 }}>

          </div>
          {usageHistoryTable.map((r, i) => (
            <div key={`left-${i}`} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <RowCell>{r.date1}</RowCell>
              <RowCell>{r.kwh1} kWh</RowCell>
            </div>
          ))}
        </div>
        
        {/* Right Table */}
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 6 }}>
          </div>
          {usageHistoryTable.map((r, i) => (
            <div key={`right-${i}`} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <RowCell>{r.date2}</RowCell>
              <RowCell>{r.kwh2} kWh</RowCell>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 12, display: "flex", alignItems: "center" }}>
        <span style={{ fontWeight: 600, color: "#374151", fontSize: 13 }}>AVERAGE DAILY USAGE:</span>
        <div style={{ flex: 1, borderBottom: "1px dashed #e5e7eb", margin: "0 12px", position: "relative", top: 3 }}></div>
        <span style={{ fontWeight: 600, fontSize: 13, color: "#374151" }}>16 kWh</span>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ fontWeight: 600, color: "#374151", fontSize: 13 }}>AVERAGE MONTHLY USAGE:</span>
        <div style={{ flex: 1, borderBottom: "1px dashed #e5e7eb", margin: "0 12px", position: "relative", top: 3 }}></div>
        <span style={{ fontWeight: 600, fontSize: 13, color: "#374151" }}>19 kWh</span>
      </div>

      <UsageChart />
    </div>
  );
}

function InvoiceTemplate({
  client,
  history,
  invoiceId = "invoice-pdf",
}: Props) {
  const fallbackHistory: BillHistory = {
    key: `${client.id}-history-1`,
    no: "01",
    dateRange: `${client.installDate} - ${client.lastDate}`,
    oldReading: client.oldReading,
    newReading: client.newReading,
    usage: client.usage,
    total: client.total,
    status: "Unpaid",
  };

  const rows: BillHistory[] = history
    ? [history]
    : client.histories?.length > 0
      ? client.histories
      : [fallbackHistory];

  const grandTotal = rows.reduce((sum, row) => {
    const amount = Number(row.total.replace(/[^\d]/g, ""));
    return sum + amount;
  }, 0);

  const formattedGrandTotal = `${grandTotal.toLocaleString()}៛`;

  return (
    <div
      id={invoiceId}
      style={{
        background: "#fff",
        padding: "28px 32px",
        width: "794px",
        margin: "0 auto",
        fontFamily: "'Noto Sans Khmer', sans-serif",
        fontSize: 12,
        color: "#374151",
        boxSizing: "border-box",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 20,
        }}
      >
        <img
          src={Logo}
          alt="PATech logo"
          style={{
            width: 110,
            display: "block",
          }}
        />
      </div>

      {/* INFO */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          marginBottom: 24,
        }}
      >
        {/* ROW 1 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 32,
          }}
        >
          <div style={{ flex: 1 }}>
            <InfoRow label="Company" value="Pisnuk Auto Tech" />
          </div>

          <h2
            style={{
              color: "#4f74e8",
              margin: 0,
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 1,
              lineHeight: 1,
              minWidth: 180,
              textAlign: "right",
            }}
          >
            INVOICE
          </h2>
        </div>

        {/* ROW 2 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 32,
          }}
        >
          <div style={{ flex: 1 }}>
            <InfoRow
              label="Address"
              value="No.330, Phlov lum, Bonla S'et village, Sangkat Khmunh, Khan Sensok, Phnom Penh, Cambodia"
              multiline
            />
          </div>

          <div
            style={{
              minWidth: 180,
            }}
          >
            <RightInfoRow label="Client" value={client.name} />
          </div>
        </div>

        {/* ROW 3 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 32,
          }}
        >
          <div style={{ flex: 1 }}>
            <InfoRow label="Phone" value="077 999 316" />
          </div>

          <div
            style={{
              minWidth: 180,
            }}
          >
            <RightInfoRow label="Phone" value={client.phoneNumber} />
          </div>
        </div>
      </div>

      {/* TABLE */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #d1d5db",
          marginBottom: 28,
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#e0e5fa",
            }}
          >
            <th
              style={{
                ...th,
                width: 50,
              }}
            >
              No.
            </th>
            <th style={th}>Note</th>
            <th
              style={{
                ...th,
                width: 160,
              }}
            >
              Energy Usage
            </th>
            <th
              style={{
                ...th,
                width: 120,
              }}
            >
              Amount
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={`${client.id}-${index}`}>
              <td
                style={{
                  ...td,
                  textAlign: "center",
                }}
              >
                {row.no ?? String(index + 1).padStart(2, "0")}
              </td>
              <td style={td}>
                {`Pay for electricity used from ${row.dateRange}`}
              </td>
              <td
                style={{
                  ...td,
                }}
              >
                {row.usage}
              </td>
              <td
                style={{
                  ...td,
                  fontWeight: 600,
                }}
              >
                {row.total}
              </td>
            </tr>
          ))}

          {/* EMPTY ROW */}
          <tr
            style={{
              height: 28,
            }}
          >
            <td
              style={{
                ...td,
                height: 28,
              }}
              colSpan={4}
            />
          </tr>

          {/* TOTAL */}
          <tr
            style={{
              backgroundColor: "#f9fafb",
            }}
          >
            <td
              style={{
                ...td,
                borderRight: "none",
              }}
              colSpan={2}
            />
            <td
              style={{
                ...td,
                fontWeight: 700,
                backgroundColor: "#f3f4f6",
              }}
            >
              Total
            </td>
            <td
              style={{
                ...td,
                fontWeight: 700,
                backgroundColor: "#f3f4f6",
              }}
            >
              {formattedGrandTotal}
            </td>
          </tr>
        </tbody>
      </table>

      {/* USAGE HISTORY */}
      <ElectricityUsageHistory />

      {/* FOOTER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 32,
          marginBottom: 40,
          fontSize: 12,
        }}
      >
        <div>
          <span
            style={{
              fontWeight: 700,
            }}
          >
            Issued by:
          </span>{" "}
          <span>Pisnuk Auto Tech</span>
        </div>

        <div>
          <span
            style={{
              fontWeight: 700,
            }}
          >
            Client:
          </span>{" "}
          <span>{client.name}</span>
        </div>
      </div>

      {/* SIGNATURES */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 24,
        }}
      >
        <SignatureLine />
        <SignatureLine />
      </div>
    </div>
  );
}

/* COMPONENTS */

type InfoRowProps = {
  label: string;
  value: string;
  multiline?: boolean;
};

function InfoRow({ label, value, multiline = false }: InfoRowProps) {
  return (
    <div
      style={{
        maxWidth: multiline ? 400 : "100%",
        lineHeight: multiline ? 1.6 : 1.4,
      }}
    >
      <span
        style={{
          fontWeight: 700,
        }}
      >
        {label}:
      </span>{" "}
      <span>{value}</span>
    </div>
  );
}

function RightInfoRow({
  label,
  value,
}: InfoRowProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "90px auto",
        columnGap: 6,
        alignItems: "center",
        justifyContent: "end",
      }}
    >
      <span
        style={{
          fontWeight: 700,
          textAlign: "right",
        }}
      >
        {label}:
      </span>

      <span
        style={{
          textAlign: "right",
        }}
      >
        {value}
      </span>
    </div>
  );
}

function SignatureLine() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 6,
      }}
    >
      <span
        style={{
          fontWeight: 700,
          paddingBottom: 2,
        }}
      >
        Signature:
      </span>

      <span
        style={{
          display: "inline-block",
          width: 140,
          borderBottom: "1px solid #374151",
          height: 18,
        }}
      />
    </div>
  );
}

/* STYLES */

const th: React.CSSProperties = {
  border: "1px solid #d1d5db",
  padding: "6px 8px",
  textAlign: "left",
  fontWeight: 600,
  fontSize: 12,
};

const td: React.CSSProperties = {
  border: "1px solid #d1d5db",
  padding: "6px 8px",
  fontSize: 12,
};

export default InvoiceTemplate;
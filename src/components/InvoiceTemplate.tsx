import Logo from "../assets/patech.png";

import type { BillHistory, ClientRow } from "../data/clientData";

type Props = {
  client: ClientRow;
  history?: BillHistory;
  invoiceId?: string;
};

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

  // dynamic total
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
        padding: "32px 40px",
        width: "794px",
        margin: "0 auto",
        fontFamily: "'Noto Sans Khmer', sans-serif",
        fontSize: 13,
        color: "#374151",
        boxSizing: "border-box",
      }}
    >
      {/* ───────────────── HEADER ───────────────── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 24,
        }}
      >
        <img
          src={Logo}
          alt="PATech logo"
          style={{
            width: 130,
            display: "block",
          }}
        />
      </div>

      {/* ───────────────── INFO ───────────────── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 18,
          marginBottom: 28,
        }}
      >
        {/* ROW 1 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 40,
          }}
        >
          <div style={{ flex: 1 }}>
            <InfoRow label="ក្រុមហ៊ុន" value="ពិស្ណុ អូតូ ថេក ឯ.ក" />
          </div>

          <h2
            style={{
              color: "#4f74e8",
              margin: 0,
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 1,
              lineHeight: 1,
              minWidth: 220,
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
            gap: 40,
          }}
        >
          <div style={{ flex: 1 }}>
            <InfoRow
              label="អាសយដ្ឋាន"
              value="#330 ផ្លូវបេតុង ភូមិបន្លាស្អិត សង្កាត់ឃ្មួញ ខណ្ឌសែនសុខ រាជធានីភ្នំពេញ"
              multiline
            />
          </div>

          <div
            style={{
              minWidth: 220,
            }}
          >
            <RightInfoRow label="អតិថិជន" value={client.name} />
          </div>
        </div>

        {/* ROW 3 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 40,
          }}
        >
          <div style={{ flex: 1 }}>
            <InfoRow label="ទំនាក់ទំនង" value="077 999 316" />
          </div>

          <div
            style={{
              minWidth: 220,
            }}
          >
            <RightInfoRow label="ទំនាក់ទំនង" value={client.phoneNumber} />
          </div>
        </div>
      </div>

      {/* ───────────────── TABLE ───────────────── */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #d1d5db",
          marginBottom: 32,
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#c5cff5",
            }}
          >
            <th
              style={{
                ...th,
                width: 60,
              }}
            >
              ល.រ
            </th>

            <th style={th}>ពិពណ៌នា</th>

            <th
              style={{
                ...th,
                width: 170,
              }}
            >
              ទំហំអគ្គិសនីដែលប្រើប្រាស់
            </th>

            <th
              style={{
                ...th,
                width: 140,
              }}
            >
              ទឹកប្រាក់
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
                {`ទូទាត់សេវាអគ្គិសនីដែលបានប្រើប្រាស់ចាប់ពី ${row.dateRange}`}
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
          <tr>
            <td
              style={{
                ...td,
                height: 36,
              }}
              colSpan={4}
            />
          </tr>

          {/* TOTAL */}
          <tr>
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
              សរុប
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

      {/* ───────────────── FOOTER ───────────────── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 48,
          fontSize: 13,
        }}
      >
        <div>
          <span
            style={{
              fontWeight: 700,
            }}
          >
            ចេញដោយ:
          </span>{" "}
          <span>ពិស្ណុ អូតូ ថេក ឯ.ក</span>
        </div>

        <div>
          <span
            style={{
              fontWeight: 700,
            }}
          >
            អតិថិជន:
          </span>{" "}
          <span>{client.name}</span>
        </div>
      </div>

      {/* ───────────────── SIGNATURES ───────────────── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 32,
        }}
      >
        <SignatureLine />
        <SignatureLine />
      </div>
    </div>
  );
}

/* ───────────────── COMPONENTS ───────────────── */

type InfoRowProps = {
  label: string;
  value: string;
  multiline?: boolean;
};

function InfoRow({ label, value, multiline = false }: InfoRowProps) {
  return (
    <div
      style={{
        maxWidth: multiline ? 420 : "100%",
        lineHeight: multiline ? 1.7 : 1.5,
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
          "110px auto",
        columnGap: 8,
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
        gap: 8,
      }}
    >
      <span
        style={{
          fontWeight: 700,
          paddingBottom: 2,
        }}
      >
        ហត្ថលេខា:
      </span>

      <span
        style={{
          display: "inline-block",
          width: 150,
          borderBottom: "1.5px solid #374151",
          height: 20,
        }}
      />
    </div>
  );
}

/* ───────────────── STYLES ───────────────── */

const th: React.CSSProperties = {
  border: "1px solid #d1d5db",
  padding: "8px 10px",
  textAlign: "left",
  fontWeight: 700,
  fontSize: 13,
};

const td: React.CSSProperties = {
  border: "1px solid #d1d5db",
  padding: "8px 10px",
  fontSize: 13,
};

export default InvoiceTemplate;

import Logo from "../assets/patech.png";

type Props = {
  client: any;
};

function InvoiceTemplate({ client }: Props) {
  const rows =
    client.histories && client.histories.length > 0
      ? client.histories
      : [
          {
            no: "01",
            dateRange: `${client.installDate} - ${client.lastDate}`,
            usage: client.usage,
            total: client.total,
          },
        ];

  const grandTotal = rows[rows.length - 1]?.total ?? "";

  return (
    <div
      id="invoice-pdf"
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
      {/* ── TOP BAR: Logo left | INVOICE right ── */}
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
          style={{ width: 130, display: "block" }}
        />
        <h1
          style={{
            color: "#4f74e8",
            margin: 0,
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          INVOICE
        </h1>
      </div>

      {/* ── HEADER INFO ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        {/* Left – Company */}
        <div style={{ lineHeight: "2" }}>
          <div>
            <span style={{ fontWeight: 700 }}>ក្រុមហ៊ុន</span>
            {"៖ ពិស្ណុ អូតូ ថេក​ ឯ.ក"}
          </div>
          <div>
            <span style={{ fontWeight: 700 }}>អាសយដ្ឋាន</span>
            {"៖ #330 ផ្លូវបេតុង ភូមិបន្លាស្អិត សង្កាត់ឃ្មួញ ខណ្ឌសែនសុខ រាជធានីភ្នំពេញ"}
          </div>
          <div>
            <span style={{ fontWeight: 700 }}>នំនាក់នំនង</span>
            {"៖ 077 999 316"}
          </div>
        </div>

        {/* Right – Client */}
        <div style={{ lineHeight: "2", textAlign: "right" }}>
          <div>
            <span style={{ fontWeight: 700 }}>អតិថិជន</span>
            {"៖ " + client.name}
          </div>
          <div>
            <span style={{ fontWeight: 700 }}>នំនាក់នំនង</span>
            {"៖ 012 999 123"}
          </div>
        </div>
      </div>

      {/* ── TABLE ── */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #d1d5db",
          marginBottom: 32,
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#c5cff5" }}>
            <th style={{ ...th, width: 50 }}>លស</th>
            <th style={th}>ពិពណ៌នា</th>
            <th style={{ ...th, width: 160 }}>ចំនួនគិតដែលប្រើប្រាស់</th>
            <th style={{ ...th, width: 130 }}>ទឹកប្រាក់</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row: any, i: number) => (
            <tr key={i}>
              <td style={{ ...td, textAlign: "center" }}>
                {row.no ?? String(i + 1).padStart(2, "0")}
              </td>
              <td style={td}>
                {`ទូទាត់សេវាអគ្គិសនីដែលបានប្រើប្រាស់ចាប់ពី ${row.dateRange}`}
              </td>
              <td style={{ ...td, textAlign: "center" }}>{row.usage}</td>
              <td style={{ ...td, textAlign: "right" }}>{row.total}</td>
            </tr>
          ))}

          {/* Spacer row */}
          <tr>
            <td style={{ ...td, height: 32 }} colSpan={4}></td>
          </tr>

          {/* Total row */}
          <tr>
            <td style={{ ...td, borderRight: "none" }} colSpan={2}></td>
            <td
              style={{
                ...td,
                textAlign: "center",
                fontWeight: 700,
                backgroundColor: "#f3f4f6",
              }}
            >
              សរុប
            </td>
            <td
              style={{
                ...td,
                textAlign: "right",
                fontWeight: 700,
                backgroundColor: "#f3f4f6",
              }}
            >
              {grandTotal}
            </td>
          </tr>
        </tbody>
      </table>

      {/* ── FOOTER NAMES ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 48,
          fontSize: 13,
        }}
      >
        <div>
          <span style={{ fontWeight: 700 }}>តេវ្យរោម</span>
          {"៖ ក្រុមហ៊ុនពិស្នុកអ៊ីននឺនេត"}
        </div>
        <div>
          <span style={{ fontWeight: 700 }}>អតិថិជន</span>
          {"៖ " + client.name}
        </div>
      </div>

      {/* ── SIGNATURES ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontWeight: 700 }}>ហត្ថលេខា:</span>
          <span
            style={{
              display: "inline-block",
              width: 130,
              borderBottom: "1.5px solid #374151",
              marginLeft: 4,
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontWeight: 700 }}>ហត្ថលេខា:</span>
          <span
            style={{
              display: "inline-block",
              width: 130,
              borderBottom: "1.5px solid #374151",
              marginLeft: 4,
            }}
          />
        </div>
      </div>
    </div>
  );
}

// Shared cell styles
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
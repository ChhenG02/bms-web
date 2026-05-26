import {
  BankOutlined,
  CheckOutlined,
  DollarOutlined,
  GlobalOutlined,
  SettingOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Switch,
  Tag,
  Tooltip,
} from "antd";
import { useState } from "react";


// ─── Types ────────────────────────────────────────────────────────────────────

interface TariffTier {
  key: string;
  label: string;
  labelKh: string;
  rangeKh: string;
  priceRiel: number;
}

interface SettingsState {
  currency: "KHR" | "USD" | "BOTH";
  exchangeRate: number;
  tariffs: TariffTier[];
  vatEnabled: boolean;
  vatPercent: number;
  lateFeesEnabled: boolean;
  lateFeePercent: number;
  billDueDay: number;
  companyName: string;
  companyPhone: string;
  companyAddress: string;
  invoicePrefix: string;
  decimalPlaces: number;
}

// ─── Section Header Component ─────────────────────────────────────────────────

function SectionHeader({
  icon,
  title,
  subtitle,
  color = "#4f74e8",
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color?: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 20 }}>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: `${color}15`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color,
          fontSize: 18,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 15, color: "#1f2937" }}>{title}</div>
        <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 1 }}>{subtitle}</div>
      </div>
    </div>
  );
}

// ─── Tariff Row ───────────────────────────────────────────────────────────────

function TariffRow({
  tier,
  exchangeRate,
  showUSD,
  onChange,
}: {
  tier: TariffTier;
  exchangeRate: number;
  showUSD: boolean;
  onChange: (key: string, val: number) => void;
}) {
  const usd = exchangeRate > 0 ? (tier.priceRiel / exchangeRate).toFixed(4) : "—";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 16px",
        background: "#fafbfc",
        borderRadius: 10,
        border: "1px solid #eef2f7",
        marginBottom: 8,
        flexWrap: "wrap",
      }}
    >
      {/* Label */}
      <div style={{ minWidth: 140 }}>
        <div style={{ fontWeight: 600, fontSize: 13, color: "#374151" }}>{tier.labelKh}</div>
        <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{tier.rangeKh}</div>
      </div>

      {/* Price input */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 200 }}>
        <InputNumber
          value={tier.priceRiel}
          min={0}
          step={50}
          formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={(v) => Number(v?.replace(/,/g, "") ?? 0)}
          onChange={(val) => onChange(tier.key, val ?? 0)}
          style={{ width: 140, borderRadius: 8 }}
          addonAfter={<span style={{ color: "#6b7280", fontSize: 12 }}>រៀល/kWh</span>}
        />
        {showUSD && (
          <Tag
            style={{
              borderRadius: 6,
              background: "#f0fdf4",
              color: "#16a34a",
              border: "1px solid #bbf7d0",
              fontWeight: 600,
              fontSize: 12,
              padding: "2px 10px",
            }}
          >
            ≈ ${usd}
          </Tag>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState<SettingsState>({
    currency: "BOTH",
    exchangeRate: 4100,
    tariffs: [
      {
        key: "tier1",
        label: "Tier 1",
        labelKh: "កម្រិតទី ១",
        rangeKh: "0 – 50 kWh",
        priceRiel: 1050,
      },
      {
        key: "tier2",
        label: "Tier 2",
        labelKh: "កម្រិតទី ២",
        rangeKh: "51 – 100 kWh",
        priceRiel: 1350,
      },
      {
        key: "tier3",
        label: "Tier 3",
        labelKh: "កម្រិតទី ៣",
        rangeKh: "101 – 200 kWh",
        priceRiel: 1500,
      },
      {
        key: "tier4",
        label: "Tier 4",
        labelKh: "កម្រិតទី ៤",
        rangeKh: "201 kWh ឡើងទៅ",
        priceRiel: 1750,
      },
    ],
    vatEnabled: false,
    vatPercent: 10,
    lateFeesEnabled: true,
    lateFeePercent: 2,
    billDueDay: 25,
    companyName: "ក្រុមហ៊ុន អគ្គិសនី",
    companyPhone: "012 345 678",
    companyAddress: "ភ្នំពេញ, កម្ពុជា",
    invoicePrefix: "INV",
    decimalPlaces: 2,
  });

  const set = <K extends keyof SettingsState>(key: K, val: SettingsState[K]) =>
    setSettings((prev) => ({ ...prev, [key]: val }));

  const updateTariff = (key: string, priceRiel: number) => {
    setSettings((prev) => ({
      ...prev,
      tariffs: prev.tariffs.map((t) => (t.key === key ? { ...t, priceRiel } : t)),
    }));
  };

  const handleSave = () => {
    console.log("save settings", settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const showUSD = settings.currency === "USD" || settings.currency === "BOTH";

  const cardStyle: React.CSSProperties = {
    borderRadius: 14,
    border: "1px solid #eef2f7",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    marginBottom: 20,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 600,
    color: "#374151",
    marginBottom: 6,
    display: "block",
  };

  const hintStyle: React.CSSProperties = {
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 4,
  };

  return (
    <div style={{ background: "#f6f8fb", minHeight: "100vh", padding: "24px 24px 40px" }}>
      {/* PAGE TITLE */}
      <div style={{ marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#1f2937" }}>ការកំណត់ប្រព័ន្ធ</div>
          <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 2 }}>
            គ្រប់គ្រងអត្រាប្តូរប្រាក់ តម្លៃភ្លើង និងការកំណត់ទូទៅ
          </div>
        </div>
        <Button
          type="primary"
          size="large"
          icon={saved ? <CheckOutlined /> : <SettingOutlined />}
          onClick={handleSave}
          style={{
            borderRadius: 10,
            height: 44,
            paddingInline: 24,
            fontWeight: 700,
            background: saved ? "#16a34a" : "#4f74e8",
            border: "none",
            transition: "background 0.3s",
          }}
        >
          {saved ? "រក្សាទុករួចហើយ!" : "រក្សាទុក"}
        </Button>
      </div>

      <Row gutter={20} align="top">
        {/* LEFT COLUMN */}
        <Col xs={24} lg={14}>

          {/* ── ELECTRICITY TARIFF ── */}
          <Card style={cardStyle} styles={{ body: { padding: "20px 20px 12px" } }}>
            <SectionHeader
              icon={<ThunderboltOutlined />}
              title="តម្លៃអគ្គិសនី"
              subtitle="កំណត់តម្លៃក្នុង 1 kWh សម្រាប់កម្រិតផ្សេងៗ"
              color="#f59e0b"
            />

            <div style={{ marginBottom: 12 }}>
              {settings.tariffs.map((tier) => (
                <TariffRow
                  key={tier.key}
                  tier={tier}
                  exchangeRate={settings.exchangeRate}
                  showUSD={showUSD}
                  onChange={updateTariff}
                />
              ))}
            </div>

            <div
              style={{
                padding: "10px 14px",
                background: "#fffbeb",
                borderRadius: 8,
                border: "1px solid #fde68a",
                fontSize: 12,
                color: "#92400e",
              }}
            >
              💡 តម្លៃទាំងនេះនឹងត្រូវបានប្រើដោយស្វ័យប្រវត្តិក្នុងការគណនាវិក្កយបត្រ
            </div>
          </Card>

          {/* ── CURRENCY ── */}
          <Card style={cardStyle} styles={{ body: { padding: "20px 20px 16px" } }}>
            <SectionHeader
              icon={<DollarOutlined />}
              title="រូបិយប័ណ្ណ"
              subtitle="ជ្រើសរើសរបៀបបង្ហាញតម្លៃ និងអត្រាប្តូរប្រាក់"
              color="#4f74e8"
            />

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <label style={labelStyle}>របៀបបង្ហាញ</label>
                <Select
                  value={settings.currency}
                  onChange={(v) => set("currency", v)}
                  style={{ width: "100%", borderRadius: 8 }}
                  size="large"
                  options={[
                    { value: "KHR", label: "🇰🇭  រៀល (KHR) តែប៉ុណ្ណោះ" },
                    { value: "USD", label: "🇺🇸  ដុល្លារ (USD) តែប៉ុណ្ណោះ" },
                    { value: "BOTH", label: "🔀  ទាំងពីរ (KHR + USD)" },
                  ]}
                />
                <div style={hintStyle}>ជ្រើស "ទាំងពីរ" ដើម្បីបង្ហាញអត្រាប្រៀបធៀប</div>
              </Col>

              <Col xs={24} sm={12}>
                <label style={labelStyle}>
                  អត្រាប្តូរប្រាក់{" "}
                  <Tooltip title="1 USD = ? រៀល">
                    <span style={{ color: "#9ca3af", cursor: "help" }}>(?)</span>
                  </Tooltip>
                </label>
                <InputNumber
                  value={settings.exchangeRate}
                  min={1}
                  step={10}
                  formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(v) => Number(v?.replace(/,/g, "") ?? 0)}
                  onChange={(val) => set("exchangeRate", val ?? 4100)}
                  style={{ width: "100%", borderRadius: 8 }}
                  size="large"
                  addonBefore={<span style={{ color: "#6b7280" }}>1 USD =</span>}
                  addonAfter={<span style={{ color: "#6b7280" }}>រៀល</span>}
                  disabled={settings.currency === "KHR"}
                />
                {settings.currency !== "KHR" && (
                  <div style={hintStyle}>
                    1,000 រៀល ≈ ${(1000 / settings.exchangeRate).toFixed(4)}
                  </div>
                )}
              </Col>
            </Row>

            {settings.currency === "BOTH" && (
              <div
                style={{
                  marginTop: 14,
                  padding: "10px 14px",
                  background: "#eff2ff",
                  borderRadius: 8,
                  border: "1px solid #c7d2fe",
                  fontSize: 12,
                  color: "#4338ca",
                }}
              >
                📊 នឹងបង្ហាញ: <strong>1,500 ៛</strong> ≈{" "}
                <strong>${(1500 / settings.exchangeRate).toFixed(4)}</strong> នៅក្នុងវិក្កយបត្រ
              </div>
            )}
          </Card>

          {/* ── BILLING RULES ── */}
          <Card style={cardStyle} styles={{ body: { padding: "20px 20px 16px" } }}>
            <SectionHeader
              icon={<BankOutlined />}
              title="វិក្កយបត្រ និងការបង់ប្រាក់"
              subtitle="VAT ការប្រាក់ពិន័យ និងកាលកំណត់ការបង់ប្រាក់"
              color="#7c3aed"
            />

            <Row gutter={16}>
              {/* VAT */}
              <Col xs={24} sm={12}>
                <div
                  style={{
                    padding: "14px 16px",
                    background: "#fafbfc",
                    borderRadius: 10,
                    border: "1px solid #eef2f7",
                    marginBottom: 12,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13, color: "#374151" }}>
                        អាករលើតម្លៃបន្ថែម (VAT)
                      </div>
                      <div style={{ fontSize: 11, color: "#9ca3af" }}>បន្ថែម VAT ទៅលើវិក្កយបត្រ</div>
                    </div>
                    <Switch
                      checked={settings.vatEnabled}
                      onChange={(v) => set("vatEnabled", v)}
                      style={{ background: settings.vatEnabled ? "#4f74e8" : undefined }}
                    />
                  </div>
                  {settings.vatEnabled && (
                    <InputNumber
                      value={settings.vatPercent}
                      min={0}
                      max={100}
                      onChange={(val) => set("vatPercent", val ?? 10)}
                      style={{ width: "100%", borderRadius: 8 }}
                      addonAfter="%"
                    />
                  )}
                </div>
              </Col>

              {/* LATE FEES */}
              <Col xs={24} sm={12}>
                <div
                  style={{
                    padding: "14px 16px",
                    background: "#fafbfc",
                    borderRadius: 10,
                    border: "1px solid #eef2f7",
                    marginBottom: 12,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13, color: "#374151" }}>
                        ការប្រាក់ពន្យារ
                      </div>
                      <div style={{ fontSize: 11, color: "#9ca3af" }}>ប្រាក់ពិន័យចំពោះការបង់យឺត</div>
                    </div>
                    <Switch
                      checked={settings.lateFeesEnabled}
                      onChange={(v) => set("lateFeesEnabled", v)}
                      style={{ background: settings.lateFeesEnabled ? "#4f74e8" : undefined }}
                    />
                  </div>
                  {settings.lateFeesEnabled && (
                    <InputNumber
                      value={settings.lateFeePercent}
                      min={0}
                      max={100}
                      step={0.5}
                      onChange={(val) => set("lateFeePercent", val ?? 2)}
                      style={{ width: "100%", borderRadius: 8 }}
                      addonAfter="% / ខែ"
                    />
                  )}
                </div>
              </Col>

              {/* DUE DAY */}
              <Col xs={24} sm={12}>
                <label style={labelStyle}>ថ្ងៃកំណត់បង់ប្រាក់</label>
                <InputNumber
                  value={settings.billDueDay}
                  min={1}
                  max={31}
                  onChange={(val) => set("billDueDay", val ?? 25)}
                  style={{ width: "100%", borderRadius: 8 }}
                  size="large"
                  addonBefore="ថ្ងៃទី"
                  addonAfter="នៃខែ"
                />
                <div style={hintStyle}>វិក្កយបត្រត្រូវបង់មុនថ្ងៃទី {settings.billDueDay} នៃខែ</div>
              </Col>

              {/* DECIMAL */}
              <Col xs={24} sm={12}>
                <label style={labelStyle}>ខ្ទង់ទសភាគ</label>
                <Select
                  value={settings.decimalPlaces}
                  onChange={(v) => set("decimalPlaces", v)}
                  style={{ width: "100%", borderRadius: 8 }}
                  size="large"
                  options={[
                    { value: 0, label: "0 — 1,500 ៛" },
                    { value: 2, label: "2 — 1,500.00 ៛" },
                    { value: 4, label: "4 — 1,500.0000 ៛" },
                  ]}
                />
                <div style={hintStyle}>ប្រើក្នុងការបង្ហាញតម្លៃ</div>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* RIGHT COLUMN */}
        <Col xs={24} lg={10}>

          {/* ── COMPANY INFO ── */}
          <Card style={cardStyle} styles={{ body: { padding: "20px 20px 16px" } }}>
            <SectionHeader
              icon={<GlobalOutlined />}
              title="ព័ត៌មានក្រុមហ៊ុន"
              subtitle="បង្ហាញនៅក្នុងវិក្កយបត្រ និងការប្រាស្រ័យ"
              color="#0891b2"
            />

            <Form layout="vertical" style={{ gap: 0 }}>
              <Form.Item style={{ marginBottom: 12 }}>
                <label style={labelStyle}>ឈ្មោះក្រុមហ៊ុន</label>
                <Input
                  value={settings.companyName}
                  onChange={(e) => set("companyName", e.target.value)}
                  placeholder="ឈ្មោះក្រុមហ៊ុន..."
                  size="large"
                  style={{ borderRadius: 8 }}
                />
              </Form.Item>

              <Form.Item style={{ marginBottom: 12 }}>
                <label style={labelStyle}>លេខទូរស័ព្ទ</label>
                <Input
                  value={settings.companyPhone}
                  onChange={(e) => set("companyPhone", e.target.value)}
                  placeholder="012 345 678"
                  size="large"
                  style={{ borderRadius: 8 }}
                />
              </Form.Item>

              <Form.Item style={{ marginBottom: 12 }}>
                <label style={labelStyle}>អាសយដ្ឋាន</label>
                <Input.TextArea
                  value={settings.companyAddress}
                  onChange={(e) => set("companyAddress", e.target.value)}
                  placeholder="អាសយដ្ឋាន..."
                  rows={2}
                  style={{ borderRadius: 8 }}
                />
              </Form.Item>

              <Form.Item style={{ marginBottom: 0 }}>
                <label style={labelStyle}>បុព្វបទវិក្កយបត្រ</label>
                <Input
                  value={settings.invoicePrefix}
                  onChange={(e) => set("invoicePrefix", e.target.value.toUpperCase())}
                  placeholder="INV"
                  size="large"
                  style={{ borderRadius: 8, maxWidth: 160 }}
                  maxLength={6}
                  addonAfter={
                    <span style={{ color: "#9ca3af", fontSize: 12 }}>
                      {settings.invoicePrefix}-0001
                    </span>
                  }
                />
                <div style={hintStyle}>លេខសៀរៀលស្វ័យប្រវត្តិ</div>
              </Form.Item>
            </Form>
          </Card>

          {/* ── SUMMARY PREVIEW ── */}
          <Card style={cardStyle} styles={{ body: { padding: "20px" } }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#1f2937", marginBottom: 14 }}>
              📋 សង្ខេបការកំណត់
            </div>

            {[
              {
                label: "ការបង្ហាញ",
                value:
                  settings.currency === "KHR"
                    ? "រៀល តែប៉ុណ្ណោះ"
                    : settings.currency === "USD"
                    ? "ដុល្លារ តែប៉ុណ្ណោះ"
                    : "KHR + USD",
              },
              {
                label: "អត្រាប្តូរប្រាក់",
                value: `1 USD = ${settings.exchangeRate.toLocaleString()} ៛`,
              },
              {
                label: "តម្លៃ kWh (ទំនើប)",
                value: `${settings.tariffs[2].priceRiel.toLocaleString()} ៛`,
              },
              {
                label: "VAT",
                value: settings.vatEnabled ? `${settings.vatPercent}%` : "បិទ",
                highlight: settings.vatEnabled,
              },
              {
                label: "ការប្រាក់ពន្យារ",
                value: settings.lateFeesEnabled
                  ? `${settings.lateFeePercent}% / ខែ`
                  : "បិទ",
                highlight: settings.lateFeesEnabled,
              },
              {
                label: "ថ្ងៃកំណត់",
                value: `ថ្ងៃទី ${settings.billDueDay} នៃខែ`,
              },
            ].map((item, i, arr) => (
              <div key={item.label}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 0",
                  }}
                >
                  <span style={{ fontSize: 13, color: "#6b7280" }}>{item.label}</span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: item.highlight ? "#4f74e8" : "#374151",
                    }}
                  >
                    {item.value}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <Divider style={{ margin: 0, borderColor: "#f3f4f6" }} />
                )}
              </div>
            ))}
          </Card>
        </Col>
      </Row>

      {/* LOCAL STYLES */}
      <style>{`
        .ant-input:focus,
        .ant-input-focused,
        .ant-input-number-focused {
          border-color: #4f74e8 !important;
          box-shadow: 0 0 0 2px rgba(79, 116, 232, 0.08) !important;
        }
        .ant-select-focused .ant-select-selector {
          border-color: #4f74e8 !important;
          box-shadow: 0 0 0 2px rgba(79, 116, 232, 0.08) !important;
        }
        .ant-btn-primary:hover {
          background: #3f63d8 !important;
        }
        .ant-input-number-group-addon {
          background: #f9fafb;
          color: #6b7280;
          font-size: 12px;
        }
        .ant-form-item {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
}

export default SettingsPage;
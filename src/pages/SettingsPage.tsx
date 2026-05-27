import {
  BankOutlined,
  CheckOutlined,
  CloseOutlined,
  DollarOutlined,
  EditOutlined,
  GlobalOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import {
  Button,
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

// ─── Nav ──────────────────────────────────────────────────────────────────────

type NavKey = "tariff" | "currency" | "billing" | "company";

interface NavGroup {
  groupLabel: string;
  items: { key: NavKey; icon: React.ReactNode; label: string; sublabel: string }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    groupLabel: "អគ្គិសនី",
    items: [
      { key: "tariff",   icon: <ThunderboltOutlined />, label: "តម្លៃភ្លើង",  sublabel: "តម្លៃតាមកម្រិត kWh" },
      { key: "currency", icon: <DollarOutlined />,      label: "រូបិយប័ណ្ណ",  sublabel: "កំណត់រូបិយប័ណ្ណ"        },
    ],
  },
  {
    groupLabel: "ហិរញ្ញវត្ថុ",
    items: [
      { key: "billing",  icon: <BankOutlined />,        label: "វិក្កយបត្រ",  sublabel: "VAT និងការប្រាក់ពន្យារ"  },
    ],
  },
  {
    groupLabel: "ប្រព័ន្ធ",
    items: [
      { key: "company",  icon: <GlobalOutlined />,      label: "ក្រុមហ៊ុន",   sublabel: "ព័ត៌មានក្រុមហ៊ុន"   },
    ],
  },
];

// ─── Shared ───────────────────────────────────────────────────────────────────

const fieldLabel: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: "#6f7f98",
  marginBottom: 4,
  display: "block",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
};

const fieldValue: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  color: "#20304d",
};

const hintStyle: React.CSSProperties = {
  fontSize: 11,
  color: "#9ca3af",
  marginTop: 4,
};

const inputLabelStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  color: "#374151",
  marginBottom: 6,
  display: "block",
};

// ─── Read-only field ──────────────────────────────────────────────────────────

function ViewField({ label, value, highlight }: { label: string; value: React.ReactNode; highlight?: boolean }) {
  return (
    <div style={{ marginBottom: 4 }}>
      <span style={fieldLabel}>{label}</span>
      <div style={{ ...fieldValue, color: highlight ? "#4f74e8" : "#20304d" }}>{value}</div>
    </div>
  );
}

// ─── Section divider ──────────────────────────────────────────────────────────

function SectionDivider({ label }: { label: string }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 700, color: "#9ca3af",
      textTransform: "uppercase", letterSpacing: "0.07em",
      marginTop: 20, marginBottom: 12,
      paddingBottom: 6, borderBottom: "1px solid #e6ecf5",
    }}>
      {label}
    </div>
  );
}

// ─── VIEW panels ─────────────────────────────────────────────────────────────

function TariffView({ s }: { s: SettingsState }) {
  const showUSD = s.currency !== "KHR";
  return (
    <div>
      <SectionDivider label="កម្រិតតម្លៃ" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {s.tariffs.map((tier) => {
          const usd = s.exchangeRate > 0 ? (tier.priceRiel / s.exchangeRate).toFixed(4) : "—";
          return (
            <div key={tier.key} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "12px 16px", background: "#f8fafd",
              borderRadius: 10, border: "1px solid #e6ecf5", flexWrap: "wrap", gap: 8,
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, color: "#20304d" }}>{tier.labelKh}</div>
                <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>{tier.rangeKh}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontWeight: 800, fontSize: 15, color: "#4f74e8" }}>
                  {tier.priceRiel.toLocaleString()} ៛
                </span>
                {showUSD && (
                  <Tag style={{
                    borderRadius: 6, background: "#f0fdf4", color: "#16a34a",
                    border: "1px solid #bbf7d0", fontWeight: 600, fontSize: 12,
                  }}>
                    ≈ ${usd}
                  </Tag>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CurrencyView({ s }: { s: SettingsState }) {
  const displayMap = { KHR: "រៀល (KHR) តែប៉ុណ្ណោះ", USD: "ដុល្លារ (USD) តែប៉ុណ្ណោះ", BOTH: "ទាំងពីរ (KHR + USD)" };
  const decimalMap: Record<number, string> = { 0: "0 ខ្ទង់ — 1,500 ៛", 2: "2 ខ្ទង់ — 1,500.00 ៛", 4: "4 ខ្ទង់ — 1,500.0000 ៛" };
  return (
    <div>
      <SectionDivider label="ការបង្ហាញ" />
      <Row gutter={[24, 16]}>
        <Col xs={24} sm={12}><ViewField label="របៀបបង្ហាញ" value={displayMap[s.currency]} /></Col>
        <Col xs={24} sm={12}><ViewField label="អត្រាប្តូរប្រាក់" value={`1 USD = ${s.exchangeRate.toLocaleString()} ៛`} /></Col>
        <Col xs={24} sm={12}><ViewField label="ខ្ទង់ទសភាគ" value={decimalMap[s.decimalPlaces]} /></Col>
      </Row>
      {s.currency === "BOTH" && (
        <div style={{
          marginTop: 16, padding: "10px 14px", background: "#eff2ff",
          borderRadius: 8, border: "1px solid #c7d2fe", fontSize: 13, color: "#4338ca",
        }}>
          📊 ឧទាហរណ៍: <strong>1,500 ៛</strong> ≈ <strong>${(1500 / s.exchangeRate).toFixed(4)}</strong>
        </div>
      )}
    </div>
  );
}

function BillingView({ s }: { s: SettingsState }) {
  return (
    <div>
      <SectionDivider label="អាករ និងពន្យារ" />
      <Row gutter={[24, 16]}>
        <Col xs={24} sm={12}>
          <ViewField label="VAT" value={
            s.vatEnabled
              ? <Tag color="blue" style={{ borderRadius: 6, fontWeight: 700 }}>{s.vatPercent}%</Tag>
              : <Tag color="default" style={{ borderRadius: 6 }}>បិទ</Tag>
          } />
        </Col>
        <Col xs={24} sm={12}>
          <ViewField label="ការប្រាក់ពន្យារ" value={
            s.lateFeesEnabled
              ? <Tag color="purple" style={{ borderRadius: 6, fontWeight: 700 }}>{s.lateFeePercent}% / ខែ</Tag>
              : <Tag color="default" style={{ borderRadius: 6 }}>បិទ</Tag>
          } />
        </Col>
        <Col xs={24} sm={12}>
          <ViewField label="ថ្ងៃកំណត់បង់ប្រាក់" value={`ថ្ងៃទី ${s.billDueDay} នៃខែ`} />
        </Col>
      </Row>
    </div>
  );
}

function CompanyView({ s }: { s: SettingsState }) {
  return (
    <div>
      <SectionDivider label="ព័ត៌មានក្រុមហ៊ុន" />
      <Row gutter={[24, 16]}>
        <Col xs={24} sm={12}><ViewField label="ឈ្មោះក្រុមហ៊ុន" value={s.companyName || "—"} /></Col>
        <Col xs={24} sm={12}><ViewField label="លេខទូរស័ព្ទ" value={s.companyPhone || "—"} /></Col>
        <Col xs={24}><ViewField label="អាសយដ្ឋាន" value={s.companyAddress || "—"} /></Col>
        <Col xs={24} sm={12}>
          <ViewField label="បុព្វបទវិក្កយបត្រ" value={
            <span style={{ fontFamily: "monospace", background: "#f3f4f6", borderRadius: 6, padding: "2px 10px", fontSize: 13 }}>
              {s.invoicePrefix}-0001
            </span>
          } />
        </Col>
      </Row>
    </div>
  );
}

// ─── EDIT panels ─────────────────────────────────────────────────────────────

function TariffEdit({ s, updateTariff }: { s: SettingsState; updateTariff: (k: string, v: number) => void }) {
  const showUSD = s.currency !== "KHR";
  return (
    <div>
      <SectionDivider label="កំណត់តម្លៃ kWh" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {s.tariffs.map((tier) => {
          const usd = s.exchangeRate > 0 ? (tier.priceRiel / s.exchangeRate).toFixed(4) : "—";
          return (
            <div key={tier.key} style={{
              display: "flex", alignItems: "center", gap: 16,
              padding: "14px 16px", background: "#f8fafd",
              borderRadius: 10, border: "1px solid #e6ecf5", flexWrap: "wrap",
            }}>
              <div style={{ minWidth: 140 }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: "#20304d" }}>{tier.labelKh}</div>
                <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>{tier.rangeKh}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 220 }}>
                <InputNumber
                  value={tier.priceRiel} min={0} step={50}
                  formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(v) => Number(v?.replace(/,/g, "") ?? 0)}
                  onChange={(val) => updateTariff(tier.key, val ?? 0)}
                  style={{ width: 150 }}
                  addonAfter={<span style={{ fontSize: 12, color: "#6f7f98" }}>រៀល/kWh</span>}
                />
                {showUSD && (
                  <Tag style={{ borderRadius: 6, background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0", fontWeight: 600, fontSize: 12 }}>
                    ≈ ${usd}
                  </Tag>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 14, padding: "10px 14px", background: "#fffbeb", borderRadius: 8, border: "1px solid #fde68a", fontSize: 12, color: "#92400e" }}>
        💡 ប្រសិនបើប្រើ USD សូមទៅកំណត់អត្រាប្តូរប្រាក់ក្នុងផ្នែក "រូបិយប័ណ្ណ" ជាមុនសិន
      </div>
    </div>
  );
}

function CurrencyEdit({ s, set }: { s: SettingsState; set: <K extends keyof SettingsState>(k: K, v: SettingsState[K]) => void }) {
  return (
    <div>
      <SectionDivider label="ការកំណត់រូបិយប័ណ្ណ" />
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <label style={inputLabelStyle}>របៀបបង្ហាញ</label>
          <Select value={s.currency} onChange={(v) => set("currency", v)} style={{ width: "100%" }} size="large"
            options={[
              { value: "KHR",  label: "🇰🇭  រៀល (KHR) តែប៉ុណ្ណោះ"    },
              { value: "USD",  label: "🇺🇸  ដុល្លារ (USD) តែប៉ុណ្ណោះ" },
              { value: "BOTH", label: "🔀  ទាំងពីរ (KHR + USD)"       },
            ]}
          />
          <div style={hintStyle}>ជ្រើស "ទាំងពីរ" ដើម្បីបង្ហាញប្រៀបធៀប</div>
        </Col>
        <Col xs={24} sm={12}>
          <label style={inputLabelStyle}>
            អត្រាប្តូរប្រាក់{" "}
            <Tooltip title="1 USD = ? រៀល"><span style={{ color: "#9ca3af", cursor: "help" }}>(?)</span></Tooltip>
          </label>
          <InputNumber value={s.exchangeRate} min={1} step={10}
            formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            parser={(v) => Number(v?.replace(/,/g, "") ?? 0)}
            onChange={(val) => set("exchangeRate", val ?? 4100)}
            style={{ width: "100%" }} size="large"
            addonBefore={<span style={{ color: "#6f7f98" }}>1 USD =</span>}
            addonAfter={<span style={{ color: "#6f7f98" }}>រៀល</span>}
            disabled={s.currency === "KHR"}
          />
          {s.currency !== "KHR" && <div style={hintStyle}>1,000 រៀល ≈ ${(1000 / s.exchangeRate).toFixed(4)}</div>}
        </Col>
        <Col xs={24} sm={12}>
          <label style={inputLabelStyle}>ខ្ទង់ទសភាគ</label>
          <Select value={s.decimalPlaces} onChange={(v) => set("decimalPlaces", v)} style={{ width: "100%" }} size="large"
            options={[
              { value: 0, label: "0 ខ្ទង់ — 1,500 ៛"      },
              { value: 2, label: "2 ខ្ទង់ — 1,500.00 ៛"   },
              { value: 4, label: "4 ខ្ទង់ — 1,500.0000 ៛" },
            ]}
          />
        </Col>
      </Row>
    </div>
  );
}

function BillingEdit({ s, set }: { s: SettingsState; set: <K extends keyof SettingsState>(k: K, v: SettingsState[K]) => void }) {
  const ToggleBox = ({ title, subtitle, checked, onToggle, children }: {
    title: string; subtitle: string; checked: boolean; onToggle: (v: boolean) => void; children?: React.ReactNode;
  }) => (
    <div style={{
      padding: "14px 16px", background: "#f8fafd", borderRadius: 10,
      border: `1px solid ${checked ? "#c7d2fe" : "#e6ecf5"}`, transition: "border-color 0.2s",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: checked && children ? 12 : 0 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 13, color: "#20304d" }}>{title}</div>
          <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{subtitle}</div>
        </div>
        <Switch checked={checked} onChange={onToggle}
          style={{ background: checked ? "#4f74e8" : undefined, flexShrink: 0, marginLeft: 12 }} />
      </div>
      {checked && children}
    </div>
  );

  return (
    <div>
      <SectionDivider label="អាករ និងពន្យារ" />
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <ToggleBox title="VAT" subtitle="បន្ថែម VAT ទៅលើវិក្កយបត្រ"
            checked={s.vatEnabled} onToggle={(v) => set("vatEnabled", v)}>
            <InputNumber value={s.vatPercent} min={0} max={100}
              onChange={(val) => set("vatPercent", val ?? 10)}
              style={{ width: "100%" }} addonAfter="%" />
          </ToggleBox>
        </Col>
        <Col xs={24} sm={12}>
          <ToggleBox title="ការប្រាក់ពន្យារ" subtitle="ប្រាក់ពិន័យចំពោះការបង់យឺត"
            checked={s.lateFeesEnabled} onToggle={(v) => set("lateFeesEnabled", v)}>
            <InputNumber value={s.lateFeePercent} min={0} max={100} step={0.5}
              onChange={(val) => set("lateFeePercent", val ?? 2)}
              style={{ width: "100%" }} addonAfter="% / ខែ" />
          </ToggleBox>
        </Col>
        <Col xs={24} sm={12}>
          <label style={inputLabelStyle}>ថ្ងៃកំណត់បង់ប្រាក់</label>
          <InputNumber value={s.billDueDay} min={1} max={31}
            onChange={(val) => set("billDueDay", val ?? 25)}
            style={{ width: "100%" }} size="large"
            addonBefore="ថ្ងៃទី" addonAfter="នៃខែ" />
          <div style={hintStyle}>វិក្កយបត្រត្រូវបង់មុនថ្ងៃទី {s.billDueDay} នៃខែ</div>
        </Col>
      </Row>
    </div>
  );
}

function CompanyEdit({ s, set }: { s: SettingsState; set: <K extends keyof SettingsState>(k: K, v: SettingsState[K]) => void }) {
  return (
    <div>
      <SectionDivider label="ព័ត៌មានក្រុមហ៊ុន" />
      <Form layout="vertical">
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={12}>
            <Form.Item style={{ marginBottom: 16 }}>
              <label style={inputLabelStyle}>ឈ្មោះក្រុមហ៊ុន</label>
              <Input value={s.companyName} onChange={(e) => set("companyName", e.target.value)}
                placeholder="ឈ្មោះក្រុមហ៊ុន..." size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item style={{ marginBottom: 16 }}>
              <label style={inputLabelStyle}>លេខទូរស័ព្ទ</label>
              <Input value={s.companyPhone} onChange={(e) => set("companyPhone", e.target.value)}
                placeholder="012 345 678" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item style={{ marginBottom: 16 }}>
              <label style={inputLabelStyle}>អាសយដ្ឋាន</label>
              <Input.TextArea value={s.companyAddress} onChange={(e) => set("companyAddress", e.target.value)}
                placeholder="អាសយដ្ឋាន..." rows={2} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item style={{ marginBottom: 0 }}>
              <label style={inputLabelStyle}>បុព្វបទវិក្កយបត្រ</label>
              <Input value={s.invoicePrefix}
                onChange={(e) => set("invoicePrefix", e.target.value.toUpperCase())}
                placeholder="INV" size="large" maxLength={6}
                addonAfter={<span style={{ color: "#9ca3af", fontSize: 12 }}>{s.invoicePrefix}-0001</span>}
              />
              <div style={hintStyle}>លេខសៀរៀលស្វ័យប្រវត្តិ</div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const INITIAL: SettingsState = {
  currency: "BOTH",
  exchangeRate: 4100,
  tariffs: [
    { key: "tier1", labelKh: "កម្រិតទី ១", rangeKh: "0 – 50 kWh",     priceRiel: 1050 },
    { key: "tier2", labelKh: "កម្រិតទី ២", rangeKh: "51 – 100 kWh",   priceRiel: 1350 },
    { key: "tier3", labelKh: "កម្រិតទី ៣", rangeKh: "101 – 200 kWh",  priceRiel: 1500 },
    { key: "tier4", labelKh: "កម្រិតទី ៤", rangeKh: "201 kWh ឡើងទៅ", priceRiel: 1750 },
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
};

function SettingsPage() {
  const [activeKey, setActiveKey] = useState<NavKey>("tariff");
  const [editing, setEditing]     = useState(false);
  const [saved, setSaved]         = useState(false);

  // Committed (saved) state
  const [settings, setSettings]   = useState<SettingsState>(INITIAL);
  // Draft state while editing
  const [draft, setDraft]         = useState<SettingsState>(INITIAL);

  const setDraftField = <K extends keyof SettingsState>(key: K, val: SettingsState[K]) =>
    setDraft((prev) => ({ ...prev, [key]: val }));

  const updateDraftTariff = (key: string, priceRiel: number) =>
    setDraft((prev) => ({
      ...prev,
      tariffs: prev.tariffs.map((t) => (t.key === key ? { ...t, priceRiel } : t)),
    }));

  const handleEdit = () => {
    setDraft(settings); // reset draft to current saved
    setEditing(true);
  };

  const handleCancel = () => {
    setDraft(settings); // discard changes
    setEditing(false);
  };

  const handleSave = () => {
    setSettings(draft); // commit draft → saved
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  // Always show view from committed settings, edit from draft
  const view = settings;
  const s    = draft;

  const allItems  = NAV_GROUPS.flatMap((g) => g.items);
  const activeItem = allItems.find((i) => i.key === activeKey)!;

  // Sidebar summary (always from committed)
  const summaryRows = [
    { label: "ការបង្ហាញ",        value: view.currency === "KHR" ? "រៀល" : view.currency === "USD" ? "USD" : "KHR+USD" },
    { label: "អត្រាប្តូរប្រាក់",  value: `1 USD = ${view.exchangeRate.toLocaleString()} ៛` },
    { label: "kWh tier 3",       value: `${view.tariffs[2].priceRiel.toLocaleString()} ៛` },
    { label: "VAT",              value: view.vatEnabled ? `${view.vatPercent}%` : "បិទ", highlight: view.vatEnabled },
    { label: "ពន្យារ",           value: view.lateFeesEnabled ? `${view.lateFeePercent}%/ខែ` : "បិទ", highlight: view.lateFeesEnabled },
    { label: "ថ្ងៃកំណត់",        value: `ថ្ងៃទី ${view.billDueDay}` },
    { label: "ក្រុមហ៊ុន",        value: view.companyName || "—" },
  ];

  return (
    <div style={{ background: "#eef3fb", minHeight: "100vh" }}>

      {/* ── PAGE HEADER — matches system header style ── */}
      <div style={{
        padding: "18px 28px",
        background: "#ffffff",
        borderBottom: "1px solid #e6ecf5",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 12,
      }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#20304d", lineHeight: 1.2 }}>
            ការកំណត់ប្រព័ន្ធ
          </div>
          <div style={{ fontSize: 13, color: "#6f7f98", marginTop: 2 }}>
            គ្រប់គ្រងតម្លៃភ្លើង រូបិយប័ណ្ណ និងការកំណត់ប្រព័ន្ធ
          </div>
        </div>

        {/* Action buttons — changes based on mode */}
        <div style={{ display: "flex", gap: 10 }}>
          {editing ? (
            <>
              <Button
                icon={<CloseOutlined />}
                onClick={handleCancel}
                style={{ height: 40, borderRadius: 8, borderColor: "#e6ecf5", color: "#6f7f98", fontWeight: 600 }}
              >
                បោះបង់
              </Button>
              <Button
                type="primary"
                icon={saved ? <CheckOutlined /> : <CheckOutlined />}
                onClick={handleSave}
                style={{
                  height: 40, borderRadius: 8, fontWeight: 700,
                  background: "#4f74e8", border: "none",
                }}
              >
                រក្សាទុក
              </Button>
            </>
          ) : (
            <Button
              icon={<EditOutlined />}
              onClick={handleEdit}
              style={{
                height: 40, borderRadius: 8, fontWeight: 700,
                background: "#4f74e8", border: "none", color: "#fff",
              }}
            >
              កែប្រែ
            </Button>
          )}
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ display: "flex", minHeight: "calc(100vh - 73px)" }}>

        {/* ══ LEFT SIDEBAR ══ */}
        <aside style={{
          width: 220,
          flexShrink: 0,
          background: "#ffffff",
          borderRight: "1px solid #e6ecf5",
          padding: "16px 0",
          display: "flex",
          flexDirection: "column",
        }}>
          {NAV_GROUPS.map((group, gi) => (
            <div key={group.groupLabel} style={{ marginBottom: gi < NAV_GROUPS.length - 1 ? 6 : 0 }}>
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: "#9ca3af",
                textTransform: "uppercase", padding: "6px 18px 4px",
              }}>
                {group.groupLabel}
              </div>
              {group.items.map((item) => {
                const isActive = item.key === activeKey;
                return (
                  <button
                    key={item.key}
                    onClick={() => setActiveKey(item.key)}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", gap: 10,
                      padding: "8px 18px",
                      background: isActive ? "#f0f2f5" : "transparent",
                      border: "none",
                      borderLeft: isActive ? "3px solid #4f74e8" : "3px solid transparent",
                      cursor: "pointer",
                      color: isActive ? "#4f74e8" : "#6f7f98",
                      fontWeight: isActive ? 700 : 500,
                      fontSize: 13, textAlign: "left", transition: "all 0.15s",
                      fontFamily: "'Kantumruy Pro', 'Noto Sans Khmer', sans-serif",
                      borderRadius: 0,
                    }}
                  >
                    <span style={{
                      width: 28, height: 28, borderRadius: 7, flexShrink: 0,
                      background: isActive ? "#eef3fb" : "#f3f4f6",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 13, color: isActive ? "#4f74e8" : "#9ca3af", transition: "all 0.15s",
                    }}>
                      {item.icon}
                    </span>
                    <span>
                      <span style={{ display: "block", lineHeight: 1.3 }}>{item.label}</span>
                      <span style={{ display: "block", fontSize: 10, fontWeight: 400, color: isActive ? "#6f7f98" : "#9ca3af", marginTop: 1 }}>
                        {item.sublabel}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          ))}

          {/* Summary at bottom */}
          <div style={{
            margin: "auto 12px 0",
            marginTop: 24,
            background: "#f8fafd",
            borderRadius: 10,
            border: "1px solid #e6ecf5",
            padding: "12px",
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>
              សង្ខេប
            </div>
            {summaryRows.map((row, i) => (
              <div key={row.label}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 0" }}>
                  <span style={{ fontSize: 11, color: "#9ca3af" }}>{row.label}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: row.highlight ? "#4f74e8" : "#20304d", maxWidth: 90, textAlign: "right" }}>
                    {row.value}
                  </span>
                </div>
                {i < summaryRows.length - 1 && <Divider style={{ margin: 0, borderColor: "#eef2f7" }} />}
              </div>
            ))}
          </div>
        </aside>

        {/* ══ MAIN CONTENT ══ */}
        <main style={{ flex: 1, padding: "24px 28px", minWidth: 0 }}>

          {/* Content card */}
          <div style={{
            background: "#fff",
            borderRadius: 12,
            border: "1px solid #e6ecf5",
            boxShadow: "0 1px 4px rgba(79,116,232,0.06)",
            overflow: "hidden",
          }}>
            {/* Card top bar */}
            <div style={{
              padding: "16px 22px",
              borderBottom: "1px solid #eef2f7",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: "#eef3fb",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  fontSize: 15, color: "#4f74e8",
                }}>
                  {activeItem.icon}
                </span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#20304d", lineHeight: 1.2 }}>
                    {activeItem.label}
                  </div>
                  <div style={{ fontSize: 11, color: "#9ca3af" }}>{activeItem.sublabel}</div>
                </div>
              </div>

              {/* Mode badge */}
              <Tag style={{
                borderRadius: 20, paddingInline: 12, height: 26,
                display: "inline-flex", alignItems: "center", fontWeight: 700, fontSize: 12,
                background: editing ? "#eff2ff" : "#f0fdf4",
                color: editing ? "#4f74e8" : "#16a34a",
                border: editing ? "1px solid #c7d2fe" : "1px solid #bbf7d0",
              }}>
                {editing ? "✏ កំពុងកែប្រែ" : "👁 ទិដ្ឋភាព"}
              </Tag>
            </div>

            {/* Panel body */}
            <div style={{ padding: "22px 22px 28px" }}>
              {/* VIEW MODE */}
              {!editing && (
                <>
                  {activeKey === "tariff"   && <TariffView   s={view} />}
                  {activeKey === "currency" && <CurrencyView s={view} />}
                  {activeKey === "billing"  && <BillingView  s={view} />}
                  {activeKey === "company"  && <CompanyView  s={view} />}
                </>
              )}

              {/* EDIT MODE */}
              {editing && (
                <>
                  {activeKey === "tariff"   && <TariffEdit   s={s} updateTariff={updateDraftTariff} />}
                  {activeKey === "currency" && <CurrencyEdit s={s} set={setDraftField} />}
                  {activeKey === "billing"  && <BillingEdit  s={s} set={setDraftField} />}
                  {activeKey === "company"  && <CompanyEdit  s={s} set={setDraftField} />}
                </>
              )}
            </div>
          </div>

          {/* Saved toast */}
          {saved && (
            <div style={{
              marginTop: 14, padding: "10px 16px", background: "#f0fdf4",
              borderRadius: 8, border: "1px solid #bbf7d0",
              fontSize: 13, color: "#16a34a", fontWeight: 600,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <CheckOutlined /> រក្សាទុករួចហើយ!
            </div>
          )}
        </main>
      </div>

      <style>{`
        .ant-input:focus, .ant-input-focused,
        .ant-input-number-focused {
          border-color: #4f74e8 !important;
          box-shadow: 0 0 0 2px rgba(79,116,232,0.08) !important;
        }
        .ant-select-focused .ant-select-selector {
          border-color: #4f74e8 !important;
          box-shadow: 0 0 0 2px rgba(79,116,232,0.08) !important;
        }
        .ant-btn-primary:hover { opacity: 0.9; }
        .ant-input-number-group-addon { background: #f8fafd; color: #6f7f98; font-size: 12px; }
        .ant-form-item { margin-bottom: 0; }
        .ant-select-selector { border-radius: 8px !important; }
        .ant-input, .ant-input-number, .ant-input-affix-wrapper { border-radius: 8px !important; }
      `}</style>
    </div>
  );
}

export default SettingsPage;
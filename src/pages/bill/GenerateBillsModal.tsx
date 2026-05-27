import {
  CheckOutlined,
  ClockCircleOutlined,
  ThunderboltOutlined,
  TeamOutlined,
  DollarOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import {
  Button,
  Modal,
  Form,
  Radio,
  DatePicker,
  Select,
  InputNumber,
  Steps,
  Alert,
  Row,
  Col,
  Statistic,
  Divider,
  Space,
  message,
} from "antd";
import { useState } from "react";
import dayjs from "dayjs";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface GenerateBillsFormValues {
  // Billing period
  billingType: "monthly" | "custom";
  month?: string;
  startDate?: dayjs.Dayjs;
  endDate?: dayjs.Dayjs;
  // Tenant scope
  tenantScope: "all" | "selected";
  selectedClients?: string[];
  // Pricing
  electricityRate: number;
  vatPercent: number;
  dueDay: number;
  lateFeePercent: number;
}

interface GenerateBillsModalProps {
  open: boolean;
  onCancel: () => void;
  onGenerate: (values: GenerateBillsFormValues) => void;
  clients?: Array<{ id: string; name: string; room: string }>;
}

// Mock clients data
const DEFAULT_CLIENTS = [
  { id: "C-001", name: "សុខ សុភា", room: "A01" },
  { id: "C-002", name: "វង្ស ចន្ថា", room: "A02" },
  { id: "C-003", name: "ហេង សុវណ្ណ", room: "B01" },
  { id: "C-004", name: "ម៉ៅ ច័ន្ទបូ", room: "B02" },
  { id: "C-005", name: "ទូច រ៉ាណា", room: "C01" },
  { id: "C-006", name: "ឃុន លីណា", room: "C02" },
  { id: "C-007", name: "នួន សុធារ៉ា", room: "D01" },
  { id: "C-008", name: "ស៊ិន វិចិត្រ", room: "D02" },
];

// ─── Generate Bills Modal Component ─────────────────────────────────────────

export function GenerateBillsModal({
  open,
  onCancel,
  onGenerate,
  clients = DEFAULT_CLIENTS,
}: GenerateBillsModalProps) {
  const [form] = Form.useForm<GenerateBillsFormValues>();
  const [currentStep, setCurrentStep] = useState(0);
  const [billingType, setBillingType] = useState<"monthly" | "custom">("monthly");
  const [tenantScope, setTenantScope] = useState<"all" | "selected">("all");

  const steps = [
    { title: "ប្រភេទវិក្កយបត្រ", icon: <CalendarOutlined /> },
    { title: "ជ្រើសរើសអតិថិជន", icon: <TeamOutlined /> },
    { title: "កំណត់តម្លៃ", icon: <DollarOutlined /> },
    { title: "បញ្ជាក់ & បង្កើត", icon: <CheckOutlined /> },
  ];

  // Preview data (would come from API in real implementation)
  const previewData = {
    period: billingType === "monthly" 
      ? (form.getFieldValue("month") || "ឧសភា 2025")
      : "កំណត់តាមកាលបរិច្ឆេទ",
    tenantsSelected: tenantScope === "all" 
      ? clients.length 
      : (form.getFieldValue("selectedClients")?.length || 0),
    estimatedBills: tenantScope === "all" 
      ? clients.length 
      : (form.getFieldValue("selectedClients")?.length || 0),
    dueDate: `ថ្ងៃទី ${form.getFieldValue("dueDay") || 25} នៃខែបន្ទាប់`,
    electricityRate: `${(form.getFieldValue("electricityRate") || 900).toLocaleString()}៛/kWh`,
    estimatedTotal: `${((form.getFieldValue("electricityRate") || 900) * 150 * (tenantScope === "all" ? clients.length : (form.getFieldValue("selectedClients")?.length || 0))).toLocaleString()}៛`,
  };

  const handleNext = async () => {
    if (currentStep === 0) {
      // Validate step 1
      if (billingType === "monthly") {
        const month = form.getFieldValue("month");
        if (!month) {
          message.warning("សូមជ្រើសរើសខែ");
          return;
        }
      } else {
        const startDate = form.getFieldValue("startDate");
        const endDate = form.getFieldValue("endDate");
        if (!startDate || !endDate) {
          message.warning("សូមជ្រើសរើសកាលបរិច្ឆេទចាប់ផ្ដើម និងបញ្ចប់");
          return;
        }
      }
      setCurrentStep(1);
    } else if (currentStep === 1) {
      // Validate step 2
      if (tenantScope === "selected") {
        const selected = form.getFieldValue("selectedClients");
        if (!selected || selected.length === 0) {
          message.warning("សូមជ្រើសរើសអតិថិជនយ៉ាងហោចណាស់ម្នាក់");
          return;
        }
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      // Submit
      try {
        const values = await form.validateFields();
        onGenerate({
          ...values,
          billingType,
          tenantScope,
        });
        handleReset();
      } catch (error) {
        console.error("Validation failed:", error);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    form.resetFields();
    setCurrentStep(0);
    setBillingType("monthly");
    setTenantScope("all");
    onCancel();
  };

  const monthOptions = [
    { value: "2025-05", label: "ឧសភា 2025" },
    { value: "2025-06", label: "មិថុនា 2025" },
    { value: "2025-07", label: "កក្កដា 2025" },
    { value: "2025-08", label: "សីហា 2025" },
    { value: "2025-09", label: "កញ្ញា 2025" },
  ];

  return (
    <Modal
      title={
        <div style={{ fontSize: 18, fontWeight: 700, color: "#1f2937" }}>
          <ThunderboltOutlined style={{ marginRight: 8, color: "#4f74e8" }} />
          បង្កើតវិក្កយបត្រថ្មី
        </div>
      }
      open={open}
      onCancel={handleReset}
      width={680}
      footer={null}
      styles={{ body: { padding: "20px 24px" } }}
    >
      <Steps
        current={currentStep}
        items={steps.map((step) => ({
          title: step.title,
          icon: step.icon,
        }))}
        size="small"
        style={{ marginBottom: 28 }}
      />

      <Form
        form={form}
        layout="vertical"
        initialValues={{
          billingType: "monthly",
          tenantScope: "all",
          electricityRate: 900,
          vatPercent: 0,
          dueDay: 25,
          lateFeePercent: 2,
        }}
      >
        {/* STEP 1: Billing Period */}
        {currentStep === 0 && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontWeight: 600, marginBottom: 12, fontSize: 14, color: "#374151" }}>
                រយៈពេលវិក្កយបត្រ
              </div>
              <Radio.Group
                value={billingType}
                onChange={(e) => {
                  setBillingType(e.target.value);
                  form.setFieldValue("billingType", e.target.value);
                }}
                style={{ marginBottom: 16 }}
              >
                <Space direction="vertical">
                  <Radio value="monthly">
                    <span style={{ fontWeight: 500 }}>ប្រចាំខែ</span>
                    <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>
                      បង្កើតវិក្កយបត្រសម្រាប់ខែជាក់លាក់
                    </div>
                  </Radio>
                  <Radio value="custom">
                    <span style={{ fontWeight: 500 }}>កំណត់តាមកាលបរិច្ឆេទ</span>
                    <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>
                      ជ្រើសរើសថ្ងៃចាប់ផ្ដើម និងបញ្ចប់
                    </div>
                  </Radio>
                </Space>
              </Radio.Group>

              {billingType === "monthly" ? (
                <Form.Item name="month" rules={[{ required: true, message: "សូមជ្រើសរើសខែ" }]}>
                  <Select
                    placeholder="ជ្រើសរើសខែ"
                    size="large"
                    style={{ borderRadius: 10 }}
                    options={monthOptions}
                  />
                </Form.Item>
              ) : (
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Form.Item name="startDate" rules={[{ required: true, message: "សូមជ្រើសរើសថ្ងៃចាប់ផ្ដើម" }]}>
                    <DatePicker
                      placeholder="ថ្ងៃចាប់ផ្ដើម"
                      size="large"
                      style={{ width: "100%", borderRadius: 10 }}
                      format="DD/MM/YYYY"
                    />
                  </Form.Item>
                  <Form.Item name="endDate" rules={[{ required: true, message: "សូមជ្រើសរើសថ្ងៃបញ្ចប់" }]}>
                    <DatePicker
                      placeholder="ថ្ងៃបញ្ចប់"
                      size="large"
                      style={{ width: "100%", borderRadius: 10 }}
                      format="DD/MM/YYYY"
                    />
                  </Form.Item>
                </Space>
              )}
            </div>

            <Alert
              message="ព័ត៌មាន"
              description="ប្រព័ន្ធនឹងគណនាដោយស្វ័យប្រវត្តិដោយផ្អែកលើទិន្នន័យកុងទ័រដែលបានកត់ត្រា"
              type="info"
              showIcon
              style={{ borderRadius: 10, background: "#eff3fe", border: "none" }}
            />
          </div>
        )}

        {/* STEP 2: Tenant Scope */}
        {currentStep === 1 && (
          <div>
            <div style={{ fontWeight: 600, marginBottom: 12, fontSize: 14, color: "#374151" }}>
              ជ្រើសរើសអតិថិជន
            </div>
            <Radio.Group
              value={tenantScope}
              onChange={(e) => {
                setTenantScope(e.target.value);
                form.setFieldValue("tenantScope", e.target.value);
              }}
              style={{ marginBottom: 20 }}
            >
              <Space direction="vertical">
                <Radio value="all">
                  <span style={{ fontWeight: 500 }}>អតិថិជនទាំងអស់</span>
                  <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>
                    បង្កើតវិក្កយបត្រសម្រាប់អតិថិជនសកម្មទាំងអស់
                  </div>
                </Radio>
                <Radio value="selected">
                  <span style={{ fontWeight: 500 }}>ជ្រើសរើសអតិថិជន</span>
                  <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>
                    ជ្រើសរើសតែអតិថិជនដែលត្រូវការ
                  </div>
                </Radio>
              </Space>
            </Radio.Group>

            {tenantScope === "selected" && (
              <Form.Item name="selectedClients" rules={[{ required: true, message: "សូមជ្រើសរើសអតិថិជន" }]}>
                <Select
                  mode="multiple"
                  placeholder="ជ្រើសរើសអតិថិជន..."
                  size="large"
                  style={{ borderRadius: 10 }}
                  showSearch
                  optionFilterProp="label"
                  options={clients.map((c) => ({
                    value: c.id,
                    label: `${c.name} (${c.room})`,
                  }))}
                />
              </Form.Item>
            )}

            <div
              style={{
                marginTop: 20,
                padding: "14px 16px",
                background: "#fafbfc",
                borderRadius: 10,
                border: "1px solid #eef2f7",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#6b7280", fontSize: 13 }}>ចំនួនអតិថិជនដែលបានជ្រើសរើស</span>
                <span style={{ fontWeight: 700, fontSize: 18, color: "#4f74e8" }}>
                  {tenantScope === "all" ? clients.length : (form.getFieldValue("selectedClients")?.length || 0)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Pricing Settings */}
        {currentStep === 2 && (
          <div>
            <div style={{ fontWeight: 600, marginBottom: 16, fontSize: 14, color: "#374151" }}>
              ការកំណត់តម្លៃ
            </div>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="តម្លៃអគ្គិសនី" name="electricityRate">
                  <InputNumber<number>
                    min={0}
                    step={50}
                    formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    parser={(v) => Number(v?.replace(/,/g, "") ?? 0)}
                    style={{ width: "100%", borderRadius: 10 }}
                    size="large"
                    addonAfter="៛/kWh"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="VAT (%)" name="vatPercent">
                  <InputNumber
                    min={0}
                    max={100}
                    step={1}
                    style={{ width: "100%", borderRadius: 10 }}
                    size="large"
                    addonAfter="%"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="ថ្ងៃកំណត់បង់ប្រាក់" name="dueDay">
                  <InputNumber
                    min={1}
                    max={31}
                    style={{ width: "100%", borderRadius: 10 }}
                    size="large"
                    addonBefore="ថ្ងៃទី"
                    addonAfter="នៃខែ"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                {/* <Form.Item label="ការប្រាក់ពន្យារ (%/ខែ)" name="lateFeePercent">
                  <InputNumber
                    min={0}
                    max={100}
                    step={0.5}
                    style={{ width: "100%", borderRadius: 10 }}
                    size="large"
                    addonAfter="%"
                  />
                </Form.Item> */}
              </Col>
            </Row>

            <Divider style={{ margin: "12px 0" }} />

            <div
              style={{
                background: "#f0fdf4",
                padding: "14px 16px",
                borderRadius: 10,
                border: "1px solid #bbf7d0",
              }}
            >
              <div style={{ fontSize: 12, color: "#166534", display: "flex", alignItems: "center", gap: 8 }}>
                <CheckOutlined style={{ color: "#16a34a" }} />
                តម្លៃទាំងនេះនឹងត្រូវបានអនុវត្តចំពោះវិក្កយបត្រទាំងអស់ដែលបានបង្កើត
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Preview & Confirm */}
        {currentStep === 3 && (
          <div>
            <div style={{ fontWeight: 600, marginBottom: 16, fontSize: 14, color: "#374151" }}>
              សង្ខេបព័ត៌មានមុនបង្កើត
            </div>

            <div
              style={{
                background: "#fafbfc",
                borderRadius: 12,
                border: "1px solid #eef2f7",
                padding: "16px",
                marginBottom: 20,
              }}
            >
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Statistic
                    title={<span style={{ fontSize: 12, color: "#6b7280" }}>រយៈពេលវិក្កយបត្រ</span>}
                    value={previewData.period}
                    valueStyle={{ fontSize: 14, fontWeight: 600, color: "#374151" }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title={<span style={{ fontSize: 12, color: "#6b7280" }}>ចំនួនអតិថិជន</span>}
                    value={previewData.tenantsSelected}
                    valueStyle={{ fontSize: 14, fontWeight: 600, color: "#4f74e8" }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title={<span style={{ fontSize: 12, color: "#6b7280" }}>វិក្កយបត្រប៉ាន់ស្មាន</span>}
                    value={previewData.estimatedBills}
                    valueStyle={{ fontSize: 14, fontWeight: 600, color: "#374151" }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title={<span style={{ fontSize: 12, color: "#6b7280" }}>ថ្ងៃកំណត់បង់</span>}
                    value={previewData.dueDate}
                    valueStyle={{ fontSize: 14, fontWeight: 600, color: "#d97706" }}
                  />
                </Col>
              </Row>
            </div>

            <div
              style={{
                background: "#eff3fe",
                padding: "14px 16px",
                borderRadius: 10,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>តម្លៃអគ្គិសនី</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#4f74e8" }}>{previewData.electricityRate}</div>
              </div>
              <Divider type="vertical" style={{ height: 40 }} />
              <div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>ប៉ាន់ស្មានសរុប</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#1d4ed8" }}>{previewData.estimatedTotal}</div>
              </div>
            </div>

            <Alert
              message="សូមបញ្ជាក់ព័ត៌មាន"
              description="បន្ទាប់ពីបង្កើតវិក្កយបត្រ អ្នកមិនអាចកែប្រែតម្លៃបានទេ"
              type="warning"
              showIcon
              style={{ marginTop: 16, borderRadius: 10 }}
            />
          </div>
        )}

        {/* Footer Buttons */}
        <div style={{ marginTop: 28, display: "flex", justifyContent: "space-between" }}>
          {currentStep > 0 && (
            <Button onClick={handlePrev} style={{ borderRadius: 10, height: 40, paddingInline: 24 }}>
              ត្រលប់ក្រោយ
            </Button>
          )}
          <div style={{ flex: 1 }} />
          <Button
            type="primary"
            onClick={handleNext}
            style={{
              borderRadius: 10,
              height: 40,
              paddingInline: 32,
              background: currentStep === steps.length - 1 ? "#16a34a" : "#4f74e8",
            }}
          >
            {currentStep === steps.length - 1 ? (
              <span><CheckOutlined /> បង្កើតវិក្កយបត្រ</span>
            ) : (
              <span>បន្ទាប់ <ClockCircleOutlined /></span>
            )}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default GenerateBillsModal;
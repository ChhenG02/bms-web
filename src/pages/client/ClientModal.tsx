import { Button, Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import { khmerDatePickerLocale } from "../../utils/datePickerKhmer";
import { requiredLabel } from "../../utils/requiredLabel";

export type ClientFormValues = {
  address?: string;
  customerCode: string;
  installDate: string;
  meterCode?: string;
  name: string;
  newReading: number;
  oldReading: number;
  phone?: string;
  status: "Paid" | "Unpaid";
};

type ClientModalProps = {
  loading?: boolean;
  onCancel: () => void;
  onSubmit: (values: ClientFormValues) => void;
  open: boolean;
  title: string;
};

function ClientModal({
  open,
  title,
  loading,
  onCancel,
  onSubmit,
}: ClientModalProps) {
  const [form] = Form.useForm();

  return (
    <Modal
      open={open}
      title={
        <span
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#374151",
          }}
        >
          {title}
        </span>
      }
      onCancel={onCancel}
      footer={null}
      destroyOnHidden
      centered
      width={1200}
    >
      <Form
        form={form}
        layout="horizontal"
        onFinish={onSubmit}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          customerCode: "NP03930",
          status: "Paid",
        }}
        style={{
          marginTop: 28,
        }}
      >
        {/* FIRST ROW */}
        <Row gutter={32}>
          <Col span={12}>
            <Form.Item
              label={requiredLabel("លេខសំគាល់អតិថិជន")}
              name="customerCode"
              rules={[
                {
                  required: true,
                  message: "សូមបញ្ចូលលេខកូដអតិថិជន",
                },
              ]}
            >
              <Input placeholder="NP03930" size="large" />
            </Form.Item>
          </Col>
        </Row>

        {/* SECOND ROW */}
        <Row gutter={32}>
          <Col span={12}>
            <Form.Item
              label={requiredLabel("នាមត្រកូល")}
              name="name"
              rules={[
                {
                  required: true,
                  message: "សូមបញ្ចូលនាមត្រកូល",
                },
              ]}
            >
              <Input placeholder="បញ្ចូលនាមត្រកូល" size="large" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label={requiredLabel("នាមខ្លួន")} name="នាមខ្លួន"     rules={[
                {
                  required: true,
                  message: "សូមបញ្ចូលនាមខ្លួន",
                },
              ]}>
              <Input placeholder="បញ្ចូលនាមខ្លួន" size="large" />
            </Form.Item>
          </Col>
        </Row>

        {/* THIRD ROW */}
        <Row gutter={32}>
          <Col span={12}>
            <Form.Item
              label={requiredLabel("ភេទ")}
              name="gender"
              rules={[
                {
                  required: true,
                  message: "សូមជ្រើសរើសភេទ",
                },
              ]}
            >
              <Select
                size="large"
                placeholder="- ជ្រើសរើស -"
                options={[
                  {
                    label: "ប្រុស",
                    value: "male",
                  },
                  {
                    label: "ស្រី",
                    value: "female",
                  },
                ]}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label={requiredLabel("កាលបរិច្ឆេទ")}
              name="installDate"
              rules={[
                {
                  required: true,
                  message: "សូមជ្រើសរើសកាលបរិច្ឆេទ",
                },
              ]}
            >
              <DatePicker
                locale={khmerDatePickerLocale}
                size="large"
                style={{
                  width: "100%",
                }}
                format="DD/MM/YYYY"
              />
            </Form.Item>
          </Col>
        </Row>

        {/* FOURTH ROW */}
        <Row gutter={32}>
          <Col span={12}>
            <Form.Item
              label={requiredLabel("ជ្រើសរើសកុងទ័រ")}
              name="clientType"
              rules={[
                {
                  required: true,
                  message: "សូមជ្រើសរើស",
                },
              ]}
            >
              <Select
                size="large"
                placeholder="- ជ្រើសរើស -"
                options={[
                  {
                    label: "dpm 1",
                    value: "dpm 1",
                  },
                  {
                    label: "dpm 2",
                    value: "dpm 2",
                  },
                ]}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="លេខសំគាល់កុងទ័រ" name="meterCode">
              <Input placeholder="លេខកុងទ័រ" size="large" />
            </Form.Item>
          </Col>
        </Row>

        {/* FIFTH ROW */}
        <Row gutter={32}>
          <Col span={12}>
            <Form.Item label="ពិពណ៌នា" name="description">
              <Input.TextArea rows={4} placeholder="មតិយោបល់" />
            </Form.Item>
          </Col>
        </Row>

        {/* BUTTON */}
        <Row justify="end">
          <Col>
            <div
              style={{
                display: "flex",
                gap: 12,
                marginTop: 12,
              }}
            >
              <Button size="large" onClick={onCancel}>
                បោះបង់
              </Button>

              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                style={{
                  background: "#4f74e8",
                  border: "none",
                  fontWeight: 600,
                  paddingInline: 24,
                }}
              >
                រក្សាទុក
              </Button>
            </div>
          </Col>
        </Row>
      </Form>

      <style>
        {`
          .ant-modal-content {
            border-radius: 18px !important;
            overflow: hidden;
          }

          .ant-modal-header {
            border-bottom: 1px solid #f1f5f9 !important;
            margin-bottom: 0 !important;
            padding-bottom: 18px !important;
          }

          .ant-form-item-label > label {
            font-weight: 600;
            color: #4b5563 !important;
          }

          .ant-input,
          .ant-input-number,
          .ant-picker,
          .ant-select-selector {
            border-radius: 10px !important;
          }

          .ant-input,
          .ant-input-number-input,
          .ant-picker,
          .ant-select-selector {
            height: 44px !important;
          }

          .ant-input-textarea textarea {
            min-height: 110px !important;
          }

          .ant-input:focus,
          .ant-input-focused,
          .ant-picker-focused,
          .ant-select-focused .ant-select-selector {
            border-color: #4f74e8 !important;
            box-shadow: 0 0 0 2px rgba(79, 116, 232, 0.08) !important;
          }
        `}
      </style>
    </Modal>
  );
}

export default ClientModal;

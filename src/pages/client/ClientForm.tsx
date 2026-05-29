// import { Button, Col, ConfigProvider, DatePicker, Form, Input, Modal, Row, Select } from "antd";
// // import { khmerDatePickerLocale } from "../../utils/datePickerKhmer";
// import { requiredLabel } from "../../utils/requiredLabel";
// import dayjs from "dayjs";

// export type ClientFormValues = {
//   address?: string;
//   customerCode: string;
//   installDate: string;
//   meterCode?: string;
//   name: string;
//   newReading: number;
//   oldReading: number;
//   phone?: string;
//   status: "Paid" | "Unpaid";
// };

// type ClientModalProps = {
//   loading?: boolean;
//   onCancel: () => void;
//   onSubmit: (values: ClientFormValues) => void;
//   open: boolean;
//   title: string;

//   initialValues?: Partial<ClientFormValues>;
// };

// function ClientForm({
//   open,
//   title,
//   loading,
//   onCancel,
//   onSubmit,
//   initialValues,
// }: ClientModalProps) {
//   const [form] = Form.useForm();

//   return (
//     <ConfigProvider
//       theme={{
//         token: {
//           borderRadius: 8,
//           borderRadiusLG: 8,
//           controlHeightLG: 48,
//         },
//       }}
//     >
//       <Modal
//         open={open}
//         rootClassName="client-form-modal"
//         title={
//           <span
//             style={{
//               fontSize: 28,
//               fontWeight: 700,
//               color: "#374151",
//             }}
//           >
//             {title}
//           </span>
//         }
//         onCancel={onCancel}
//         footer={null}
//         destroyOnHidden
//         centered
//         width={1200}
//       >
//         <Form
//           form={form}
//           layout="horizontal"
//           onFinish={onSubmit}
//           labelCol={{
//             span: 8,
//           }}
//           wrapperCol={{
//             span: 16,
//           }}
//           initialValues={{
//             customerCode: "NP03930",
//             status: "Paid",

//             ...initialValues,

//             installDate: initialValues?.installDate
//               ? dayjs(initialValues.installDate, "DD MMM YYYY")
//               : undefined,
//           }}
//           style={{
//             marginTop: 28,
//           }}
//         >
//           {/* FIRST ROW */}
//           <Row gutter={32}>
//             <Col span={12}>
//               <Form.Item
//                 label={requiredLabel("លេខសំគាល់អតិថិជន")}
//                 name="customerCode"
//                 rules={[
//                   {
//                     required: true,
//                     message: "សូមបញ្ចូលលេខកូដអតិថិជន",
//                   },
//                 ]}
//               >
//                 <Input placeholder="NP03930" size="large" />
//               </Form.Item>
//             </Col>
//           </Row>

//           {/* SECOND ROW */}
//           <Row gutter={32}>
//             <Col span={12}>
//               <Form.Item
//                 label={requiredLabel("នាមត្រកូល")}
//                 name="name"
//                 rules={[
//                   {
//                     required: true,
//                     message: "សូមបញ្ចូលនាមត្រកូល",
//                   },
//                 ]}
//               >
//                 <Input placeholder="បញ្ចូលនាមត្រកូល" size="large" />
//               </Form.Item>
//             </Col>

//             <Col span={12}>
//               <Form.Item
//                 label={requiredLabel("នាមខ្លួន")}
//                 name="firstName"
//                 rules={[
//                   {
//                     required: true,
//                     message: "សូមបញ្ចូលនាមខ្លួន",
//                   },
//                 ]}
//               >
//                 <Input placeholder="បញ្ចូលនាមខ្លួន" size="large" />
//               </Form.Item>
//             </Col>
//           </Row>

//           {/* THIRD ROW */}
//           <Row gutter={32}>
//             <Col span={12}>
//               <Form.Item
//                 label={requiredLabel("ភេទ")}
//                 name="gender"
//                 rules={[
//                   {
//                     required: true,
//                     message: "សូមជ្រើសរើសភេទ",
//                   },
//                 ]}
//               >
//                 <Select
//                   size="large"
//                   placeholder="- ជ្រើសរើស -"
//                   popupClassName="client-form-select-dropdown"
//                   options={[
//                     {
//                       label: "ប្រុស",
//                       value: "male",
//                     },
//                     {
//                       label: "ស្រី",
//                       value: "female",
//                     },
//                   ]}
//                 />
//               </Form.Item>
//             </Col>

//             <Col span={12}>
//               <Form.Item
//                 label={requiredLabel("កាលបរិច្ឆេទ")}
//                 name="installDate"
//                 rules={[
//                   {
//                     required: true,
//                     message: "សូមជ្រើសរើសកាលបរិច្ឆេទ",
//                   },
//                 ]}
//               >
//                 <DatePicker
//                   disabled
//                   format="DD/MM/YYYY"
//                   style={{
//                     width: "100%",
//                     background: "#f3f4f6",
//                     cursor: "not-allowed",
//                   }}
//                   size="large"
//                 />
//               </Form.Item>
//             </Col>
//           </Row>

//           {/* FOURTH ROW */}
//           <Row gutter={32}>
//             <Col span={12}>
//               <Form.Item
//                 label={requiredLabel("ជ្រើសរើសកុងទ័រ")}
//                 name="clientType"
//                 rules={[
//                   {
//                     required: true,
//                     message: "សូមជ្រើសរើស",
//                   },
//                 ]}
//               >
//                 <Select
//                   size="large"
//                   placeholder="- ជ្រើសរើស -"
//                   popupClassName="client-form-select-dropdown"
//                   options={[
//                     {
//                       label: "dpm 1",
//                       value: "dpm 1",
//                     },
//                     {
//                       label: "dpm 2",
//                       value: "dpm 2",
//                     },
//                   ]}
//                 />
//               </Form.Item>
//             </Col>

//             <Col span={12}>
//               <Form.Item label="លេខសំគាល់កុងទ័រ" name="meterCode">
//                 <Input placeholder="លេខកុងទ័រ" size="large" />
//               </Form.Item>
//             </Col>
//           </Row>

//           {/* FIFTH ROW */}
//           <Row gutter={32}>
//             <Col span={12}>
//               <Form.Item label="ពិពណ៌នា" name="description">
//                 <Input.TextArea rows={4} placeholder="មតិយោបល់" />
//               </Form.Item>
//             </Col>
//           </Row>

//           {/* BUTTON */}
//           <Row justify="end">
//             <Col>
//               <div
//                 style={{
//                   display: "flex",
//                   gap: 12,
//                   marginTop: 12,
//                 }}
//               >
//                 <Button size="large" onClick={onCancel}>
//                   បោះបង់
//                 </Button>

//                 <Button
//                   type="primary"
//                   htmlType="submit"
//                   loading={loading}
//                   size="large"
//                   style={{
//                     background: "#4f74e8",
//                     border: "none",
//                     fontWeight: 600,
//                     paddingInline: 24,
//                   }}
//                 >
//                   រក្សាទុក
//                 </Button>
//               </div>
//             </Col>
//           </Row>
//         </Form>

//         <style>
//           {`
//             .client-form-modal .ant-modal-content {
//               border-radius: 18px !important;
//               overflow: hidden;
//             }

//             .client-form-modal .ant-modal-header {
//               border-bottom: 1px solid #f1f5f9 !important;
//               margin-bottom: 0 !important;
//               padding-bottom: 18px !important;
//             }

//             .client-form-modal .ant-form-item-label > label {
//               font-weight: 600;
//               color: #4b5563 !important;
//             }

//             .client-form-modal .ant-input-textarea textarea {
//               border-radius: 8px !important;
//               min-height: 110px !important;
//             }

//             .client-form-select-dropdown {
//               border-radius: 8px !important;
//               overflow: hidden;
//             }
//           `}
//         </style>
//       </Modal>
//     </ConfigProvider>
//   );
// }

// export default ClientForm;


import { Button, Col, ConfigProvider, DatePicker, Form, Input, Modal, Row, Select } from "antd";
// import { khmerDatePickerLocale } from "../../utils/datePickerKhmer";
import { requiredLabel } from "../../utils/requiredLabel";
import dayjs from "dayjs";

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

  initialValues?: Partial<ClientFormValues>;
};

function ClientForm({
  open,
  title,
  loading,
  onCancel,
  onSubmit,
  initialValues,
}: ClientModalProps) {
  const [form] = Form.useForm();

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 8,
          borderRadiusLG: 8,
          controlHeightLG: 48,
        },
      }}
    >
      <Modal
        open={open}
        rootClassName="client-form-modal"
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

            ...initialValues,

            installDate: initialValues?.installDate
              ? dayjs(initialValues.installDate, "DD MMM YYYY")
              : undefined,
          }}
          style={{
            marginTop: 28,
          }}
        >
          {/* FIRST ROW */}
          <Row gutter={32}>
            <Col span={12}>
              <Form.Item
                label={requiredLabel("Customer Code")}
                name="customerCode"
                rules={[
                  {
                    required: true,
                    message: "Please enter customer code",
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
                label={requiredLabel("Last Name")}
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter last name",
                  },
                ]}
              >
                <Input placeholder="Enter last name" size="large" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label={requiredLabel("First Name")}
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "Please enter first name",
                  },
                ]}
              >
                <Input placeholder="Enter first name" size="large" />
              </Form.Item>
            </Col>
          </Row>

          {/* THIRD ROW */}
          <Row gutter={32}>
            <Col span={12}>
              <Form.Item
                label={requiredLabel("Gender")}
                name="gender"
                rules={[
                  {
                    required: true,
                    message: "Please select gender",
                  },
                ]}
              >
                <Select
                  size="large"
                  placeholder="- Select -"
                  popupClassName="client-form-select-dropdown"
                  options={[
                    {
                      label: "Male",
                      value: "male",
                    },
                    {
                      label: "Female",
                      value: "female",
                    },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label={requiredLabel("Date")}
                name="installDate"
                rules={[
                  {
                    required: true,
                    message: "Please select date",
                  },
                ]}
              >
                <DatePicker
                  disabled
                  format="DD/MM/YYYY"
                  style={{
                    width: "100%",
                    background: "#f3f4f6",
                    cursor: "not-allowed",
                  }}
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>

          {/* FOURTH ROW */}
          <Row gutter={32}>
            <Col span={12}>
              <Form.Item
                label={requiredLabel("Select Meter")}
                name="clientType"
                rules={[
                  {
                    required: true,
                    message: "Please select",
                  },
                ]}
              >
                <Select
                  size="large"
                  placeholder="- Select -"
                  popupClassName="client-form-select-dropdown"
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
              <Form.Item label="Meter Code" name="meterCode">
                <Input placeholder="Meter code" size="large" />
              </Form.Item>
            </Col>
          </Row>

          {/* FIFTH ROW */}
          <Row gutter={32}>
            <Col span={12}>
              <Form.Item label="Description" name="description">
                <Input.TextArea rows={4} placeholder="Comment" />
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
                  Cancel
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
                  Save
                </Button>
              </div>
            </Col>
          </Row>
        </Form>

        <style>
          {`
            .client-form-modal .ant-modal-content {
              border-radius: 18px !important;
              overflow: hidden;
            }

            .client-form-modal .ant-modal-header {
              border-bottom: 1px solid #f1f5f9 !important;
              margin-bottom: 0 !important;
              padding-bottom: 18px !important;
            }

            .client-form-modal .ant-form-item-label > label {
              font-weight: 600;
              color: #4b5563 !important;
            }

            .client-form-modal .ant-input-textarea textarea {
              border-radius: 8px !important;
              min-height: 110px !important;
            }

            .client-form-select-dropdown {
              border-radius: 8px !important;
              overflow: hidden;
            }
          `}
        </style>
      </Modal>
    </ConfigProvider>
  );
}

export default ClientForm;
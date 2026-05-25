import {
  CheckOutlined,
  CloseOutlined,
  HomeOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Card,
  Col,
  Row,
  Space,
  Table,
  Tag,
  Typography,
  Button,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { NavLink, useParams } from "react-router-dom";
import { CLIENTS } from "../../data/clientData";
import { buildHistoryTablePagination } from "../../utils/pagination";

import InvoiceTemplate from "../../components/InvoiceTemplate";
import { handlePreviewPDF } from "../../utils/handlePreviewPDF";

const { Title, Text } = Typography;

type BillHistoryRow = {
  key: string;
  no: string;
  dateRange: string;
  oldReading: number;
  newReading: number;
  usage: string;
  total: string;
  status: "Paid" | "Unpaid";
};

function ClientPageDetail() {
  const { id } = useParams();

  const client = CLIENTS.find((item) => item.id === id);

  if (!client) {
    return <div>Client not found</div>;
  }



  const rows = client.histories;

  const columns: ColumnsType<BillHistoryRow> = [
    {
      title: "ល.រ",
      dataIndex: "no",
      key: "no",
      width: 70,
    },

    {
      title: "កាលបរិច្ឆេទប្រើប្រាស់",
      dataIndex: "dateRange",
      key: "dateRange",
      width: 280,
    },

    {
      title: "លេខកុងទ័រចាស់",
      dataIndex: "oldReading",
      key: "oldReading",
      width: 140,
    },

    {
      title: "លេខកុងទ័រថ្មី",
      dataIndex: "newReading",
      key: "newReading",
      width: 140,
    },

    {
      title: "ទំហំប្រើប្រាស់",
      dataIndex: "usage",
      key: "usage",
      width: 180,
    },

    {
      title: "គិតជាទឹកប្រាក់",
      dataIndex: "total",
      key: "total",
      width: 180,

      render: (value: string) => (
        <span
          style={{
            fontWeight: 700,
            color: "#4b5563",
          }}
        >
          {value}
        </span>
      ),
    },

    {
      title: "ស្ថានភាព",
      dataIndex: "status",
      key: "status",
      width: 180,

      render: (value: BillHistoryRow["status"]) =>
        value === "Paid" ? (
          <Tag
            color="success"
            style={{
              border: "none",
              borderRadius: 999,
              paddingInline: 12,
              height: 32,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontWeight: 600,
            }}
          >
            <CheckOutlined />
            បានបង់
          </Tag>
        ) : (
          <Tag
            color="error"
            style={{
              border: "none",
              borderRadius: 999,
              paddingInline: 12,
              height: 32,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontWeight: 600,
            }}
          >
            <CloseOutlined />
            មិនទាន់បង់
          </Tag>
        ),
    },

    {
      title: "ទាញយក",
      key: "action",
      width: 100,
      align: "center",

      render: () => (
        <Button
          type="text"
          icon={<PrinterOutlined />}
          style={{
            color: "#4f74e8",
          }}
          onClick={() =>
  handlePreviewPDF({
    elementId: "invoice-pdf",

    filename: `invoice-${client.id}.pdf`,
  })
}
        />
      ),
    },
  ];

  const renderInfoItem = (label: string, value: string) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: 28,
      }}
    >
      {/* LABEL */}
      <div
        style={{
          width: 220,
          flexShrink: 0,
          textAlign: "right",
          paddingRight: 16,
        }}
      >
        <Text
          style={{
            color: "#6b7280",
            fontWeight: 600,
          }}
        >
          {label} :
        </Text>
      </div>

      {/* VALUE */}
      <div
        style={{
          flex: 1,
        }}
      >
        <Text
          style={{
            color: "#374151",
            fontWeight: 700,
          }}
        >
          {value}
        </Text>
      </div>
    </div>
  );

  const sectionTitleStyle = {
    marginBottom: 16,
    color: "#374151",
  };

  return (
    <div
      style={{
        background: "#f6f8fb",
        minHeight: "100vh",
        padding: 20,
      }}
    >
      {/* BREADCRUMB */}
      <Breadcrumb
        style={{
          marginBottom: 20,
        }}
        items={[
          {
            title: <HomeOutlined />,
          },

          {
            title: (
              <NavLink
                to="/client"
                style={{
                  color: "#4f74e8",
                  fontWeight: 500,
                }}
              >
                អតិថិជន
              </NavLink>
            ),
          },

          {
            title: client.name,
          },
        ]}
      />

      {/* PAGE TITLE */}
      <Title level={4} style={sectionTitleStyle}>
        ព័ត៌មានលម្អិតអំពីអតិថិជន
      </Title>

      {/* CLIENT INFO */}
      <Card
        variant="borderless"
        style={{
          marginBottom: 24,
          borderRadius: 16,
        }}
      >
        <Row gutter={[48, 0]}>
          <Col xs={24} md={12}>
            {renderInfoItem("លេខសំគាល់អតិថិជន", client.clientCode)}

            {renderInfoItem("ភេទ", client.gender)}

            {renderInfoItem("លេខសំគាល់កុងទ័រ", client.meterCode)}
          </Col>

          <Col xs={24} md={12}>
            {renderInfoItem("ឈ្មោះ", client.name)}

            {renderInfoItem("កាលបរិច្ឆេទចុះឈ្មោះ", client.installDate)}

            {renderInfoItem("កំណត់ចំណាំ", client.note)}
          </Col>
        </Row>
      </Card>

      {/* BILL HISTORY */}
      <Title level={4} style={sectionTitleStyle}>
        ប្រវត្តិការប្រើប្រាស់
      </Title>

      <Card
        variant="borderless"
        style={{
          borderRadius: 16,
        }}
      >
        <Space
          orientation="vertical"
          size={20}
          style={{
            width: "100%",
          }}
        >
          <Table<BillHistoryRow>
            columns={columns}
            dataSource={rows}
            pagination={buildHistoryTablePagination({
              page: 1,
              pageSize: 5,
              total: rows.length,
            })}
            rowKey="key"
            scroll={{ x: 1100 }}
          />
        </Space>
      </Card>

      <div
        style={{
          position: "fixed",
          left: "-99999px",
          top: 0,
        }}
      >
        <InvoiceTemplate client={client} />
      </div>

      {/* LOCAL STYLE */}
      <style>
        {`
          .ant-breadcrumb {
            font-weight: 500;
          }

          .ant-table {
            background: transparent !important;
          }

          .ant-table-thead > tr > th {
            background: #fafbfc !important;
            color: #4f74e8 !important;
            font-size: 14px !important;
            font-weight: 700 !important;
            border-bottom: 1px solid #eef2f7 !important;
          }

          .ant-table-tbody > tr > td {
            border-bottom: 1px solid #f3f4f6 !important;
            color: #6b7280;
            font-size: 14px;
          }

          .ant-table-tbody > tr:nth-child(odd) > td {
            background: #fafafa;
          }

          .ant-table-tbody > tr:nth-child(even) > td {
            background: #ffffff;
          }

          .ant-table-tbody > tr:hover > td {
            background: #f3f7ff !important;
          }

          .ant-card {
            box-shadow: 0 1px 2px rgba(0,0,0,0.03);
          }
        `}
      </style>
    </div>
  );
}

export default ClientPageDetail;

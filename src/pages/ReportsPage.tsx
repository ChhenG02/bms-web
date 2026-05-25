import {
  BarChartOutlined,
  DownloadOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
import { Button, Card, Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import SubSectionNav from '../components/navigation/SubSectionNav'

type ReportRow = {
  key: string
  owner: string
  schedule: string
  status: 'Draft' | 'Live' | 'Scheduled'
  template: string
}

function ReportsPage() {
  const rows: ReportRow[] = [
    {
      key: '1',
      owner: 'Finance',
      schedule: 'Monthly',
      status: 'Live',
      template: 'Payroll summary',
    },
    {
      key: '2',
      owner: 'HR',
      schedule: 'Weekly',
      status: 'Scheduled',
      template: 'Attendance insights',
    },
    {
      key: '3',
      owner: 'Operations',
      schedule: 'Quarterly',
      status: 'Draft',
      template: 'Team utilization',
    },
  ]

  const columns: ColumnsType<ReportRow> = [
    { dataIndex: 'template', key: 'template', title: 'Template' },
    { dataIndex: 'owner', key: 'owner', title: 'Owner' },
    { dataIndex: 'schedule', key: 'schedule', title: 'Schedule' },
    {
      dataIndex: 'status',
      key: 'status',
      title: 'Status',
      render: (value: ReportRow['status']) => (
        <Tag
          color={
            value === 'Live'
              ? 'success'
              : value === 'Scheduled'
                ? 'processing'
                : 'default'
          }
        >
          {value}
        </Tag>
      ),
    },
  ]

  return (
    <div className="module-layout">
      <SubSectionNav
        items={['Templates', 'Analytics', 'Exports']}
        title="Reports nav"
      />

      <div className="module-main">
        <section className="module-hero">
          <h2>Reports and analytics</h2>
          <p>
            Create recurring report templates, review workforce insights, and
            export executive summaries from one reporting area.
          </p>
        </section>

        <section className="module-grid module-grid--two">
          <Card
            className="panel-card"
            extra={
              <Space>
                <Button icon={<DownloadOutlined />}>Export</Button>
                <Button type="primary">New report</Button>
              </Space>
            }
            title="Report templates"
          >
            <Table<ReportRow>
              columns={columns}
              dataSource={rows}
              pagination={false}
              rowKey="key"
            />
          </Card>

          <Card className="panel-card" title="Analytics focus">
            <div className="stack-list">
              <div className="stack-list__item">
                <div>
                  <strong>Payroll summary</strong>
                  <span>Monthly payroll report is ready to export.</span>
                </div>
                <FileTextOutlined />
              </div>
              <div className="stack-list__item">
                <div>
                  <strong>Attendance insights</strong>
                  <span>Weekly late arrival trend is improving.</span>
                </div>
                <BarChartOutlined />
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}

export default ReportsPage

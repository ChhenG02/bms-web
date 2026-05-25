import {
  ArrowRightOutlined,
  ApartmentOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  ExportOutlined,
  TeamOutlined,
  UserAddOutlined,
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import {
  Avatar,
  Button,
  Card,
  List,
  Progress,
  Space,
  Table,
  Tag,
} from 'antd'
import StatCard from '../components/dashboard/StatCard'
import type { RequestRow } from '../types/dashboard'

function DashboardPage() {
  const numberFormatter = new Intl.NumberFormat('en-US')
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    currency: 'USD',
    maximumFractionDigits: 0,
    style: 'currency',
  })

  const statCards = [
    {
      accent: 'linear-gradient(90deg, #4f74e8, #7b9cff)',
      icon: <TeamOutlined />,
      label: 'Users',
      meta: '5 new team members this month',
      value: numberFormatter.format(156),
    },
    {
      accent: 'linear-gradient(90deg, #41c98f, #73e1b2)',
      icon: <ApartmentOutlined />,
      label: 'Departments',
      meta: '4 business units active',
      value: numberFormatter.format(4),
    },
    {
      accent: 'linear-gradient(90deg, #53c3df, #83ddf2)',
      icon: <DollarOutlined />,
      label: 'Monthly payroll',
      meta: 'USD across current cycle',
      value: currencyFormatter.format(1203000),
    },
    {
      accent: 'linear-gradient(90deg, #ffbe45, #ffd575)',
      icon: <ClockCircleOutlined />,
      label: 'Pending approvals',
      meta: '1 urgent approval needs review',
      value: numberFormatter.format(12),
    },
  ]

  const activities = [
    {
      color: '#4f74e8',
      meta: 'Finance and HR documents were cleared this morning.',
      title: '3 requests approved',
    },
    {
      color: '#41c98f',
      meta: 'Attendance is trending higher than last week.',
      title: '92% on-time check-ins',
    },
    {
      color: '#ffbe45',
      meta: 'Operations team exceeded the threshold in the evening shift.',
      title: 'New overtime alert',
    },
  ]

  const requests: RequestRow[] = [
      {
        assignee: 'Dara Sok',
        key: '1',
        priority: 'High',
        status: 'Pending',
        type: 'Leave request',
      },
      {
        assignee: 'Nita Chan',
        key: '2',
        priority: 'Medium',
        status: 'Approved',
        type: 'Payroll review',
      },
      {
        assignee: 'Vannak Lim',
        key: '3',
        priority: 'High',
        status: 'In Review',
        type: 'Overtime request',
      },
      {
        assignee: 'Sreyleak Oun',
        key: '4',
        priority: 'Low',
        status: 'Ready',
        type: 'Profile update',
      },
  ]

  const columns: ColumnsType<RequestRow> = [
    {
      dataIndex: 'type',
      key: 'type',
      title: 'Request type',
    },
    {
      dataIndex: 'assignee',
      key: 'assignee',
      title: 'Assignee',
      render: (value: string) => (
        <Space>
          <Avatar style={{ backgroundColor: '#dce6ff', color: '#3452ba' }}>
            {value
              .split(' ')
              .map((name) => name[0])
              .join('')}
          </Avatar>
          <span>{value}</span>
        </Space>
      ),
    },
    {
      dataIndex: 'priority',
      key: 'priority',
      title: 'Priority',
      render: (value: string) => (
        <Tag
          color={
            value === 'High'
              ? 'error'
              : value === 'Medium'
                ? 'warning'
                : 'default'
          }
        >
          {value}
        </Tag>
      ),
    },
    {
      dataIndex: 'status',
      key: 'status',
      title: 'Status',
      render: (value: string) => (
        <Tag
          color={
            value === 'Approved'
              ? 'success'
              : value === 'Pending'
                ? 'processing'
                : value === 'In Review'
                  ? 'warning'
                  : 'default'
          }
        >
          {value}
        </Tag>
      ),
    },
  ]

  return (
    <>
      <Card className="page-banner">
        <div className="page-banner__content">
          <h2>Employee management overview</h2>
          <p>
            A clean EMS dashboard shell with clear sections for dashboard,
            users, departments, attendance, reports, and settings.
          </p>
        </div>

        <div className="page-banner__actions">
          <Button icon={<ExportOutlined />} size="large">
            Export report
          </Button>
          <Button icon={<UserAddOutlined />} size="large" type="primary">
            Add user
          </Button>
        </div>
      </Card>

      <section className="stats-grid">
        {statCards.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </section>

      <section className="dashboard-grid">
        <Card
          className="panel-card"
          title="Team activity snapshot"
        >
          <List
            className="activity-list"
            dataSource={activities}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{
                        backgroundColor: `${item.color}1a`,
                        color: item.color,
                      }}
                    >
                      <TeamOutlined />
                    </Avatar>
                  }
                  description={
                    <span className="activity-list__meta">{item.meta}</span>
                  }
                  title={
                    <span className="activity-list__title">{item.title}</span>
                  }
                />
              </List.Item>
            )}
          />
        </Card>

        <Space direction="vertical" size="large">
          <Card
            className="panel-card"
            title="Workforce distribution"
          >
            <div className="distribution-wrap">
              <Progress
                percent={76}
                size={180}
                status="active"
                strokeColor={{
                  '0%': '#41c98f',
                  '100%': '#4f74e8',
                }}
                type="dashboard"
              />

              <div className="distribution-legend">
                <div className="distribution-legend__item">
                  <span>Human Resources</span>
                  <strong>18%</strong>
                </div>
                <div className="distribution-legend__item">
                  <span>IT and Product</span>
                  <strong>33%</strong>
                </div>
                <div className="distribution-legend__item">
                  <span>Operations</span>
                  <strong>29%</strong>
                </div>
                <div className="distribution-legend__item">
                  <span>Customer Support</span>
                  <strong>20%</strong>
                </div>
              </div>
            </div>
          </Card>

          <Card className="panel-card" title="Quick actions">
            <div className="quick-actions">
              <div className="quick-action">
                <div className="quick-action__text">
                  <strong>Approvals queue</strong>
                  <span>7 requests waiting for manager review</span>
                </div>
                <ArrowRightOutlined />
              </div>
              <div className="quick-action">
                <div className="quick-action__text">
                  <strong>Department setup</strong>
                  <span>Manage roles, teams, and reporting lines</span>
                </div>
                <ArrowRightOutlined />
              </div>
              <div className="quick-action">
                <div className="quick-action__text">
                  <strong>Backend connection</strong>
                  <span>Plug users, departments, and reports into your API</span>
                </div>
                <ArrowRightOutlined />
              </div>
            </div>
          </Card>
        </Space>
      </section>

      <Card className="panel-card" title="Latest requests and updates">
        <Table<RequestRow>
          columns={columns}
          dataSource={requests}
          pagination={false}
          rowKey="key"
          scroll={{ x: 640 }}
        />
      </Card>
    </>
  )
}

export default DashboardPage

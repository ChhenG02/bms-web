import { CheckCircleOutlined, PlusOutlined, TeamOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import SubSectionNav from '../components/navigation/SubSectionNav'

type UserRow = {
  department: string
  key: string
  name: string
  role: string
  status: 'Active' | 'Invited' | 'On Leave'
}

function UsersPage() {
  const data: UserRow[] = [
    {
      department: 'Operations',
      key: '1',
      name: 'Dara Sok',
      role: 'Operations Lead',
      status: 'Active',
    },
    {
      department: 'HR',
      key: '2',
      name: 'Sreyleak Oun',
      role: 'HR Manager',
      status: 'Active',
    },
    {
      department: 'Finance',
      key: '3',
      name: 'Nita Chan',
      role: 'Payroll Officer',
      status: 'Invited',
    },
    {
      department: 'Product',
      key: '4',
      name: 'Bill Alex',
      role: 'Frontend Engineer',
      status: 'On Leave',
    },
  ]

  const columns: ColumnsType<UserRow> = [
    {
      dataIndex: 'name',
      key: 'name',
      title: 'User',
      render: (value: string) => (
        <Space>
          <Avatar style={{ backgroundColor: '#dce6ff', color: '#3452ba' }}>
            {value
              .split(' ')
              .map((part) => part[0])
              .join('')}
          </Avatar>
          <strong>{value}</strong>
        </Space>
      ),
    },
    { dataIndex: 'role', key: 'role', title: 'Role' },
    { dataIndex: 'department', key: 'department', title: 'Department' },
    {
      dataIndex: 'status',
      key: 'status',
      title: 'Status',
      render: (value: UserRow['status']) => (
        <Tag
          color={
            value === 'Active'
              ? 'success'
              : value === 'Invited'
                ? 'processing'
                : 'warning'
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
        items={['All Users', 'Roles', 'Invitations']}
        title="Users nav"
      />

      <div className="module-main">
        <section className="module-hero">
          <h2>Users workspace</h2>
          <p>
            Manage your employee directory, onboarding flow, roles, and account
            status from a dedicated user management screen.
          </p>
        </section>

        <section className="module-grid module-grid--three">
          <Card className="panel-card">
            <div className="module-stat">
              <span>Total users</span>
              <strong>156</strong>
            </div>
          </Card>
          <Card className="panel-card">
            <div className="module-stat">
              <span>Pending invites</span>
              <strong>09</strong>
            </div>
          </Card>
          <Card className="panel-card">
            <div className="module-stat">
              <span>Active today</span>
              <strong>143</strong>
            </div>
          </Card>
        </section>

        <section className="module-grid module-grid--two">
          <Card
            className="panel-card"
            extra={
              <Button icon={<PlusOutlined />} type="primary">
                Add user
              </Button>
            }
            title="User directory"
          >
            <Table<UserRow>
              columns={columns}
              dataSource={data}
              pagination={false}
              rowKey="key"
            />
          </Card>

          <Card className="panel-card" title="User actions">
            <div className="stack-list">
              <div className="stack-list__item">
                <div>
                  <strong>Assign permissions</strong>
                  <span>Control access per role and team.</span>
                </div>
                <CheckCircleOutlined />
              </div>
              <div className="stack-list__item">
                <div>
                  <strong>Review onboarding</strong>
                  <span>Track invited users before activation.</span>
                </div>
                <TeamOutlined />
              </div>
              <div className="stack-list__item">
                <div>
                  <strong>Sync backend</strong>
                  <span>Connect user records from your API.</span>
                </div>
                <CheckCircleOutlined />
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}

export default UsersPage

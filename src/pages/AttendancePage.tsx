import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { Card, Progress, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import SubSectionNav from '../components/navigation/SubSectionNav'

type ShiftRow = {
  checkIn: string
  key: string
  member: string
  shift: string
  status: 'Late' | 'On Time' | 'Remote'
}

function AttendancePage() {
  const rows: ShiftRow[] = [
    {
      checkIn: '08:02 AM',
      key: '1',
      member: 'Tom Dara',
      shift: 'Morning',
      status: 'On Time',
    },
    {
      checkIn: '08:16 AM',
      key: '2',
      member: 'Bill Chan',
      shift: 'Morning',
      status: 'Late',
    },
    {
      checkIn: '09:00 AM',
      key: '3',
      member: 'Alex Sok',
      shift: 'Remote',
      status: 'Remote',
    },
  ]

  const columns: ColumnsType<ShiftRow> = [
    { dataIndex: 'member', key: 'member', title: 'Member' },
    { dataIndex: 'shift', key: 'shift', title: 'Shift' },
    { dataIndex: 'checkIn', key: 'checkIn', title: 'Check in' },
    {
      dataIndex: 'status',
      key: 'status',
      title: 'Status',
      render: (value: ShiftRow['status']) => (
        <Tag
          color={
            value === 'On Time'
              ? 'success'
              : value === 'Late'
                ? 'error'
                : 'processing'
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
        items={['Daily Log', 'Shifts', 'Overtime']}
        title="Attendance nav"
      />

      <div className="module-main">
        <section className="module-hero">
          <h2>Attendance control center</h2>
          <p>
            Review daily check-ins, shift schedules, remote work, and overtime
            approvals in one focused attendance screen.
          </p>
        </section>

        <section className="module-grid module-grid--three">
          <Card className="panel-card">
            <div className="module-stat">
              <span>On-time check-ins</span>
              <strong>92%</strong>
            </div>
          </Card>
          <Card className="panel-card">
            <div className="module-stat">
              <span>Late arrivals</span>
              <strong>08</strong>
            </div>
          </Card>
          <Card className="panel-card">
            <div className="module-stat">
              <span>Overtime requests</span>
              <strong>06</strong>
            </div>
          </Card>
        </section>

        <section className="module-grid module-grid--two">
          <Card className="panel-card" title="Today attendance log">
            <Table<ShiftRow>
              columns={columns}
              dataSource={rows}
              pagination={false}
              rowKey="key"
            />
          </Card>

          <Card className="panel-card" title="Shift health">
            <div className="stack-list">
              <div className="stack-list__item">
                <div>
                  <strong>Morning shift</strong>
                  <span>36 of 39 employees checked in.</span>
                </div>
                <CalendarOutlined />
              </div>
              <div className="stack-list__item">
                <div>
                  <strong>Evening shift</strong>
                  <span>2 overtime approvals still pending.</span>
                </div>
                <ClockCircleOutlined />
              </div>
            </div>
            <Progress percent={72} strokeColor="#41c98f" style={{ marginTop: 18 }} />
          </Card>
        </section>
      </div>
    </div>
  )
}

export default AttendancePage

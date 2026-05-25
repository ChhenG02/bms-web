import { ApartmentOutlined, NodeIndexOutlined } from '@ant-design/icons'
import { Card, Progress, Tag } from 'antd'
import SubSectionNav from '../components/navigation/SubSectionNav'

function DepartmentsPage() {
  return (
    <div className="module-layout">
      <SubSectionNav
        items={['Structure', 'Managers', 'Permissions']}
        title="Departments nav"
      />

      <div className="module-main">
        <section className="module-hero">
          <h2>Department structure</h2>
          <p>
            Organize business units, assign team leads, and keep reporting
            lines clear from one department screen.
          </p>
        </section>

        <section className="module-grid module-grid--two">
          <Card className="panel-card" title="Business units">
            <div className="stack-list">
              <div className="stack-list__item">
                <div>
                  <strong>Operations</strong>
                  <span>46 members, 4 teams</span>
                </div>
                <Tag color="blue">Lead assigned</Tag>
              </div>
              <div className="stack-list__item">
                <div>
                  <strong>Human Resources</strong>
                  <span>12 members, 2 teams</span>
                </div>
                <Tag color="green">Stable</Tag>
              </div>
              <div className="stack-list__item">
                <div>
                  <strong>Finance</strong>
                  <span>10 members, 1 team</span>
                </div>
                <Tag color="gold">Review</Tag>
              </div>
              <div className="stack-list__item">
                <div>
                  <strong>Product and IT</strong>
                  <span>33 members, 3 teams</span>
                </div>
                <Tag color="purple">Growing</Tag>
              </div>
            </div>
          </Card>

          <Card className="panel-card" title="Department capacity">
            <div className="mini-board">
              <div className="mini-board__row">
                <span className="mini-board__label">Operations</span>
                <div className="mini-board__bar">
                  <span style={{ width: '78%' }} />
                </div>
                <span className="mini-board__meta">78%</span>
              </div>
              <div className="mini-board__row">
                <span className="mini-board__label">HR</span>
                <div className="mini-board__bar">
                  <span style={{ width: '62%' }} />
                </div>
                <span className="mini-board__meta">62%</span>
              </div>
              <div className="mini-board__row">
                <span className="mini-board__label">Finance</span>
                <div className="mini-board__bar">
                  <span style={{ width: '55%' }} />
                </div>
                <span className="mini-board__meta">55%</span>
              </div>
              <div className="mini-board__row">
                <span className="mini-board__label">Product</span>
                <div className="mini-board__bar">
                  <span style={{ width: '84%' }} />
                </div>
                <span className="mini-board__meta">84%</span>
              </div>
            </div>
          </Card>
        </section>

        <section className="module-grid module-grid--two">
          <Card className="panel-card" title="Structure health">
            <Progress percent={86} strokeColor="#2f80f4" />
            <p className="placeholder-note" style={{ marginTop: 16 }}>
              Reporting lines are mapped clearly across most departments, with
              one team pending manager assignment.
            </p>
          </Card>

          <Card className="panel-card" title="Focus areas">
            <div className="stack-list">
              <div className="stack-list__item">
                <div>
                  <strong>Manager assignment</strong>
                  <span>Fill open lead role for Finance.</span>
                </div>
                <ApartmentOutlined />
              </div>
              <div className="stack-list__item">
                <div>
                  <strong>Hierarchy cleanup</strong>
                  <span>Normalize team names before backend sync.</span>
                </div>
                <NodeIndexOutlined />
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}

export default DepartmentsPage

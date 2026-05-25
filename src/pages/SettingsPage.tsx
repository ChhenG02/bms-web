import { Button, Card, Switch } from 'antd'
import SubSectionNav from '../components/navigation/SubSectionNav'

function SettingsPage() {
  return (
    <div className="module-layout">
      <SubSectionNav
        items={['General', 'Access', 'Integrations']}
        title="Settings nav"
      />

      <div className="module-main">
        <section className="module-hero">
          <h2>Workspace settings</h2>
          <p>
            Control system behavior, role permissions, and backend integration
            rules from a separate settings page.
          </p>
        </section>

        <section className="module-grid module-grid--two">
          <Card className="panel-card" title="Workspace preferences">
            <div className="settings-list">
              <div className="settings-row">
                <div>
                  <strong>Auto approve leave balance sync</strong>
                  <span>Keep leave totals refreshed after each request.</span>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="settings-row">
                <div>
                  <strong>Require manager review</strong>
                  <span>Enforce approvals before sensitive profile changes.</span>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="settings-row">
                <div>
                  <strong>Enable report delivery</strong>
                  <span>Send scheduled reports to leadership automatically.</span>
                </div>
                <Switch />
              </div>
            </div>
          </Card>

          <Card className="panel-card" title="Integration actions">
            <div className="quick-actions">
              <Button block size="large" type="primary">
                Connect backend
              </Button>
              <Button block size="large">
                Refresh API token
              </Button>
              <Button block size="large">
                Review audit log
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}

export default SettingsPage

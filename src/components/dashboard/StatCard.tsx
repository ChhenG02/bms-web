import type { ReactNode } from 'react'
import { Card } from 'antd'

type StatCardProps = {
  accent: string
  icon: ReactNode
  label: string
  meta: string
  value: string
}

function StatCard({ accent, icon, label, meta, value }: StatCardProps) {
  return (
    <Card className="stat-card">
      <div className="stat-card__accent" style={{ background: accent }} />
      <div className="stat-card__top">
        <div>
          <span className="stat-card__label">{label}</span>
          <p className="stat-card__value">{value}</p>
          <div className="stat-card__meta">{meta}</div>
        </div>
        <div className="stat-card__icon">{icon}</div>
      </div>
    </Card>
  )
}

export default StatCard

type SubSectionNavProps = {
  items: string[]
  title: string
}

function SubSectionNav({ items, title }: SubSectionNavProps) {
  return (
    <aside className="subnav-card">
      <span className="subnav-card__eyebrow">{title}</span>
      <nav className="subnav-list" aria-label={`${title} navigation`}>
        {items.map((item, index) => (
          <button
            key={item}
            className={`subnav-item${index === 0 ? ' subnav-item--active' : ''}`}
            type="button"
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default SubSectionNav

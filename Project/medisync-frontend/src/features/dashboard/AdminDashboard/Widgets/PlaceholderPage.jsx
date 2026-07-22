import SectionCard from './SectionCard'

export default function PlaceholderPage({ title, description, children }) {
  return (
    <div className="space-y-6">
      <SectionCard title={title}>
        {description && (
          <p className="mb-4 text-sm text-medisync-muted">{description}</p>
        )}
        {children}
      </SectionCard>
    </div>
  )
}

export default function SectionCard({ title, action, children, className = '' }) {
  return (
    <section
      className={`overflow-hidden rounded-2xl border border-medisync-border bg-white shadow-sm ${className}`}
    >
      {title && (
        <div className="flex items-center justify-between border-b border-medisync-border px-5 py-3.5">
          <h2 className="text-sm font-semibold text-medisync-text">{title}</h2>
          {action}
        </div>
      )}
      <div className="p-5">{children}</div>
    </section>
  )
}

import { useParams, NavLink } from 'react-router-dom'
import SectionCard from '../Widgets/SectionCard'

const tabs = [
  { to: '/dashboard/settings/profile', label: 'Profile', slug: 'profile' },
  { to: '/dashboard/settings/notifications', label: 'Notifications', slug: 'notifications' },
  { to: '/dashboard/settings/security', label: 'Security', slug: 'security' },
]

const content = {
  profile: {
    title: 'Profile Settings',
    body: 'Update your admin profile, pharmacy details, and contact information.',
  },
  notifications: {
    title: 'Notification Preferences',
    body: 'Configure email and in-app alerts for stock, billing, and pharmacist updates.',
  },
  security: {
    title: 'Security Settings',
    body: 'Manage passwords, two-factor authentication, and session controls.',
  },
}

export default function Settings() {
  const { section = 'profile' } = useParams()
  const page = content[section] ?? content.profile

  return (
    <div className="space-y-5">
      <div className="flex gap-2 border-b border-medisync-border pb-3">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              `rounded-lg px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? 'bg-medisync-teal text-white'
                  : 'text-medisync-muted hover:bg-gray-100 hover:text-medisync-text'
              }`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>
      <SectionCard title={page.title}>
        <p className="text-sm text-medisync-muted">{page.body}</p>
        <form className="mt-6 max-w-md space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="mb-1 block text-xs font-medium text-medisync-text">
              Display Name
            </label>
            <input
              type="text"
              defaultValue="Admin User"
              className="w-full rounded-lg border border-medisync-border px-3 py-2 text-sm outline-none focus:border-medisync-teal"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-medisync-text">
              Email
            </label>
            <input
              type="email"
              defaultValue="admin@medisync.com"
              className="w-full rounded-lg border border-medisync-border px-3 py-2 text-sm outline-none focus:border-medisync-teal"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-medisync-teal px-5 py-2 text-sm font-medium text-white hover:bg-medisync-teal-dark"
          >
            Save Changes
          </button>
        </form>
      </SectionCard>
    </div>
  )
}

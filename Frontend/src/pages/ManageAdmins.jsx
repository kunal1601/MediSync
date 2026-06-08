import { useParams } from 'react-router-dom'
import { useState, Fragment } from 'react'
import { Trash2, Plus } from 'lucide-react'
import SectionCard from '../components/SectionCard'
import { admins as initialAdmins } from '../data/dummyData'

export default function ManageAdmins() {
  const { section } = useParams()
  const isRoles = section === 'roles'

  return (
    <div className="space-y-5">
      <SectionCard title={isRoles ? 'Roles & Permissions' : 'Manage Admins'}>
        {isRoles ? (
          <div className="space-y-3 text-sm">
            <div className="rounded-lg border border-medisync-border p-4">
              <p className="font-semibold">Super Admin</p>
              <p className="mt-1 text-medisync-muted">
                Full access to all modules, settings, and user management.
              </p>
            </div>
            <div className="rounded-lg border border-medisync-border p-4">
              <p className="font-semibold">Admin</p>
              <p className="mt-1 text-medisync-muted">
                Manage pharmacists, inventory, and billing. Limited settings access.
              </p>
            </div>
          </div>
        ) : (
          <AdminsManager />
        )}
      </SectionCard>
    </div>
  )
}

function AdminsManager() {
  const [adminsList, setAdminsList] = useState(initialAdmins)
  const [showForm, setShowForm] = useState(false)
  const [selectedAdmin, setSelectedAdmin] = useState(null)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    dob: '',
    role: 'Admin',
    email: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: value }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    const newAdmin = {
      id: Date.now(),
      name: `${form.firstName} ${form.lastName}`.trim(),
      role: form.role,
      email: form.email,
      contact: form.contact,
      dob: form.dob,
    }
    setAdminsList((c) => [newAdmin, ...c])
    setForm({ firstName: '', lastName: '', contact: '', dob: '', role: 'Admin', email: '' })
    setShowForm(false)
  }

  const handleDelete = (id) => {
    setAdminsList((c) => c.filter((a) => a.id !== id))
    if (selectedAdmin?.id === id) setSelectedAdmin(null)
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div />
        <div>
          <button
            type="button"
            onClick={() => setShowForm((s) => !s)}
            className="flex items-center gap-2 rounded-lg bg-medisync-teal px-3 py-2 text-sm font-semibold text-white"
          >
            <Plus className="h-4 w-4" /> Add Admin
          </button>
        </div>
      </div>

      {showForm && (
        <SectionCard>
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#8fd4cf] via-[#6ec4c0] to-[#4eada7] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
            <div
              className="absolute inset-0 opacity-80"
              style={{
                backgroundImage: 'url(/auth-bg-pattern.svg)',
                backgroundRepeat: 'repeat',
                backgroundSize: '320px 320px',
              }}
            />
            <div className="relative z-10 mx-auto w-full max-w-3xl rounded-[28px] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
              <h1 className="mb-1 text-center text-[26px] font-bold tracking-tight text-slate-900 sm:text-[28px]">
                Add New Admin
              </h1>
              <p className="mb-8 text-center text-sm font-medium text-slate-600">
                Create a new admin account for your pharmacy dashboard.
              </p>
              <form onSubmit={handleSave} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500" htmlFor="firstName">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="Enter first name"
                      required
                      className="w-full rounded-xl border-0 bg-slate-100 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-[#5ab8b2]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500" htmlFor="lastName">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Enter last name"
                      required
                      className="w-full rounded-xl border-0 bg-slate-100 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-[#5ab8b2]"
                    />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500" htmlFor="contact">
                      Contact Number
                    </label>
                    <input
                      id="contact"
                      name="contact"
                      value={form.contact}
                      onChange={handleChange}
                      placeholder="Enter contact number"
                      required
                      className="w-full rounded-xl border-0 bg-slate-100 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-[#5ab8b2]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500" htmlFor="dob">
                      Date of Birth
                    </label>
                    <input
                      id="dob"
                      name="dob"
                      value={form.dob}
                      onChange={handleChange}
                      type="date"
                      className="w-full rounded-xl border-0 bg-slate-100 px-4 py-3.5 text-sm text-slate-900 outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-[#5ab8b2]"
                    />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500" htmlFor="role">
                      Role
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      className="w-full rounded-xl border-0 bg-slate-100 px-4 py-3.5 text-sm text-slate-900 outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-[#5ab8b2]"
                    >
                      <option>Admin</option>
                      <option>Super Admin</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="Enter email address"
                      className="w-full rounded-xl border-0 bg-slate-100 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-[#5ab8b2]"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="cursor-pointer rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 cursor-pointer rounded-xl bg-[#5ab8b2] px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#4eada7]"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </SectionCard>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#eef5f8]">
              <th className="px-4 py-3 text-left font-semibold">Name</th>
              <th className="px-4 py-3 text-left font-semibold">Role</th>
              <th className="px-4 py-3 text-left font-semibold">Email</th>
              <th className="px-4 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {adminsList.map((a) => (
              <Fragment key={a.id}>
                <tr
                  onClick={() => setSelectedAdmin(a)}
                  className="border-b border-medisync-border hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-4 py-3 font-medium">{a.name}</td>
                  <td className="px-4 py-3">{a.role}</td>
                  <td className="px-4 py-3">{a.email}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleDelete(a.id) }}
                      className="text-red-600 hover:text-red-800"
                      aria-label="Delete admin"
                    >
                      <Trash2 className="inline h-4 w-4" />
                    </button>
                  </td>
                </tr>
                {selectedAdmin?.id === a.id && (
                  <tr className="bg-slate-50">
                    <td colSpan={4} className="px-4 py-4">
                      <div className="grid gap-3 sm:grid-cols-3">
                        <div>
                          <p className="text-xs text-medisync-muted">Name</p>
                          <p className="font-semibold">{a.name}</p>
                        </div>
                        <div>
                          <p className="text-xs text-medisync-muted">Contact</p>
                          <p className="font-semibold">{a.contact || '-'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-medisync-muted">DOB</p>
                          <p className="font-semibold">{a.dob || '-'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-medisync-muted">Role</p>
                          <p className="font-semibold">{a.role}</p>
                        </div>
                        <div>
                          <p className="text-xs text-medisync-muted">Email</p>
                          <p className="font-semibold">{a.email}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

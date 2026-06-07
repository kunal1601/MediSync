import { useState, Fragment } from 'react'
import { UserPlus, Settings } from 'lucide-react'
import SectionCard from '../components/SectionCard'
import { pharmacists } from '../data/dummyData'

const initialFormState = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  contact: '',
  dob: '',
  joined: '',
  adhar: '',
  shift: '',
  address: '',
  rememberMe: false,
}

export default function ManagePharmacist() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [pharmacistsList, setPharmacistsList] = useState(pharmacists)
  const [selectedPharmacist, setSelectedPharmacist] = useState(null)
  const [formData, setFormData] = useState(initialFormState)

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleAddUserSubmit = (event) => {
    event.preventDefault()
    const newUser = {
      id: Date.now(),
      name: formData.fullName || 'New Pharmacist',
      degree: 'B.Pharm',
      shift: formData.shift || '09.00 AM - 05.00 PM',
      contact: formData.contact,
      avatar: 'https://i.pravatar.cc/150?img=55',
      dob: formData.dob || '',
      aadhar: formData.adhar,
      joined: formData.joined || new Date().toISOString().slice(0, 10),
      address: formData.address,
      email: formData.email,
    }
    setPharmacistsList((current) => [newUser, ...current])
    setFormData(initialFormState)
    setShowAddForm(false)
  }

  const handleAddUserToggle = () => {
    setShowAddForm((current) => !current)
  }

  const handleRowToggle = (pharmacist) => {
    setSelectedPharmacist((current) =>
      current?.id === pharmacist.id ? null : pharmacist
    )
  }

  return (
    <div className="space-y-5">
      <SectionCard>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-medisync-teal/15">
              <UserPlus size={28} className="text-medisync-teal" />
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight text-medisync-text md:text-2xl">
                Manage All Pharmacists
                <br />
                At One Place
              </h1>
              <div className="relative mt-4">
                <button
                  type="button"
                  onClick={handleAddUserToggle}
                  className="cursor-pointer flex items-center gap-2 rounded-lg border border-medisync-border bg-white px-4 py-2 text-sm font-medium text-medisync-text transition hover:border-medisync-teal hover:text-medisync-teal"
                >
                  <UserPlus size={16} />
                  {showAddForm ? 'Close Form' : 'Add User'}
                </button>
              </div>
            </div>
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSettings((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-medisync-border text-medisync-muted transition hover:border-medisync-teal hover:text-medisync-teal"
              aria-label="Settings"
            >
              <Settings size={18} />
            </button>
            {showSettings && (
              <div className="absolute right-0 top-full z-10 mt-1 w-44 rounded-lg border border-medisync-border bg-white py-1 shadow-lg">
                <button
                  type="button"
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                  onClick={() => setShowSettings(false)}
                >
                  Table Columns
                </button>
                <button
                  type="button"
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                  onClick={() => setShowSettings(false)}
                >
                  Export Data
                </button>
              </div>
            )}
          </div>
        </div>
      </SectionCard>

      {showAddForm && (
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
                Pharmacist Credentials
              </h1>
              <p className="mb-8 text-center text-sm font-medium text-slate-600">
                Create your account to get started
              </p>
              <form onSubmit={handleAddUserSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500" htmlFor="fullName">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleFormChange}
                    placeholder="Enter your Full Name"
                    required
                    className="w-full rounded-xl border-0 bg-slate-100 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-[#5ab8b2]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="Enter your Email"
                    required
                    className="w-full rounded-xl border-0 bg-slate-100 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-[#5ab8b2]"
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500" htmlFor="password">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleFormChange}
                      placeholder="Enter your Password"
                      required
                      className="w-full rounded-xl border-0 bg-slate-100 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-[#5ab8b2]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500" htmlFor="confirmPassword">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleFormChange}
                      placeholder="Confirm Your Password"
                      required
                      className="w-full rounded-xl border-0 bg-slate-100 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-[#5ab8b2]"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500" htmlFor="contact">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    name="contact"
                    id="contact"
                    value={formData.contact}
                    onChange={handleFormChange}
                    placeholder="Enter your contact number"
                    required
                    className="w-full rounded-xl border-0 bg-slate-100 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-[#5ab8b2]"
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500" htmlFor="dob">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dob"
                      id="dob"
                      value={formData.dob}
                      onChange={handleFormChange}
                      className="w-full rounded-xl border-0 bg-slate-100 px-4 py-3.5 text-sm text-slate-900 outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-[#5ab8b2]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500" htmlFor="joined">
                      Date of Joining
                    </label>
                    <input
                      type="date"
                      name="joined"
                      id="joined"
                      value={formData.joined}
                      onChange={handleFormChange}
                      className="w-full rounded-xl border-0 bg-slate-100 px-4 py-3.5 text-sm text-slate-900 outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-[#5ab8b2]"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500" htmlFor="shift">
                    Working Shift
                  </label>
                  <select
                    name="shift"
                    id="shift"
                    value={formData.shift}
                    onChange={handleFormChange}
                    className="w-full rounded-xl border-0 bg-slate-100 px-4 py-3.5 text-sm text-slate-900 outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-[#5ab8b2]"
                  >
                    <option value="">Select shift</option>
                    <option value="06.00 AM - 02.00 PM">06.00 AM - 02.00 PM</option>
                    <option value="02.00 PM - 10.00 PM">02.00 PM - 10.00 PM</option>
                    <option value="10.00 PM - 06.00 AM">10.00 PM - 06.00 AM</option>
                    <option value="09.00 AM - 05.00 PM">09.00 AM - 05.00 PM</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500" htmlFor="adhar">
                    Adhar ID
                  </label>
                  <input
                    type="text"
                    name="adhar"
                    id="adhar"
                    value={formData.adhar}
                    onChange={handleFormChange}
                    placeholder="Enter your Adhar ID"
                    required
                    className="w-full rounded-xl border-0 bg-slate-100 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-[#5ab8b2]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500" htmlFor="address">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={formData.address}
                    onChange={handleFormChange}
                    placeholder="Enter your Address"
                    required
                    className="w-full rounded-xl border-0 bg-slate-100 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-[#5ab8b2]"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleFormChange}
                    className="h-4 w-4 rounded border-slate-300 text-[#4eada7] focus:ring-[#4eada7]"
                  />
                  <label htmlFor="rememberMe" className="text-sm text-slate-600">
                    Remember me
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="cursor-pointer rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 cursor-pointer rounded-xl bg-[#5ab8b2] py-3.5 text-base font-semibold text-white shadow-md transition hover:bg-[#4eada7]"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </SectionCard>
      )}

      <SectionCard title="Details">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px] text-sm">
            <thead>
              <tr className="bg-[#eef5f8]">
                <th className="px-4 py-3 text-left font-semibold text-medisync-text">
                  Pharmacist Name
                </th>
                <th className="px-4 py-3 text-left font-semibold text-medisync-text">
                  Shift - Time
                </th>
                <th className="px-4 py-3 text-left font-semibold text-medisync-text">
                  Contact Number
                </th>
              </tr>
            </thead>
            <tbody>
              {pharmacistsList.map((p) => (
                <Fragment key={p.id}>
                  <tr
                    onClick={() => handleRowToggle(p)}
                    className="cursor-pointer border-b border-medisync-border transition hover:bg-gray-50"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.avatar}
                          alt={p.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-medisync-text">{p.name}</p>
                          <p className="text-xs text-medisync-muted">{p.degree}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-medisync-text">{p.shift}</td>
                    <td className="px-4 py-4 text-medisync-text">{p.contact}</td>
                  </tr>
                  {selectedPharmacist?.id === p.id && (
                    <tr className="bg-slate-50">
                      <td colSpan={3} className="px-4 py-4">
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          <div>
                            <p className="text-[11px] uppercase tracking-[.2em] text-medisync-muted">Date of Birth</p>
                            <p className="mt-2 text-sm font-semibold text-medisync-text">{p.dob}</p>
                          </div>
                          <div>
                            <p className="text-[11px] uppercase tracking-[.2em] text-medisync-muted">Aadhar no</p>
                            <p className="mt-2 text-sm font-semibold text-medisync-text">{p.aadhar}</p>
                          </div>
                          <div>
                            <p className="text-[11px] uppercase tracking-[.2em] text-medisync-muted">Joined</p>
                            <p className="mt-2 text-sm font-semibold text-medisync-text">{p.joined}</p>
                          </div>
                          <div>
                            <p className="text-[11px] uppercase tracking-[.2em] text-medisync-muted">Working shift</p>
                            <p className="mt-2 text-sm font-semibold text-medisync-text">{p.shift}</p>
                          </div>
                          <div>
                            <p className="text-[11px] uppercase tracking-[.2em] text-medisync-muted">Contact</p>
                            <p className="mt-2 text-sm font-semibold text-medisync-text">{p.contact}</p>
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
      </SectionCard>
    </div>
  )
}

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AdminLoginPage from './features/auth/components/AdminLoginPage'
import AdminSignupPage from './features/auth/components/AdminSignupPage'
import PharmacistLoginPage from './features/auth/components/PharmacistLoginPage'
import PharmacistSignupPage from './features/auth/components/PharmacistSignupPage'
import AdminLayout from './layouts/AdminLayout'
import PharmacistLayout from './layouts/PharmacistLayout'
import PharmacistDashboardPage from './features/dashboard/components/PharmacistDashboardPage'
import Dashboard from './pages/Dashboard'
import ManagePharmacist from './pages/ManagePharmacist'
import Alerts from './pages/Alerts'
import Billings from './pages/Billings'
import Inventory from './pages/Inventory'
import Settings from './pages/Settings'
import ManageAdmins from './pages/ManageAdmins'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login/admin" replace />} />

        {/* Auth */}
        <Route path="/login/admin" element={<AdminLoginPage />} />
        <Route path="/signup/admin" element={<AdminSignupPage />} />
        <Route path="/login/pharmacist" element={<PharmacistLoginPage />} />
        <Route path="/signup/pharmacist" element={<PharmacistSignupPage />} />

        {/* Admin dashboard (owner) */}
        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<Navigate to="/dashboard/owner" replace />} />
          <Route path="owner" element={<Dashboard />} />
          <Route path="manage-pharmacist" element={<ManagePharmacist />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="billings" element={<Billings />} />
          <Route path="settings" element={<Navigate to="/dashboard/settings/profile" replace />} />
          <Route path="settings/:section" element={<Settings />} />
          <Route path="manage-admins" element={<ManageAdmins />} />
          <Route path="manage-admins/:section" element={<ManageAdmins />} />
          <Route path="inventory-status" element={<Inventory />} />
        </Route>

        {/* Pharmacist workspace */}
        <Route path="/dashboard/pharmacist" element={<PharmacistLayout />}>
          <Route index element={<PharmacistDashboardPage />} />
          <Route
            path="billing"
            element={
              <div className="text-left font-bold text-slate-700">
                Smart Billing Console Workspace
              </div>
            }
          />
          <Route
            path="stock-details"
            element={
              <div className="text-left font-bold text-slate-700">
                Pharmacy Medical Supply Matrix Ledger
              </div>
            }
          />
          <Route
            path="history"
            element={
              <div className="text-left font-bold text-slate-700">
                Completed Store Logs &amp; Invoicing Logs
              </div>
            }
          />
        </Route>

        <Route
          path="*"
          element={
            <div className="p-8 text-left font-bold text-red-500">
              404 — Page not found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

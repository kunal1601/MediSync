import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLoginPage from './features/auth/components/AdminLoginPage';
import PharmacistLoginPage from './features/auth/components/PharmacistLoginPage';
import AdminLayout from './layouts/AdminLayout';
import PharmacistLayout from './layouts/PharmacistLayout';

// Dashboards
import Dashboard from './features/dashboard/AdminDashboard/Dashboard';
import PharmacistDashboardPage from './features/dashboard/PharmacistDahboard/PharmacistDashboardPage';

// Pharmacist Features
import BillingPage from './features/billing/components/BillingPage';
import StockDetailsPage from "./features/stock/components/StockDetailsPage";
import PharmacistAlertsPage from './features/alerts/components/PharmacistAlertsPage';
import BillHistoryPage from "./features/billing/components/BillHistoryPage";

// Admin Sub-pages
import ManagePharmacist from './features/dashboard/AdminDashboard/pages/ManagePharmacist';
import Alerts from './features/dashboard/AdminDashboard/pages/Alerts';
import Billings from './features/dashboard/AdminDashboard/pages/Billings';
import Inventory from './features/dashboard/AdminDashboard/pages/Inventory';
import Settings from './features/dashboard/AdminDashboard/pages/Settings';
import ManageAdmins from './features/dashboard/AdminDashboard/pages/ManageAdmins';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login/admin" replace />} />

        {/* Core Access Boundaries */}
        <Route path="/login/admin" element={<AdminLoginPage />} />
        <Route path="/login/pharmacist" element={<PharmacistLoginPage />} />

        {/* MASTER ADMIN CHANNELS */}
        <Route path="/dashboard" element={<AdminLayout />}>
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

        {/* MASTER PHARMACIST CHANNELS */}
        <Route path="/dashboard/pharmacist" element={<PharmacistLayout />}>
          <Route index element={<PharmacistDashboardPage />} />
          <Route path="billing" element={<BillingPage />} />
          <Route path="stock-details" element={<StockDetailsPage />} />
          <Route path="history" element={<BillHistoryPage />} />
          <Route path="alerts" element={<PharmacistAlertsPage />} />
        </Route>

        <Route path="*" element={<div className="p-8 font-bold text-red-500 text-left">404 - Workspace Area Missing</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

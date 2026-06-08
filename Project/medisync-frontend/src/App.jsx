import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLoginPage from './features/auth/components/AdminLoginPage';
import PharmacistLoginPage from './features/auth/components/PharmacistLoginPage';
import AdminLayout from './layouts/AdminLayout';
import PharmacistLayout from './layouts/PharmacistLayout';
import OwnerDashboardPage from './features/dashboard/components/OwnerDashboardPage';
import PharmacistDashboardPage from './features/dashboard/components/PharmacistDashboardPage'; // 👈 Import new panel component
import StockDetailsPage from "./features/stock/components/StockDetailsPage";
import PharmacistAlertsPage from './features/alerts/components/PharmacistAlertsPage';
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
          <Route path="owner" element={<OwnerDashboardPage />} />
          <Route path="manage-pharmacist" element={<div className="text-left font-bold text-slate-700">Manage Pharmacist View Panel</div>} />
          <Route path="alerts" element={<div className="text-left font-bold text-slate-700">System Notification Activity Logs</div>} />
          <Route path="billings" element={<div className="text-left font-bold text-slate-700">Pharmacy Invoices Master Register</div>} />
          <Route path="settings" element={<div className="text-left font-bold text-slate-700">System Parameters Core Settings</div>} />
          <Route path="manage-admins" element={<div className="text-left font-bold text-slate-700">Admin Privileges Controller Space</div>} />
          <Route path="inventory-status" element={<div className="text-left font-bold text-slate-700">Pharmacy Medical Supply Matrix</div>} />
        </Route>

        {/* MASTER PHARMACIST CHANNELS */}
        <Route path="/dashboard/pharmacist" element={<PharmacistLayout />}>
          <Route index element={<PharmacistDashboardPage />} /> {/* 👈 Swapped placeholder out */}
          <Route path="billing" element={<div className="text-left font-bold text-slate-700">Smart Billing Console Workspace</div>} />
          <Route path="stock-details" element={<StockDetailsPage />} />
          <Route path="history" element={<div className="text-left font-bold text-slate-700">Completed Store Logs & Invoicing Logs</div>} />
          <Route path="alerts" element={<PharmacistAlertsPage />}/>
        </Route>
        
        <Route path="*" element={<div className="p-8 font-bold text-red-500 text-left">404 - Workspace Area Missing</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
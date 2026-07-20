import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Bell, 
  Receipt, 
  Settings, 
  ShieldCheck, 
  PackageCheck, 
  ChevronRight, 
  LogOut 
} from 'lucide-react';
import Logo from '../shared/components/Logo';

/**
 * Layout Component: AdminLayout Framework
 * Locks Header & Sidebar frameworks around children routes natively.
 */
const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation schema mirroring the Figma spec menu list items
  const menuItems = [
    { label: 'Dashboard', path: '/dashboard/owner', icon: LayoutDashboard },
    { label: 'Manage Pharmacist', path: '/dashboard/manage-pharmacist', icon: Users },
    { label: 'Alerts', path: '/dashboard/alerts', icon: Bell },
    { label: 'Billings', path: '/dashboard/billings', icon: Receipt },
    { label: 'Settings', path: '/dashboard/settings', icon: Settings, hasSubmenu: true },
    { label: 'Manage Admins', path: '/dashboard/manage-admins', icon: ShieldCheck, hasSubmenu: true },
    { label: 'Inventory Status', path: '/dashboard/inventory-status', icon: PackageCheck },
  ];

  return (
    <div className="min-h-screen w-full bg-[#e2e8f0] flex flex-col font-sans select-none">
      
      {/* 1. TOP BRAND HEADER RIBBON BAR */}
      <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center shadow-sm z-20">
        {/* Render the clean, clickable navbar logo variant aligned to grid columns */}
        <div className="w-64 flex items-center justify-start pl-2">
          <Logo variant="navbar" />
        </div>
      </header>

      {/* LOWER WORKSPACE FLEX SPLIT CONTAINER */}
      <div className="flex flex-1 min-h-0">
        
        {/* 2. PERSISTENT LEFT SIDEBAR PANEL LAYER */}
        <aside className="w-72 bg-white border-r border-slate-200 flex flex-col justify-between shadow-sm z-10">
          <nav className="p-4 py-6 space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className={`w-full px-4 py-3.5 rounded-xl flex items-center justify-between text-sm font-semibold transition group cursor-pointer
                    ${isActive 
                      ? 'bg-brand-primary/10 text-brand-primary' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                    }`}
                >
                  <div className="flex items-center gap-3.5">
                    <Icon className={`w-5 h-5 transition ${isActive ? 'text-brand-primary' : 'text-slate-400 group-hover:text-slate-600'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.hasSubmenu && (
                    <ChevronRight className={`w-4 h-4 text-slate-400 group-hover:text-slate-600 transition`} />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Persistent Session Disconnect Trigger */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/50">
            <button
              onClick={() => navigate('/login/admin')}
              className="w-full px-4 py-3 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-3 transition cursor-pointer"
            >
              <LogOut className="w-5 h-5 text-rose-500" />
              <span>Sign Out Session</span>
            </button>
          </div>
        </aside>

        {/* 3. CORE DYNAMIC DISPLAY SLATE CANVAS (Outlet Area) */}
       <main className="flex-1 h-[calc(100vh-5rem)] overflow-y-auto p-8 min-w-0">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;
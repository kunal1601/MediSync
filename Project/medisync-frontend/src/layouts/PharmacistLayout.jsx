import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  History, 
  Receipt, 
  PackageSearch, 
  ChevronRight, 
  LogOut 
} from 'lucide-react';
import Logo from '../shared/components/Logo';

/**
 * Layout Component: PharmacistLayout Framework
 * Aligned with the design constraints in image_0f704d.png
 */
const PharmacistLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation schema explicitly mirroring the layout items in image_0f704d.png
  const menuItems = [
    { label: 'Dashboard', path: '/dashboard/pharmacist', icon: LayoutDashboard },
    { label: 'Bills History', path: '/dashboard/pharmacist/history', icon: History },
    { label: 'Billings', path: '/dashboard/pharmacist/billing', icon: Receipt },
    { label: 'Stock Details', path: '/dashboard/pharmacist/stock-details', icon: PackageSearch, hasSubmenu: true },
  ];

  return (
    <div className="min-h-screen w-full bg-[#e2e8f0] flex flex-col font-sans select-none">
      
      {/* CLAMPED TOP NAVBAR CONTAINER */}
      <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center shadow-sm z-20">
        <div className="w-64 flex items-center justify-start pl-2">
          <Logo variant="navbar" />
        </div>
        <div className="flex-1 flex justify-end items-center pr-2">
          <span className="text-[10px] bg-teal-50 text-teal-700 border border-teal-200 font-bold px-2.5 py-1 rounded-md tracking-wider">
            PHARMACIST DESK
          </span>
        </div>
      </header>

      {/* LOWER SPLIT CANVAS */}
      <div className="flex flex-1 min-h-0">
        
        {/* SIDEBAR NAVIGATION PANEL */}
        <aside className="w-72 bg-white border-r border-slate-200 flex flex-col justify-between shadow-sm z-10">
          <nav className="p-4 py-6 space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className={`w-full px-4 py-3.5 rounded-xl flex items-center justify-between text-sm font-semibold transition group cursor-pointer text-left
                    ${isActive 
                      ? 'bg-brand-secondary/10 text-brand-secondary' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                    }`}
                >
                  <div className="flex items-center gap-3.5">
                    <Icon className={`w-5 h-5 transition ${isActive ? 'text-brand-secondary' : 'text-slate-400 group-hover:text-slate-600'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.hasSubmenu && (
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Sign Out Route Anchor */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/50">
            <button
              onClick={() => navigate('/login/pharmacist')}
              className="w-full px-4 py-3 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-3 transition cursor-pointer"
            >
              <LogOut className="w-5 h-5 text-rose-500" />
              <span>Sign Out Session</span>
            </button>
          </div>
        </aside>

        {/* DYNAMIC VIEWS HOOK */}
        <main className="flex-1 p-8 overflow-y-auto min-w-0">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default PharmacistLayout;

import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  History, 
  Receipt, 
  PackageSearch, 
  ChevronRight, 
  LogOut ,
  Bell
} from 'lucide-react';
import Logo from '../shared/components/Logo';
import { useState, useEffect, useRef } from 'react';

/**
 * Layout Component: PharmacistLayout Framework
 * Aligned with the design constraints in image_0f704d.png
 */
const PharmacistLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAlertsPage =
  location.pathname === "/dashboard/pharmacist/alerts";
  const [showAlerts, setShowAlerts] = useState(false);
  const alertRef = useRef(null);
  const latestAlerts = [
    {
      id: 1,
      medicine: "Paracetamol 500mg",
      alert: "Out Of Stock"
    },
    {
      id: 2,
      medicine: "Amoxicillin 250mg",
      alert: "Near Expiry"
    },
    {
      id: 3,
      medicine: "Pantoprazole",
      alert: "Expired"
    }
  ];
  // Navigation schema explicitly mirroring the layout items in image_0f704d.png
  const menuItems = [
    { label: 'Dashboard', path: '/dashboard/pharmacist', icon: LayoutDashboard },
    { label: 'Bills History', path: '/dashboard/pharmacist/history', icon: History },
    { label: 'Billings', path: '/dashboard/pharmacist/billing', icon: Receipt },
    { label: 'Stock Details', path: '/dashboard/pharmacist/stock-details', icon: PackageSearch, hasSubmenu: true },
    { label: 'Alerts',  path: '/dashboard/pharmacist/alerts', icon: Bell},
  ];
  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      alertRef.current &&
      !alertRef.current.contains(event.target)
    ) {
      setShowAlerts(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, []);

  return (
    <div className="min-h-screen w-full bg-[#e2e8f0] flex flex-col font-sans select-none">
      
      {/* CLAMPED TOP NAVBAR CONTAINER */}
      <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center shadow-sm z-20">
        <div className="w-64 flex items-center justify-start pl-2">
          <Logo variant="navbar" />
        </div>
        <div className="flex-1 flex justify-end items-center gap-6 pr-2">

           {/* ALERT ICON */}
            {!isAlertsPage && (<div ref={alertRef} className="relative">

              <button
                onClick={() => setShowAlerts(!showAlerts)}
                className="
                  relative
                  p-2
                  rounded-full
                 border border-slate-200 hover:border-brand-secondary hover:bg-teal-50 transition cursor-pointer
                "
              >
                <Bell className="w-6 h-6 text-slate-600" />

                {/* Notification Count */}
                <span
                  className="
                    absolute
                    -top-1
                    -right-1
                    bg-red-500
                    text-white
                    text-[10px]
                    w-5
                    h-5
                    rounded-full
                    flex
                    items-center
                    justify-center
                    font-bold
                  "
                >
                  {latestAlerts.length}
                </span>
              </button>

              {/* ALERT POPUP */}
              {showAlerts && (
                <div
                  className="
                    absolute
                    right-0
                    mt-3
                    w-80  
                    bg-white
                    border
                    border-slate-300
                    rounded-xl
                    shadow-lg
                    z-50
                  "
                >
                  <div className="px-4 py-3 border-b-0">
                    <h3 className="font-bold text-slate-700">
                      Latest Alerts
                    </h3>
                  </div>

                  {latestAlerts.map((item) => (
                    <div
                      key={item.id}
                      className="px-4 py-3 border-b border-slate-100 last:border-b-0 hover:bg-teal-50 transition  cursor-pointer"
                    >
                      <p className="font-semibold text-sm">
                        {item.medicine}
                      </p>

                      <p className="text-xs text-red-500">
                        {item.alert}
                      </p>
                    </div>
                  ))}

                  {/* VIEW ALL ALERTS */}
                  <button
                    onClick={() => {
                      navigate('/dashboard/pharmacist/alerts');
                      setShowAlerts(false);
                    }}
                    className="
                      w-full
                      py-3
                      text-sm
                      font-semibold
                      text-brand-secondary
                      hover:bg-teal-50 border-t  border-slate-100 transition cursor-pointer
                    "
                  >
                    View All Alerts
                  </button>
                </div>
              )}
            </div>
            )}
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
      <main className="flex-1 h-[calc(100vh-5rem)] overflow-y-auto p-8 min-w-0">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default PharmacistLayout;

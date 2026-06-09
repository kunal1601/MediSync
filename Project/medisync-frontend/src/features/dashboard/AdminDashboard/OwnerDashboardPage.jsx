/**
 * View Component: Owner Dashboard Main Stats Board
 * Injected automatically into the standard layout container framework
 */
const OwnerDashboardPage = () => {
  return (
    <div className="space-y-6 animate-fadeIn text-left">
      {/* Dynamic greeting section */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Welcome Back, Admin</h2>
        <p className="text-sm text-slate-500 font-medium">Here is your live retail pharmacy metrics overview stream.</p>
      </div>

      {/* METRICS ROW */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Today's Gross Sales", value: "₹24,530.00", style: "border-l-brand-primary text-brand-primary bg-white" },
          { label: "Invoices Generated", value: "142 Bills", style: "border-l-brand-secondary text-brand-secondary bg-white" },
          { label: "Stock Discrepancies", value: "0 Lines", style: "border-l-emerald-600 text-emerald-600 bg-white" },
          { label: "Critical Batch Expiries", value: "4 Items", style: "border-l-alert-expiry text-alert-expiry bg-white" }
        ].map((card, idx) => (
          <div key={idx} className={`p-6 rounded-2xl shadow-sm border border-slate-200 border-l-4 flex flex-col items-start ${card.style}`}>
            <span className="text-xs font-bold text-slate-400 mb-1 tracking-wider uppercase">{card.label}</span>
            <span className="text-2xl font-bold tracking-tight text-slate-800">{card.value}</span>
          </div>
        ))}
      </section>

      {/* GRAPH PLACEMENT HOOK PLACES */}
      <div className="w-full bg-white p-8 rounded-2xl border border-slate-200 min-h-[400px] flex flex-col justify-between shadow-sm">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Sales Trends Visualization</h3>
          <p className="text-xs text-slate-400 font-medium">Realtime streaming pipeline monitoring data graphs</p>
        </div>
        <div className="flex-1 bg-slate-50 border border-dashed border-slate-200 rounded-xl my-6 flex items-center justify-center font-semibold text-slate-400">
          [ Ready for Live Sales Trend Chart Spec Inputs ]
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboardPage;
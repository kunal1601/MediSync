import { useState } from 'react';
import Calendar from "react-calendar";
import "../styles/style.css";
import "react-calendar/dist/Calendar.css";
/**
 * View Component: Pharmacist Interactive Analytics Panel
 * Renders filter controls and stock tracking charts matching image_0f704d.png
 */
const PharmacistDashboardPage = () => {
  const [activeFilter, setActiveFilter] = useState('By Most Sold');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const filterTabs = ['By Drug Type', 'By Company Name', 'By year', 'By Most Sold'];

  // Data map replicating the dynamic visual values in the design chart
  const chartData = [
    { category: 'Tablets', value: 450, total: 4800, color: 'bg-[#5bc0be]' },
    { category: 'Ointments', value: 400, total: 4800, color: 'bg-[#5bc0be]' },
    { category: 'Drops', value: 400, total: 4800, color: 'bg-[#5bc0be]' },
    { category: 'Injections', value: 420, total: 4800, color: 'bg-[#5bc0be]' },
    { category: 'Capsules', value: 3950, total: 4800, color: 'bg-[#5bc0be]', pattern: true },
    { category: 'Syrups', value: 4800, total: 4800, color: 'bg-[#5bc0be]' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn text-left">
     {/* Welcome Banner */}
<div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
    <h1 className="text-2xl font-bold text-slate-800">
        Good Morning, Pharmacist 👋
    </h1>

    <p className="text-slate-500 mt-2">
        Here's today's pharmacy performance overview.
    </p>
</div>

{/* Statistics Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <p className="text-slate-500 text-sm">Total Sales</p>
        <h2 className="text-3xl font-bold text-brand-secondary mt-2">
            ₹52,450
        </h2>
    </div>

    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <p className="text-slate-500 text-sm">Bills Today</p>
        <h2 className="text-3xl font-bold text-brand-secondary mt-2">
            125
        </h2>
    </div>

    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <p className="text-slate-500 text-sm">Low Stock Items</p>
        <h2 className="text-3xl font-bold text-orange-500 mt-2">
            12
        </h2>
    </div>

    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <p className="text-slate-500 text-sm">Expiring Medicines</p>
        <h2 className="text-3xl font-bold text-red-500 mt-2">
            8
        </h2>
    </div>

</div>

{/* Alerts + Calendar + Top Selling */}
<div className="grid grid-cols-1 xl:grid-cols-5 gap-6">

    {/* Alerts */}
    <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm">

        <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="font-bold text-lg text-slate-800">
                Today's Alerts
            </h3>
        </div>

        <div className="p-5 space-y-4 ">

            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-brand-secondary/30 hover:shadow-sm transition"
            >
                <div>
                    <p className="font-semibold">Paracetamol 500mg</p>
                    <p className="text-sm text-slate-500">Out Of Stock</p>
                </div>

                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold">
                    High
                </span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-brand-secondary/30 hover:shadow-sm transition">
                <div>
                    <p className="font-semibold">Amoxicillin 250mg</p>
                    <p className="text-sm text-slate-500">Near Expiry</p>
                </div>

                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-semibold">
                    Medium
                </span>
            </div>

             <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-brand-secondary/30 hover:shadow-sm transition">
               <div>
                    <p className="font-semibold">Pantoprazole</p>
                    <p className="text-sm text-slate-500">Expired</p>
                </div>

                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold">
                    High
                </span>
            </div>

        </div>

    </div>

    {/* Calendar */}
    <div className="xl:col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm">

        <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="font-bold text-lg text-slate-800">
                Daily Sales Calendar
            </h3>
        </div>

        <div className="p-6">

    <div className="grid md:grid-cols-2 gap-6">

        {/* Calendar */}
        <div>
            <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
            />
        </div>

        {/* Sales Analytics */}
        <div className="space-y-4">

            <div className="rounded-xl bg-brand-secondary/10 p-4">
                <p className="text-sm text-slate-500">
                    Sales Today
                </p>

                <h3 className="text-3xl font-bold text-brand-secondary mt-1">
                    ₹4,850
                </h3>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">
                    Bills Generated
                </p>

                <h3 className="text-2xl font-bold text-slate-800 mt-1">
                    42
                </h3>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">
                    Avg Bill Value
                </p>

                <h3 className="text-2xl font-bold text-slate-800 mt-1">
                    ₹115
                </h3>
            </div>

           

        </div>

    </div>

</div>

    </div>

   

</div>
 {/* Top Selling Medicines */}
    {/* Top Medicines */}

<div className="bg-white rounded-xl border border-slate-200 shadow-sm">

    <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="font-bold text-lg text-slate-800">
            Top Selling Medicines
        </h3>
    </div>

    <div className="p-6">

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">

            {[
                { name: "Crocin Advance", sold: 450 },
                { name: "Paracetamol", sold: 390 },
                { name: "Dolo 650", sold: 350 },
                { name: "Azithromycin", sold: 280 }
            ].map((medicine) => (

                <div
                    key={medicine.name}
                    className="
                        p-5
                        rounded-xl
                        bg-slate-50
                        border
                        border-slate-100
                    "
                >
                    <p className="font-semibold text-slate-800">
                        {medicine.name}
                    </p>

                    <p className="mt-2 text-brand-secondary font-bold text-xl">
                        {medicine.sold}
                    </p>

                    <p className="text-xs text-slate-400">
                        Units Sold
                    </p>
                </div>

            ))}

        </div>

    </div>

</div>

{/* Existing Stock Overview Graph */}
<div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
    {/* Your existing graph code here */}
</div>
      {/* STOCK OVERVIEW MAIN CONTAINER PANEL */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* COMPONENT TITLE HEADER */}
        <div className="px-6 py-4 border-b border-slate-100 bg-white">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Stock overview</h2>
        </div>

        {/* CORE INTERACTIVE VISUAL CONTENT REGION */}
        <div className="p-8 bg-white flex flex-col items-center">
          
          {/* TAB CONTROLS STRIP */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition border cursor-pointer select-none
                  ${activeFilter === tab
                    ? 'bg-[#66c2bf] text-white border-[#66c2bf] shadow-sm'
                    : 'bg-white text-slate-400 border-slate-200 hover:text-slate-600 hover:bg-slate-50'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* DATA DATA GRAPH VISUAL CONTAINER */}
          <div className="w-full max-w-4xl grid grid-cols-[auto_1fr] gap-x-6 items-end pt-4 px-4">
            
            {/* Y-AXIS LABEL SCALES */}
            <div className="flex flex-col justify-between h-64 text-xs font-bold text-slate-600 pb-8 text-right pr-2 select-none">
              <div className="flex items-center gap-2 justify-end relative">
                <span className="absolute -left-12 rotate-270 whitespace-nowrap text-[10px] font-semibold text-slate-400 tracking-wider">
                  Sales &rarr;
                </span>
                <span>5000</span>
              </div>
              <div>1000</div>
              <div>500</div>
              <div className="h-0 flex items-center justify-end">0</div>
            </div>

            {/* CHART DATA PLOT CANVAS GRID */}
            <div className="relative h-64 border-b-2 border-slate-300 flex items-end justify-between px-6 gap-4">
              
              {chartData.map((bar, idx) => {
                // Calculate precise element percentage constraints
                const fillHeight = (bar.value / bar.total) * 100;
                const balanceHeight = 100 - fillHeight;

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full max-w-[90px] group">
                    <div className="w-full flex flex-col justify-end h-full rounded-t-sm overflow-hidden relative shadow-sm">
                      
                      {/* Top Remaining Scale Segment (Light-Pink tinted grid filler backings) */}
                      {balanceHeight > 0 && (
                        <div 
                          className="w-full transition-all duration-500 relative"
                          style={{ 
                            height: `${balanceHeight}%`,
                            backgroundColor: bar.pattern ? '#f5f3ff' : '#fff1f2',
                            backgroundImage: bar.pattern 
                              ? 'repeating-linear-gradient(45deg, #e0e7ff 0px, #e0e7ff 2px, transparent 2px, transparent 8px)' 
                              : 'repeating-linear-gradient(90deg, #ffe4e6 0px, #ffe4e6 1px, transparent 1px, transparent 4px)'
                          }}
                        />
                      )}

                      {/* Active Sold Metric Value Segment */}
                      <div 
                        className={`w-full ${bar.color} transition-all duration-700 ease-out`}
                        style={{ height: `${fillHeight}%` }}
                      />
                    </div>

                    {/* Category Sizing Sub-labels */}
                    <div className="absolute -bottom-7 text-xs font-bold text-slate-700 whitespace-nowrap">
                      {bar.category}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* X-AXIS CONTAINER LABEL IDENTIFIER */}
          <div className="w-full max-w-4xl text-center pt-10 pl-16 text-[10px] font-bold text-slate-400 tracking-wider uppercase select-none">
            Product Category &rarr;
          </div>

        </div>
      </div>
    </div>
  );
};

export default PharmacistDashboardPage;

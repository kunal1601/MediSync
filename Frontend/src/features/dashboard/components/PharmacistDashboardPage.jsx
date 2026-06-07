import { useState } from 'react';

/**
 * View Component: Pharmacist Interactive Analytics Panel
 * Renders filter controls and stock tracking charts matching image_0f704d.png
 */
const PharmacistDashboardPage = () => {
  const [activeFilter, setActiveFilter] = useState('By Most Sold');

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

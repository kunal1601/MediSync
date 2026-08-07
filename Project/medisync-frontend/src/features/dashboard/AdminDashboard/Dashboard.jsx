import { useState, useMemo, useRef } from 'react'
import { Users } from 'lucide-react'
import {  useEffect } from "react";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend,
} from 'recharts'
import SectionCard from './Widgets/SectionCard'
import CalendarWidget from './Widgets/CalendarWidget'
import {getIncomeGrowth} from './Services/IncomeGrowth'
import {
  
  stockDataByFilter,
  profitMargin
} from './data/dummyData'
import { getProfitLoss } from './Services/ProfitLoss';
import { getPharmacistOnBoard, getAllPharmacists } from './Services/PharmacistOnBoard';
import {getLeavesByDate} from './Services/PharmacistLeave';
import { getStockOverview } from './Services/StockOverviewGraph';
const formatCurrency = (n) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n)

  
function PharmacistCard({ item, onView }) {
  
  return (
    <div className="flex flex-col justify-between rounded-xl border border-medisync-border bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <span className="text-xs text-medisync-muted">{item.employmentStatus}</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-medisync-purple/20">
          <Users size={16} className="text-medisync-purple" />
        </div>
      </div>
      <div className="mt-6 flex items-end justify-between">
        <div>
          <span className="text-sm font-semibold text-medisync-text">{item.firstName} {item.lastName}</span>
          <p className="text-[10px] text-medisync-muted">{item.workingShift}</p>
        </div>
        <button
          type="button"
          onClick={() => onView(item.id)}
          className="rounded-full bg-medisync-teal px-4 py-1 text-xs font-medium text-white transition hover:bg-medisync-teal-dark"
        >
          View
        </button>
      </div>
    </div>
  )
}

function ProfitLossTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const item = payload[0].payload
  return (
    <div className="rounded-lg border border-medisync-border bg-white px-3 py-2 text-xs shadow-md">
      <p className="font-semibold text-medisync-text">{item.name}</p>
      <p className="text-medisync-muted">{item.value}% of total</p>
      <p className="font-medium text-medisync-teal">{formatCurrency(item.amount)}</p>
    </div>
  )
}

function ProfitLossChart() {

  const [profitLossData, setProfitLossData] = useState([]);

  const [profitMargin, setProfitMargin] = useState(0);


  useEffect(() => {

    fetchProfitLoss();

  }, []);



  const fetchProfitLoss = async () => {
        try {
          const data = await getProfitLoss();
          const chartData = [

            {
              name:"Cost",
              amount:data.cost,
              value:
              Number(((data.cost / data.revenue) * 100))
              .toFixed(2),
              color:"#94a3b8"
            },
            {
              name:"Profit",
              amount:data.profit,
              value:
              Number(((data.profit / data.revenue) * 100))
              .toFixed(2),
              color:"#14b8a6"
            },
            {
              name:"Loss",
              amount:data.loss,
              value:
              Number(((data.loss / data.revenue) * 100))
              .toFixed(2),
              color:"#ef4444"
            }
          ];
          setProfitLossData(chartData);

          setProfitMargin(
            ((data.profit/data.revenue)*100)
            .toFixed(1)
          );
        }
        catch(error){

          console.log(error);
        }
      };

      const total = profitLossData.reduce(
        (sum,item)=>sum+item.amount,
        0
      );
      console.log(profitLossData);
    return (

        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">

          <div className="relative h-52 w-52">

            <ResponsiveContainer width="100%" height="100%">

            <PieChart>

            <Pie
              data={profitLossData}
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={85}
              paddingAngle={3}
              dataKey="amount"
              nameKey="name"
              stroke="none"
              
            >

            {
            profitLossData.map((entry)=>(
            <Cell
            key={entry.name}
            fill={entry.color}
            />
            ))
            }

          </Pie>


        <Tooltip
        content={<ProfitLossTooltip />}
        />
        </PieChart>
        </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">

            <span className="text-center text-sm font-bold text-medisync-teal">

              +{profitMargin}%
                <br/>

            <span className="text-xs font-semibold">
            Profit
            </span>
          </span>
        </div>
      </div>



        <div className="space-y-3">
          <p className="text-xs text-medisync-muted">
            Total revenue tracked:
            <span className="font-semibold text-medisync-text">
              {" "}
              {formatCurrency(total)}

            </span>
        </p>
        <ul className="space-y-2 text-xs">
            {
            profitLossData.map((item)=>(

            <li
            key={item.name}
            className="flex items-center gap-2"
            >
            <span
            className="h-2.5 w-2.5 rounded-full"
            style={{
            backgroundColor:item.color
            }}
            />
            <span className="min-w-[80px] text-medisync-text">
              {item.name}
            </span>
            <span className="text-medisync-muted">
              {item.value}%
            </span>
            <span className="font-medium text-medisync-teal">
              {formatCurrency(item.amount)}

            </span>
          </li>
          ))
          }
        </ul>
      </div>

    </div>

    )
  }

function StockTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  const sales = payload.find((p) => p.dataKey === "sales")?.value ?? 0;
  const target = payload.find((p) => p.dataKey === "target")?.value ?? 0;

  const achievement =
    payload.find((p) => p.payload)?.payload?.achievement ?? 0;

  return (
    <div className="rounded-lg border bg-white p-3 shadow">
      <p className="font-semibold">{label}</p>

      <p>
        Sales: <strong>₹{sales.toLocaleString()}</strong>
      </p>

      <p>
        Target: <strong>₹{target.toLocaleString()}</strong>
      </p>

      <p className="text-teal-600">
        {achievement.toFixed(2)}% of target achieved
      </p>
    </div>
  );
}

function StockBarChart({ data, activeFilter }) {
  if (!data.length) {
    return (
        <div className="h-72 flex items-center justify-center">
            Loading...
        </div>
    );
}
  const maxVal =
  data.length > 0
    ? Math.max(...data.flatMap(d => [d.sales, d.target]))
    : 0;
  const yTicks = useMemo(() => {

      const step =
          maxVal <= 5000
              ? 1000
              : maxVal <= 10000
              ? 2000
              : 5000;

      const top = Math.ceil(maxVal / step) * step;

      const ticks = [];

      for (let i = 0; i <= top; i += step) {
          ticks.push(i);
      }

      return ticks;

  }, [maxVal]);

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <BarChart data={data} barGap={2} barCategoryGap="18%">
          <defs>
            <pattern
              id="stripe"
              patternUnits="userSpaceOnUse"
              width="6"
              height="6"
              patternTransform="rotate(45)"
            >
              <rect width="6" height="6" fill="#e8e4f8" />
              <line x1="0" y1="0" x2="0" y2="6" stroke="#b8b0e8" strokeWidth="2" />
            </pattern>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 10, fill: '#888' }}
            axisLine={false}
            tickLine={false}
            interval={0}
            angle={data.length > 5 ? -20 : 0}
            textAnchor={data.length > 5 ? 'end' : 'middle'}
            height={data.length > 5 ? 50 : 30}
            label={{
              value: 'Product Category →',
              position: 'insideBottom',
              offset: data.length > 5 ? -8 : -2,
              fontSize: 10,
              fill: '#888',
            }}
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#888' }}
            axisLine={false}
            tickLine={false}
            ticks={yTicks}
            tickFormatter={(v) => v.toLocaleString()}
            label={{
              value: "Revenue (₹)",
              angle: -90,
              position: 'insideLeft',
              fontSize: 10,
              fill: '#888',
            }}
          />
          <Tooltip content={<StockTooltip />} />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 10, paddingBottom: 8 }}
          />
          <Bar
            name="Target"
            dataKey="target"
            fill="url(#stripe)"
            radius={[4, 4, 0, 0]}
            maxBarSize={32}
          />
          <Bar
            name="Sales"
            dataKey="sales"
            fill="#00a89e"
            radius={[4, 4, 0, 0]}
            maxBarSize={32}
          />
        </BarChart>
      </ResponsiveContainer>
      <p className="mt-1 text-center text-[10px] text-medisync-muted">
          Showing Revenue by <strong>{activeFilter}</strong>
      </p>
    </div>
  )
}

function IncomeTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-medisync-border bg-white px-3 py-2 text-xs shadow-md">
      <p className="font-semibold text-medisync-text">{label}</p>
      <p className="text-medisync-teal">{formatCurrency(payload[0].value)}</p>
    </div>
  )
}

function IncomeAreaChart({ data, period }) {
  const maxIncome = Math.max(...data.map((d) => d.income))
  const yStep = maxIncome > 100000 ? 100000 : maxIncome > 10000 ? 10000 : 2000
  const yMax = Math.ceil(maxIncome / yStep) * yStep
  const yTicks = Array.from({ length: 5 }, (_, i) => (yMax / 4) * i)

  return (
    <div className="h-60 w-full">
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00a89e" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#00a89e" stopOpacity={0.04} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 10, fill: '#888' }}
            axisLine={false}
            tickLine={false}
            interval={period === 'monthly' ? 4 : 0}
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#888' }}
            axisLine={false}
            tickLine={false}
            ticks={yTicks}
            tickFormatter={(v) =>
              v >= 100000 ? `₹${(v / 100000).toFixed(1)}L` : `₹${(v / 1000).toFixed(0)}K`
            }
          />
          <Tooltip content={<IncomeTooltip />} />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#00a89e"
            strokeWidth={2}
            fill="url(#incomeGrad)"
            dot={{ r: 3, fill: '#00a89e', strokeWidth: 0 }}
            activeDot={{ r: 5, fill: '#00796b' }}
          />
        </AreaChart>
      </ResponsiveContainer>
      <p className="mt-1 text-right text-[10px] text-medisync-muted">
        {period === 'weekly' && 'Last 7 days'}
        {period === 'monthly' && 'Last 30 days'}
        {period === 'yearly' && 'Year-over-year (2018–2026)'}
      </p>
    </div>
  )
}
const stockFilters = [
    {
        label: "By Drug Type",
        value: "drug"
    },
    {
        label: "By Company",
        value: "company"
    },
    {
        label: "By Year",
        value: "year"
    },
    {
        label: "By Most Sold",
        value: "mostsold"
    }
];
export default function Dashboard() {
  const [activeStockFilter, setActiveStockFilter] = useState('mostsold')
  const [incomePeriod, setIncomePeriod] = useState('weekly')
  const [selectedPharmacist, setSelectedPharmacist] = useState(null)
  const [incomeData, setIncomeData] = useState([]);
  const [pharmacistOnBoard, setPharmacistOnBoard] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [leaveData, setLeaveData] = useState([]);
  const leaveCardRef = useRef(null);     {/* for cal card close  */}
  const [stock, setStock] = useState([]);
  
   useEffect(() => {
          loadPharmacists();
        }, []);
        //      {/* fo cal card close */} below useffect
   useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                leaveCardRef.current &&
                !leaveCardRef.current.contains(event.target)
            ) {
                setSelectedDate(null);
                setLeaveData([]);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);
    const handleDateClick = async (date) => {

        setSelectedDate(date);

        try {
            const data = await getLeavesByDate(date);
             console.log("Leave Data:", data);
            setLeaveData(data);
        } catch (error) {
            console.error(error);
        }
    };
    const loadPharmacists = async () => {
        try {
            const data = await getAllPharmacists();
            console.log(data);
            setPharmacistOnBoard(data);
        } catch (error) {
            console.log(error);
        }
    };

  useEffect(() => {
    fetchIncomeGrowth();
    
  }, [incomePeriod]);

  const fetchIncomeGrowth = async () => {
    try {
       console.log("Income Period:", incomePeriod);

      const data = await getIncomeGrowth(incomePeriod);
     
       console.log("Income Response:", data);
      setIncomeData(data);
    } catch (error) {
      console.error("Error fetching income growth:", error);
    }
  };
  
  //  incomeData = incomeGrowthByPeriod[incomePeriod]
    const handleViewPharmacist = async (id) => {
      try {
        const data = await getPharmacistOnBoard(id);
        setSelectedPharmacist(data);
      } catch (error) {
        console.error("Failed to fetch pharmacist details", error);
      }
    };
  //Stock Overview Graph
  useEffect(() => {
    console.log(activeStockFilter)
      fetchStockOverview(activeStockFilter);
    }, [activeStockFilter]);

  const fetchStockOverview = async (filter) => {
      try {
        const response = await getStockOverview(filter);

        const formatted = response.map((item) => ({
          label: item.label,
          sales: item.sales,
          target: item.target,
          achievement: item.achievement,
        }));

        setStock(formatted);

      } catch (error) {
        console.error("Failed to fetch stock overview", error);
      }
    };
  return (
    <div className="space-y-5">
      <SectionCard title="Pharmacist On-Board">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pharmacistOnBoard.map((item) => (
           <PharmacistCard
                key={item.id}
                item={item}
                onView={handleViewPharmacist}
            />
          ))}
        </div>
      </SectionCard>

      {selectedPharmacist && (
        <SectionCard title="Selected Pharmacist Details">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-medisync-border bg-slate-50 p-4">
              <p className="text-[11px] uppercase tracking-[.2em] text-medisync-muted">First Name</p>
              <p className="mt-2 text-sm font-semibold text-medisync-text">{selectedPharmacist.firstName}</p>
            </div>
            <div className="rounded-2xl border border-medisync-border bg-slate-50 p-4">
              <p className="text-[11px] uppercase tracking-[.2em] text-medisync-muted">Last Name</p>
              <p className="mt-2 text-sm font-semibold text-medisync-text">{selectedPharmacist.lastName}</p>
            </div>
            <div className="rounded-2xl border border-medisync-border bg-slate-50 p-4">
              <p className="text-[11px] uppercase tracking-[.2em] text-medisync-muted">Date of Birth</p>
              <p className="mt-2 text-sm font-semibold text-medisync-text">{selectedPharmacist.dateOfBirth}</p>
            </div>
            <div className="rounded-2xl border border-medisync-border bg-slate-50 p-4">
              <p className="text-[11px] uppercase tracking-[.2em] text-medisync-muted">Aadhar No</p>
              <p className="mt-2 text-sm font-semibold text-medisync-text">{selectedPharmacist.aadharNumber}</p>
            </div>
            <div className="rounded-2xl border border-medisync-border bg-slate-50 p-4">
              <p className="text-[11px] uppercase tracking-[.2em] text-medisync-muted">Date of Joining</p>
              <p className="mt-2 text-sm font-semibold text-medisync-text">{selectedPharmacist.dateOfJoining}</p>
            </div>
            <div className="rounded-2xl border border-medisync-border bg-slate-50 p-4">
              <p className="text-[11px] uppercase tracking-[.2em] text-medisync-muted">Working Shift</p>
              <p className="mt-2 text-sm font-semibold text-medisync-text">{selectedPharmacist.workingShift}</p>
            </div>
          </div>
        </SectionCard>
      )}

      <div className="grid gap-5 lg:grid-cols-5">
        <SectionCard title="Profit / Loss" className="lg:col-span-3">
          <ProfitLossChart />
        </SectionCard>
        <SectionCard title="Calendar" className="lg:col-span-2">
          <CalendarWidget  onDateClick={handleDateClick} />
        </SectionCard>
      </div>
        {selectedDate && (
          //      {/* fo cal card close only below line*/}
            <div ref={leaveCardRef}>
              
              <SectionCard title={`Pharmacists on Leave (${selectedDate})`}>
                {leaveData.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                        No pharmacists are on leave.
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {leaveData.map((item, index) => (
                            <div
                                key={index}
                                className="rounded-2xl border border-medisync-border bg-slate-50 p-5"
                            >
                                <p className="text-[11px] uppercase tracking-[.2em] text-medisync-muted">
                                    Pharmacist
                                </p>
                                <p className="mt-2 text-sm font-semibold text-medisync-text">
                                    {item.pharmacistName}
                                </p>
                                <div className="mt-4 space-y-3">
                                    <div>
                                        <p className="text-[11px] uppercase tracking-[.2em] text-medisync-muted">
                                            Shift
                                        </p>
                                        <p className="text-sm font-medium">
                                            {item.workingShift}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[11px] uppercase tracking-[.2em] text-medisync-muted">
                                            Leave Type
                                        </p>
                                        <p className="text-sm font-medium">
                                            {item.leaveType}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[11px] uppercase tracking-[.2em] text-medisync-muted">
                                            Reason
                                        </p>
                                        <p className="text-sm font-medium">
                                            {item.leaveReason}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </SectionCard>
            {/* fo cal card close */}
          </div>
        )}
   

      <SectionCard
        title="Stock overview"
        action={
          <div className="flex flex-wrap gap-2 ">
          {stockFilters.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setActiveStockFilter(filter.value)}
                  className={`rounded-full border px-3 py-1 text-[10px] font-medium transition ${
                    activeStockFilter === filter.value
                      ? "border-medisync-teal bg-medisync-teal text-white"
                      : "border-medisync-border text-medisync-muted hover:border-medisync-teal hover:text-medisync-teal"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
          </div>
        }
      >
        <StockBarChart data={stock} activeFilter={activeStockFilter} />
      </SectionCard>

      <SectionCard
        title="Income Growth (last 30 days)"
        action={
          <select
            value={incomePeriod}
            onChange={(e) => setIncomePeriod(e.target.value)}
            className="rounded-lg border border-medisync-border bg-white px-3 py-1 text-xs text-medisync-text outline-none focus:border-medisync-teal"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        }
      >
        <IncomeAreaChart data={incomeData} period={incomePeriod} />
      </SectionCard>
    </div>
  )
}
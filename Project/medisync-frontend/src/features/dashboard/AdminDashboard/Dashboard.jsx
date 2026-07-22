import { useState, useMemo } from 'react'
import { Users } from 'lucide-react'
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
import {
  pharmacistOnBoard,
  profitLossData,
  profitMargin,
  stockDataByFilter,
  stockFilters,
  incomeGrowthByPeriod,
} from './data/dummyData'

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
        <span className="text-xs text-medisync-muted">{item.records}</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-medisync-purple/20">
          <Users size={16} className="text-medisync-purple" />
        </div>
      </div>
      <div className="mt-6 flex items-end justify-between">
        <div>
          <span className="text-sm font-semibold text-medisync-text">{item.label}</span>
          <p className="text-[10px] text-medisync-muted">{item.count} active records</p>
        </div>
        <button
          type="button"
          onClick={() => onView(item.details)}
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
  const total = useMemo(
    () => profitLossData.reduce((s, d) => s + d.amount, 0),
    []
  )

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
      <div className="relative h-52 w-52">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <PieChart>
            <Pie
              data={profitLossData}
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {profitLossData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<ProfitLossTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="text-center text-sm font-bold text-medisync-teal">
            +{profitMargin}%
            <br />
            <span className="text-xs font-semibold">Profit</span>
          </span>
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-xs text-medisync-muted">
          Total revenue tracked:{' '}
          <span className="font-semibold text-medisync-text">{formatCurrency(total)}</span>
        </p>
        <ul className="space-y-2 text-xs">
          {profitLossData.map((item) => (
            <li key={item.name} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="min-w-[80px] text-medisync-text">{item.name}</span>
              <span className="text-medisync-muted">{item.value}%</span>
              <span className="font-medium text-medisync-teal">
                {formatCurrency(item.amount)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function StockTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const sales = payload.find((p) => p.dataKey === 'sales')
  const target = payload.find((p) => p.dataKey === 'target')
  const pct = target?.value
    ? Math.round((sales?.value / target.value) * 100)
    : 0
  return (
    <div className="rounded-lg border border-medisync-border bg-white px-3 py-2 text-xs shadow-md">
      <p className="font-semibold text-medisync-text">{label}</p>
      <p>Sales: <strong>{sales?.value?.toLocaleString()}</strong></p>
      <p>Target: <strong>{target?.value?.toLocaleString()}</strong></p>
      <p className="text-medisync-teal">{pct}% of target achieved</p>
    </div>
  )
}

function StockBarChart({ data, activeFilter }) {
  const maxVal = Math.max(...data.flatMap((d) => [d.sales, d.target]))
  const yTicks = useMemo(() => {
    const step = maxVal > 5000 ? 2000 : maxVal > 2000 ? 1000 : 500
    const top = Math.ceil(maxVal / step) * step
    return [0, step, step * 2, top]
  }, [maxVal])

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
            dataKey="category"
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
              value: 'Sales →',
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
        Showing: {activeFilter}
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
            interval={period === 'Monthly' ? 4 : 0}
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
        {period === 'Weekly' && 'Last 7 days'}
        {period === 'Monthly' && 'Last 30 days'}
        {period === 'Yearly' && 'Year-over-year (2018–2026)'}
      </p>
    </div>
  )
}

export default function Dashboard() {
  const [activeStockFilter, setActiveStockFilter] = useState('By Most Sold')
  const [incomePeriod, setIncomePeriod] = useState('Monthly')
  const [selectedPharmacist, setSelectedPharmacist] = useState(null)

  const stockData = stockDataByFilter[activeStockFilter]
  const incomeData = incomeGrowthByPeriod[incomePeriod]

  return (
    <div className="space-y-5">
      <SectionCard title="Pharmacist On-Board">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pharmacistOnBoard.map((item) => (
            <PharmacistCard key={item.id} item={item} onView={setSelectedPharmacist} />
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
              <p className="mt-2 text-sm font-semibold text-medisync-text">{selectedPharmacist.dob}</p>
            </div>
            <div className="rounded-2xl border border-medisync-border bg-slate-50 p-4">
              <p className="text-[11px] uppercase tracking-[.2em] text-medisync-muted">Aadhar No</p>
              <p className="mt-2 text-sm font-semibold text-medisync-text">{selectedPharmacist.aadhar}</p>
            </div>
            <div className="rounded-2xl border border-medisync-border bg-slate-50 p-4">
              <p className="text-[11px] uppercase tracking-[.2em] text-medisync-muted">Date of Joining</p>
              <p className="mt-2 text-sm font-semibold text-medisync-text">{selectedPharmacist.joined}</p>
            </div>
            <div className="rounded-2xl border border-medisync-border bg-slate-50 p-4">
              <p className="text-[11px] uppercase tracking-[.2em] text-medisync-muted">Working Shift</p>
              <p className="mt-2 text-sm font-semibold text-medisync-text">{selectedPharmacist.shift}</p>
            </div>
          </div>
        </SectionCard>
      )}

      <div className="grid gap-5 lg:grid-cols-5">
        <SectionCard title="Profit / Loss" className="lg:col-span-3">
          <ProfitLossChart />
        </SectionCard>
        <SectionCard title="Calendar" className="lg:col-span-2">
          <CalendarWidget />
        </SectionCard>
      </div>

      <SectionCard
        title="Stock overview"
        action={
          <div className="flex flex-wrap gap-2">
            {stockFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveStockFilter(filter)}
                className={`rounded-full border px-3 py-1 text-[10px] font-medium transition ${
                  activeStockFilter === filter
                    ? 'border-medisync-teal bg-medisync-teal text-white'
                    : 'border-medisync-border text-medisync-muted hover:border-medisync-teal hover:text-medisync-teal'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        }
      >
        <StockBarChart data={stockData} activeFilter={activeStockFilter} />
      </SectionCard>

      <SectionCard
        title="Income Growth (last 30 days)"
        action={
          <select
            value={incomePeriod}
            onChange={(e) => setIncomePeriod(e.target.value)}
            className="rounded-lg border border-medisync-border bg-white px-3 py-1 text-xs text-medisync-text outline-none focus:border-medisync-teal"
          >
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
        }
      >
        <IncomeAreaChart data={incomeData} period={incomePeriod} />
      </SectionCard>
    </div>
  )
}
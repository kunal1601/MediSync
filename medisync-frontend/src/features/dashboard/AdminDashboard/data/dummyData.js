export const pharmacists = [
  {
    id: 1,
    firstName: 'Kunal',
    lastName: 'Sharma',
    name: 'Kunal Sharma',
    degree: 'B.Pharm, 2024',
    shift: '06.00 AM - 02.00 PM',
    contact: '99999-88888',
    avatar: 'https://i.pravatar.cc/150?img=12',
    dob: '1997-08-15',
    aadhar: '1234 5678 9012',
    joined: '2025-11-01',
    count: 12,
  },
  {
    id: 2,
    firstName: 'Janavi',
    lastName: 'Chavan',
    name: 'Janavi Chavan',
    degree: 'D.Pharm, 2024',
    shift: '02.00 PM - 10.00 PM',
    contact: '77777-66666',
    avatar: 'https://i.pravatar.cc/150?img=47',
    dob: '1998-03-22',
    aadhar: '2345 6789 0123',
    joined: '2025-12-04',
    count: 8,
  },
  {
    id: 3,
    firstName: 'Vivek',
    lastName: 'Banthiya',
    name: 'Vivek Banthiya',
    degree: 'M.Pharm, 2024',
    shift: '10.00 PM - 06.00 AM',
    contact: '88888-77777',
    avatar: 'https://i.pravatar.cc/150?img=33',
    dob: '1996-10-09',
    aadhar: '3456 7890 1234',
    joined: '2026-01-10',
    count: 5,
  },
]

// ─── Pharmacist On-Board ───────────────────────────────────────────────────
export const pharmacistOnBoard = pharmacists.map((pharmacist) => ({
  id: pharmacist.id,
  label: pharmacist.name,
  records: 'Profile Records',
  count: pharmacist.count,
  details: pharmacist,
}))

// ─── Profit / Loss (₹ in lakhs — realistic pharmacy P&L) ───────────────────
export const profitLossRaw = {
  profit: 6.42,
  gain: 1.82,
  loss: 2.31,
  costs: 1.28,
}

export const profitLossData = [
  { name: 'Profit', value: 64, amount: 642000, color: '#00a89e' },
  { name: 'Gain', value: 18, amount: 182000, color: '#4db6ac' },
  { name: 'Loss', value: 23, amount: 231000, color: '#00796b' },
  { name: 'Costs', value: 13, amount: 128000, color: '#80cbc4' },
]

export const profitMargin = 64

// ─── Stock overview (filter-specific datasets) ─────────────────────────────
const drugTypeStock = [
  { category: 'Tablets', sales: 4820, target: 5500, units: 'units' },
  { category: 'Ointments', sales: 1240, target: 1800, units: 'units' },
  { category: 'Drops', sales: 890, target: 1200, units: 'units' },
  { category: 'Injections', sales: 620, target: 950, units: 'units' },
  { category: 'Capsules', sales: 3680, target: 4000, units: 'units' },
  { category: 'Syrups', sales: 2150, target: 2800, units: 'units' },
]

const companyStock = [
  { category: 'Cipla', sales: 4200, target: 5000, units: '₹K' },
  { category: 'Sun Pharma', sales: 5100, target: 5800, units: '₹K' },
  { category: 'Dr. Reddy', sales: 3800, target: 4500, units: '₹K' },
  { category: 'Abbott', sales: 2900, target: 3500, units: '₹K' },
  { category: 'Glenmark', sales: 2400, target: 3000, units: '₹K' },
  { category: 'Lupin', sales: 3100, target: 3600, units: '₹K' },
]

const yearStock = [
  { category: '2021', sales: 8200, target: 9000, units: '₹K' },
  { category: '2022', sales: 9400, target: 10000, units: '₹K' },
  { category: '2023', sales: 11200, target: 12000, units: '₹K' },
  { category: '2024', sales: 12800, target: 13500, units: '₹K' },
  { category: '2025', sales: 14500, target: 15000, units: '₹K' },
  { category: '2026', sales: 6800, target: 16000, units: '₹K' },
]

const mostSoldStock = [
  { category: 'Paracetamol', sales: 6200, target: 7000, units: 'units' },
  { category: 'Amoxicillin', sales: 4100, target: 5000, units: 'units' },
  { category: 'Cetirizine', sales: 3800, target: 4200, units: 'units' },
  { category: 'Metformin', sales: 3500, target: 4000, units: 'units' },
  { category: 'Omeprazole', sales: 2900, target: 3200, units: 'units' },
  { category: 'Azithromycin', sales: 2600, target: 3000, units: 'units' },
]

export const stockDataByFilter = {
  'By Drug Type': drugTypeStock,
  'By Company Name': companyStock,
  'By year': yearStock,
  'By Most Sold': mostSoldStock,
}

export const stockFilters = Object.keys(stockDataByFilter)

// ─── Income growth (period-specific) ───────────────────────────────────────
function generateLast30Days() {
  const data = []
  const today = new Date()
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const day = d.getDate()
    const base = 8200 + Math.sin(i * 0.4) * 1200
    const weekend = d.getDay() === 0 || d.getDay() === 6
    const income = Math.round(base * (weekend ? 0.72 : 1) + (i % 5) * 180)
    data.push({
      label: `${d.toLocaleString('default', { month: 'short' })} ${day}`,
      income,
      date: d.toISOString().slice(0, 10),
    })
  }
  return data
}

function generateLast12Months() {
  const data = []
  const today = new Date()
  for (let i = 11; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1)
    const label = d.toLocaleString('default', { month: 'short', year: '2-digit' })
    const income = Math.round(180000 + i * 12500 + Math.sin(i) * 15000)
    data.push({ label, income, date: d.toISOString().slice(0, 7) })
  }
  return data
}

const yearlyIncome = [
  { label: '2018', income: 142000 },
  { label: '2019', income: 198000 },
  { label: '2020', income: 165000 },
  { label: '2021', income: 224000 },
  { label: '2022', income: 278000 },
  { label: '2023', income: 312000 },
  { label: '2024', income: 356000 },
  { label: '2025', income: 398000 },
  { label: '2026', income: 187000 },
]

export const incomeGrowthByPeriod = {
  Weekly: generateLast30Days().slice(-7),
  Monthly: generateLast30Days(),
  Yearly: yearlyIncome,
}

// ─── Calendar events (keyed by YYYY-MM-DD) ─────────────────────────────────
function buildCalendarEvents() {
  const today = new Date()
  const y = today.getFullYear()
  const m = today.getMonth()
  const pad = (n) => String(n).padStart(2, '0')
  const key = (day) => `${y}-${pad(m + 1)}-${pad(day)}`

  const events = {}
  const add = (day, type) => {
    const k = key(day)
    events[k] = events[k] ? [...events[k], type] : [type]
  }

  add(today.getDate(), 'today')
  add(today.getDate() - 2 > 0 ? today.getDate() - 2 : 1, 'delivery')
  add(today.getDate() + 3 <= 28 ? today.getDate() + 3 : 20, 'shift')
  add(today.getDate() + 7 <= 28 ? today.getDate() + 7 : 25, 'billing')
  add(5, 'inventory')
  add(12, 'shift')
  add(18, 'delivery')
  add(26, 'billing')

  return events
}

export const calendarEvents = buildCalendarEvents()

// ─── Other pages ───────────────────────────────────────────────────────────
export const alerts = [
  {
    id: 1,
    title: 'Low Stock Alert',
    message: 'Paracetamol 500mg tablets are below minimum threshold (50 units).',
    time: '2 hours ago',
    type: 'warning',
  },
  {
    id: 2,
    title: 'Expiry Reminder',
    message: 'Amoxicillin batch #AMX-2024 expires in 15 days.',
    time: '5 hours ago',
    type: 'danger',
  },
  {
    id: 3,
    title: 'New Order Received',
    message: 'Supplier MediCorp confirmed delivery for tomorrow.',
    time: '1 day ago',
    type: 'info',
  },
]

export const extraMedicineOrders = [
  {
    id: 1,
    title: 'Livocetirizine Montelecast',
    description: 'Medicines ordered for a specific patient request.',
    status: 'Yet to place Order',
  },
  {
    id: 2,
    title: 'Stock Re-Order',
    description: 'Routine restock for medicines in low inventory.',
    status: 'Order Placed',
  },
  {
    id: 3,
    title: 'Any Extra Requirements',
    description: 'Additional patient requirements and supplies.',
    status: 'Yet to place Order',
  },
]

export const billings = [
  { id: 'INV-001', customer: 'Rajesh Kumar', amount: 2450, date: '2026-04-12', status: 'Paid' },
  { id: 'INV-002', customer: 'Priya Singh', amount: 1890, date: '2026-04-11', status: 'Paid' },
  { id: 'INV-003', customer: 'Amit Patel', amount: 3200, date: '2026-04-10', status: 'Pending' },
  { id: 'INV-004', customer: 'Sneha Reddy', amount: 980, date: '2026-04-09', status: 'Paid' },
]

export const inventory = [
  { id: 1, name: 'Paracetamol 500mg', category: 'Tablets', stock: 120, status: 'In Stock' },
  { id: 2, name: 'Amoxicillin 250mg', category: 'Capsules', stock: 45, status: 'Low Stock' },
  { id: 3, name: 'Cetirizine Syrup', category: 'Syrups', stock: 80, status: 'In Stock' },
  { id: 4, name: 'Insulin Injection', category: 'Injections', stock: 15, status: 'Critical' },
  { id: 5, name: 'Betnovate Cream', category: 'Ointments', stock: 60, status: 'In Stock' },
]

export const admins = [
  { id: 1, name: 'Dr. Anil Mehta', role: 'Super Admin', email: 'anil@medisync.com' },
  { id: 2, name: 'Sunita Rao', role: 'Admin', email: 'sunita@medisync.com' },
]

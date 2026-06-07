import SectionCard from '../components/SectionCard'
import { billings } from '../data/dummyData'

const statusStyle = {
  Paid: 'bg-green-100 text-green-700',
  Pending: 'bg-amber-100 text-amber-700',
}

export default function Billings() {
  return (
    <div className="space-y-5">
      <SectionCard title="Billings">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px] text-sm">
            <thead>
              <tr className="bg-[#eef5f8]">
                <th className="px-4 py-3 text-left font-semibold">Invoice ID</th>
                <th className="px-4 py-3 text-left font-semibold">Customer</th>
                <th className="px-4 py-3 text-left font-semibold">Amount (₹)</th>
                <th className="px-4 py-3 text-left font-semibold">Date</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {billings.map((b) => (
                <tr
                  key={b.id}
                  className="border-b border-medisync-border hover:bg-gray-50"
                >
                  <td className="px-4 py-3 font-medium">{b.id}</td>
                  <td className="px-4 py-3">{b.customer}</td>
                  <td className="px-4 py-3">₹{b.amount.toLocaleString()}</td>
                  <td className="px-4 py-3">{b.date}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyle[b.status]}`}
                    >
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  )
}

import SectionCard from '../Widgets/SectionCard'
import { inventory } from '../data/dummyData'

const statusStyle = {
  'In Stock': 'bg-green-100 text-green-700',
  'Low Stock': 'bg-amber-100 text-amber-700',
  Critical: 'bg-red-100 text-red-700',
}

export default function Inventory() {
  return (
    <div className="space-y-5">
      <SectionCard title="Inventory Status">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px] text-sm">
            <thead>
              <tr className="bg-[#eef5f8]">
                <th className="px-4 py-3 text-left font-semibold">Product</th>
                <th className="px-4 py-3 text-left font-semibold">Category</th>
                <th className="px-4 py-3 text-left font-semibold">Stock</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-medisync-border hover:bg-gray-50"
                >
                  <td className="px-4 py-3 font-medium">{item.name}</td>
                  <td className="px-4 py-3">{item.category}</td>
                  <td className="px-4 py-3">{item.stock} units</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyle[item.status]}`}
                    >
                      {item.status}
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

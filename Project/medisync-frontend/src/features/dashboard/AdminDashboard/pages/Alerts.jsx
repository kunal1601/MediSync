import { useState } from 'react'
import {
  Bell,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
} from 'lucide-react'
import SectionCard from '../Widgets/SectionCard'
import { alerts, extraMedicineOrders } from '../data/dummyData'

const iconMap = {
  warning: AlertTriangle,
  danger: Bell,
  info: Info,
}

const colorMap = {
  warning: 'text-amber-500 bg-amber-50',
  danger: 'text-red-500 bg-red-50',
  info: 'text-medisync-teal bg-medisync-teal/10',
}

const tabs = ['Medicine Stock Alerts', 'Pending Orders', 'Extra Medicines']

export default function Alerts() {
  const [activeTab, setActiveTab] = useState('Extra Medicines')
  const [orders, setOrders] = useState(extraMedicineOrders)
  const [draftStatuses, setDraftStatuses] = useState(
    Object.fromEntries(extraMedicineOrders.map((order) => [order.id, order.status]))
  )
  const [hiddenOrders, setHiddenOrders] = useState([])

  const handleDraftStatus = (orderId, status) => {
    setDraftStatuses((current) => ({ ...current, [orderId]: status }))
  }

  const handleSave = (orderId) => {
    setOrders((current) =>
      current.map((order) =>
        order.id === orderId ? { ...order, status: draftStatuses[orderId] } : order
      )
    )
  }

  const handleClose = (orderId) => {
    setHiddenOrders((current) => [...current, orderId])
  }

  const pendingOrders = orders.filter((order) => order.status === 'Yet to place Order')
  const visibleExtraOrders = orders.filter((order) => !hiddenOrders.includes(order.id))

  return (
    <div className="space-y-5">
      <SectionCard title="Alerts">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                activeTab === tab
                  ? 'border-medisync-teal bg-medisync-teal text-white'
                  : 'border-medisync-border bg-white text-medisync-text hover:border-medisync-teal hover:text-medisync-teal'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          {activeTab === 'Medicine Stock Alerts' && (
            <div className="space-y-3">
              {alerts.map((alert) => {
                const Icon = iconMap[alert.type]
                return (
                  <div
                    key={alert.id}
                    className="flex gap-4 rounded-xl border border-medisync-border p-4 shadow-sm"
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${colorMap[alert.type]}`}
                    >
                      <Icon size={18} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-medisync-text">{alert.title}</h3>
                        <span className="shrink-0 text-xs text-medisync-muted">{alert.time}</span>
                      </div>
                      <p className="mt-1 text-sm text-medisync-muted">{alert.message}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {activeTab === 'Pending Orders' && (
            <div className="space-y-4">
              {pendingOrders.length === 0 ? (
                <div className="rounded-2xl border border-medisync-border bg-slate-50 p-6 text-center text-sm text-medisync-muted">
                  No pending orders at the moment. Mark extra medicines as yet to place order and save them to see pending items here.
                </div>
              ) : (
                pendingOrders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-2xl border border-medisync-border bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-medisync-text">{order.title}</h3>
                        <p className="mt-1 text-sm text-medisync-muted">{order.description}</p>
                      </div>
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                        Pending
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'Extra Medicines' && (
            <div className="space-y-4">
              {visibleExtraOrders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-2xl border border-medisync-border bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-medisync-text">{order.title}</h3>
                      <p className="mt-1 text-sm text-medisync-muted">{order.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleClose(order.id)}
                      className="cursor-pointer rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-50"
                    >
                      Close
                    </button>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-medisync-border bg-slate-50 px-4 py-3">
                      <input
                        type="radio"
                        name={`order-status-${order.id}`}
                        value="Order Placed"
                        checked={draftStatuses[order.id] === 'Order Placed'}
                        onChange={() => handleDraftStatus(order.id, 'Order Placed')}
                        className="h-4 w-4 accent-medisync-teal"
                      />
                      <span className="text-sm font-medium text-medisync-text">Order Placed</span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-medisync-border bg-slate-50 px-4 py-3">
                      <input
                        type="radio"
                        name={`order-status-${order.id}`}
                        value="Yet to place Order"
                        checked={draftStatuses[order.id] === 'Yet to place Order'}
                        onChange={() => handleDraftStatus(order.id, 'Yet to place Order')}
                        className="h-4 w-4 accent-medisync-teal"
                      />
                      <span className="text-sm font-medium text-medisync-text">Yet to place Order</span>
                    </label>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleSave(order.id)}
                      className="cursor-pointer rounded-lg bg-medisync-teal px-5 py-2 text-sm font-semibold text-white transition hover:bg-medisync-teal-dark"
                    >
                      Save
                    </button>
                    <span className="text-sm text-medisync-muted">
                      Current status: <strong>{order.status}</strong>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </SectionCard>
    </div>
  )
}

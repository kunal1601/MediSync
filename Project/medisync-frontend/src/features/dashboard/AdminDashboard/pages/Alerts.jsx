  import { useEffect, useState } from 'react'
  import {
    Bell,
    AlertTriangle,
    ChevronDown,
    ChevronRight,
    XCircle,
  } from 'lucide-react'
  import SectionCard from '../Widgets/SectionCard'
  import API from "../../../../api/axios";


  const tabs = ['Medicine Stock Alerts', 'Pending Orders', 'Extra Medicines']

  export default function Alerts() {
    const [activeTab, setActiveTab] = useState('Medicine Stock Alerts')
  
    const [draftStatuses, setDraftStatuses] = useState({})
    const [systemAlerts, setSystemAlerts] = useState([])
    const [pendingRequests, setPendingRequests] = useState([])
    const [manualRequests, setManualRequests] = useState([])
    const [openSection, setOpenSection] = useState(null)

    const handleDraftStatus = (orderId, status) => {
      setDraftStatuses((current) => ({ ...current, [orderId]: status }))
    }


    const pendingOrders = pendingRequests;
    useEffect(() => {
    fetchAlerts()
    fetchPendingRequests();
    fetchManualRequests();
  
  }, []);


  const fetchPendingRequests = async () => {
    try {
      const response = await API.get("/alerts/pending");

      setPendingRequests(response.data);

      setDraftStatuses((prev) => ({
        ...prev,
        ...Object.fromEntries(
          response.data.map((item) => [item.alertId, item.status])
        ),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchManualRequests = async () => {
    try {
      const response = await API.get("/alerts/manual-requests");

      setManualRequests(response.data);

      setDraftStatuses((prev) => ({
        ...prev,
        ...Object.fromEntries(
          response.data.map((item) => [item.alertId, item.status])
        ),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const approveRequest = async (alertId) => {
    try {
      await API.put(`/alerts/${alertId}/approve`);

      fetchPendingRequests();
      fetchManualRequests();
      fetchAlerts();

    } catch (err) {
      console.error(err);
    }
  };

  const fetchAlerts = async () => {
    try {
      const response = await API.get('/alerts/system')
      setSystemAlerts(response.data)
    } catch (err) {
      console.error(err)
    }
  }


  const lowStockAlerts = systemAlerts.filter(
    (a) =>
      a.alertType === 'LOW_STOCK' ||
      a.alertType === 'OUT_OF_STOCK'
  )

  const nearExpiryAlerts = systemAlerts.filter(
    (a) => a.alertType === 'NEAR_EXPIRY'
  )

  const expiredAlerts = systemAlerts.filter(
    (a) => a.alertType === 'EXPIRED'
  )

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section)
  }

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
    <div className="space-y-4">

      {/* LOW STOCK */}
      <div className="rounded-xl border border-medisync-border overflow-hidden">

        <button
          onClick={() => toggleSection("low")}
          className="w-full flex items-center justify-between px-5 py-4 bg-amber-50 hover:bg-amber-100 transition"
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-amber-500" size={20} />
            <span className="font-semibold">
              Out of Stock ({lowStockAlerts.length})
            </span>
          </div>

          {openSection === "low"
            ? <ChevronDown size={18}/>
            : <ChevronRight size={18}/>
          }

        </button>

        {openSection === "low" && (

          <div className="max-h-64 overflow-y-auto divide-y">

            {lowStockAlerts.length===0 ? (

              <p className="p-4 text-sm text-slate-500">
                No low stock medicines.
              </p>

            ) : (

              lowStockAlerts.map(alert=>(
                <div
                  key={alert.alertId}
                  className="p-4 hover:bg-slate-50"
                >

                  <p className="font-semibold">
                    {alert.medicineName}
                  </p>

                  <p className="text-sm text-slate-500">
                    {alert.description}
                  </p>

                </div>
              ))

            )}

          </div>

        )}

      </div>

      {/* NEAR EXPIRY */}

      <div className="rounded-xl border border-medisync-border overflow-hidden">

        <button
          onClick={() => toggleSection("expiry")}
          className="w-full flex items-center justify-between px-5 py-4 bg-orange-50 hover:bg-orange-100 transition"
        >

          <div className="flex items-center gap-3">

            <Bell className="text-orange-500" size={20}/>

            <span className="font-semibold">
              Near Expiry ({nearExpiryAlerts.length})
            </span>

          </div>

          {openSection==="expiry"
            ? <ChevronDown size={18}/>
            : <ChevronRight size={18}/>
          }

        </button>

        {openSection==="expiry" && (

          <div className="max-h-64 overflow-y-auto divide-y">

            {nearExpiryAlerts.length===0 ? (

              <p className="p-4 text-sm text-slate-500">
                No medicines near expiry.
              </p>

            ) : (

              nearExpiryAlerts.map(alert=>(
                <div
                  key={alert.alertId}
                  className="p-4 hover:bg-slate-50"
                >

                  <p className="font-semibold">
                    {alert.medicineName}
                  </p>

                  <p className="text-sm text-slate-500">
                    Batch : {alert.batchNumber}
                  </p>

                  <p className="text-sm text-slate-500">
                    Expiry : {alert.expiryDate}
                  </p>

                </div>
              ))

            )}

          </div>

        )}

      </div>

      {/* EXPIRED */}

      <div className="rounded-xl border border-medisync-border overflow-hidden">

        <button
          onClick={() => toggleSection("expired")}
          className="w-full flex items-center justify-between px-5 py-4 bg-red-50 hover:bg-red-100 transition"
        >

          <div className="flex items-center gap-3">

            <XCircle className="text-red-500" size={20}/>

            <span className="font-semibold">
              Expired Medicines ({expiredAlerts.length})
            </span>

          </div>

          {openSection==="expired"
            ? <ChevronDown size={18}/>
            : <ChevronRight size={18}/>
          }

        </button>

        {openSection==="expired" && (

          <div className="max-h-64 overflow-y-auto divide-y">

            {expiredAlerts.length===0 ? (

              <p className="p-4 text-sm text-slate-500">
                No expired medicines.
              </p>

            ) : (

              expiredAlerts.map(alert=>(
                <div
                  key={alert.alertId}
                  className="p-4 hover:bg-slate-50"
                >

                  <p className="font-semibold">
                    {alert.medicineName}
                  </p>

                  <p className="text-sm text-slate-500">
                    Batch : {alert.batchNumber}
                  </p>

                  <p className="text-sm text-red-500">
                    Expired : {alert.expiryDate}
                  </p>

                </div>
              ))

            )}

          </div>

        )}

      </div>

    </div>
  )}

            {activeTab === 'Pending Orders' && (
    <div className="space-y-4">
      {pendingOrders.length === 0 ? (
        <div className="rounded-2xl border border-medisync-border bg-slate-50 p-6 text-center text-sm text-medisync-muted">
          No pending orders at the moment.
        </div>
      ) : (
        pendingOrders.map((order) => (
          <div
            key={order.alertId}
            className="rounded-2xl border border-medisync-border bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-medisync-text">
                  {order.medicineName}
                </h3>

                <p className="mt-1 text-sm text-medisync-muted">
                  {order.description}
                </p>
              </div>

              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                Pending
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-medisync-border bg-slate-50 px-4 py-3">
                <input
                  type="radio"
                  name={`pending-status-${order.alertId}`}
                  value="Order Placed"
                  checked={draftStatuses[order.alertId] === "Order Placed"}
                  onChange={() =>
                    handleDraftStatus(order.alertId, "Order Placed")
                  }
                  className="h-4 w-4 accent-medisync-teal"
                />

                <span className="text-sm font-medium text-medisync-text">
                  Order Placed
                </span>
              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-medisync-border bg-slate-50 px-4 py-3">
                <input
                  type="radio"
                  name={`pending-status-${order.alertId}`}
                  value="Yet to place Order"
                  checked={draftStatuses[order.alertId] === "Yet to place Order"}
                  onChange={() =>
                    handleDraftStatus(order.alertId, "Yet to place Order")
                  }
                  className="h-4 w-4 accent-medisync-teal"
                />

                <span className="text-sm font-medium text-medisync-text">
                  Yet to place Order
                </span>
              </label>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => approveRequest(order.alertId)}
                className="cursor-pointer rounded-lg bg-medisync-teal px-5 py-2 text-sm font-semibold text-white transition hover:bg-medisync-teal-dark"
              >
                Save
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )}

            {activeTab === 'Extra Medicines' && (
              <div className="space-y-4">
              {manualRequests.map((order) => (
                  <div
                    key={order.alertId}
                    className="rounded-2xl border border-medisync-border bg-white p-5 shadow-sm"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-medisync-text">{order.medicineName}</h3>
                        <p className="mt-1 text-sm text-medisync-muted">{order.description}</p>
                      </div>
                       <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
        {order.status}
    </span>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-medisync-border bg-slate-50 px-4 py-3">
                        <input
                          type="radio"
                        name={`manual-status-${order.alertId}`}
                          value="Order Placed"
                          checked={draftStatuses[order.alertId] === "Order Placed"}
                          onChange={() =>
                              handleDraftStatus(order.alertId, "Order Placed")
                  }
                          className="h-4 w-4 accent-medisync-teal"
                        />
                        <span className="text-sm font-medium text-medisync-text">Order Placed</span>
                      </label>
                      <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-medisync-border bg-slate-50 px-4 py-3">
                        <input
                          type="radio"
                          name={`manual-status-${order.alertId}`}
                          value="Yet to place Order"
                          checked={draftStatuses[order.alertId] === 'Yet to place Order'}
                          onChange={() => handleDraftStatus(order.alertId, 'Yet to place Order')}
                          className="h-4 w-4 accent-medisync-teal"
                        />
                        <span className="text-sm font-medium text-medisync-text">Yet to place Order</span>
                      </label>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                  onClick={() => approveRequest(order.alertId)}
                        className="cursor-pointer rounded-lg bg-medisync-teal px-5 py-2 text-sm font-semibold text-white transition hover:bg-medisync-teal-dark"  >
                        Save
                      </button>
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

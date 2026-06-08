import { useState } from "react";

const BillHistoryPage = () => {
  const [selectedBill, setSelectedBill] = useState(null);
  const bills = JSON.parse(localStorage.getItem("billHistory")) || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Bill History</h2>

        <p className="text-slate-500">Previously generated pharmacy bills</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left p-4">Invoice No</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Items</th>
              <th className="text-left p-4">Total</th>
              <th className="text-left p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {bills.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-10 text-center text-slate-400">
                  No Bills Found
                </td>
              </tr>
            ) : (
              bills.map((bill) => (
                <tr key={bill.invoiceNo} className="border-b border-slate-100">
                  <td className="p-4">{bill.invoiceNo}</td>

                  <td className="p-4">{bill.date}</td>

                  <td className="p-4">{bill.items.length}</td>

                  <td className="p-4 font-semibold">
                    ₹{bill.grandTotal?.toFixed?.(2)}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => setSelectedBill(bill)}
                      className="
      px-3 py-2
      bg-brand-secondary
      text-white
      rounded-lg
      text-sm
    "
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillHistoryPage;

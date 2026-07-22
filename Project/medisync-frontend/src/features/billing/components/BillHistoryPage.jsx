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
      {selectedBill && (
  <div className="bg-white rounded-xl border border-slate-200 p-6">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-bold text-slate-800">
        Bill Details
      </h3>

      <button
        onClick={() => setSelectedBill(null)}
        className="px-3 py-2 bg-red-500 text-white rounded-lg"
      >
        Close
      </button>
    </div>

    {/* Customer Details */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div>
        <p className="text-sm text-slate-500">Customer Name</p>
        <p className="font-semibold">
          {selectedBill.customer?.name || "-"}
        </p>
      </div>

      <div>
        <p className="text-sm text-slate-500">Contact</p>
        <p className="font-semibold">
          {selectedBill.customer?.contact || "-"}
        </p>
      </div>

      <div>
        <p className="text-sm text-slate-500">Age</p>
        <p className="font-semibold">
          {selectedBill.customer?.age || "-"}
        </p>
      </div>

      <div>
        <p className="text-sm text-slate-500">Gender</p>
        <p className="font-semibold">
          {selectedBill.customer?.gender || "-"}
        </p>
      </div>
    </div>

    {/* Invoice Details */}
    <div className="mb-6">
      <p>
        <strong>Invoice:</strong> {selectedBill.invoiceNo}
      </p>

      <p>
        <strong>Date:</strong> {selectedBill.date}
      </p>
    </div>

    {/* Medicines */}
    <table className="w-full border border-slate-200">
      <thead>
        <tr className="bg-slate-100">
          <th className="p-3 text-left">Medicine</th>
          <th className="p-3 text-left">Company</th>
          <th className="p-3 text-left">Qty</th>
          <th className="p-3 text-left">Price</th>
          <th className="p-3 text-left">Total</th>
        </tr>
      </thead>

      <tbody>
        {selectedBill.items?.map((item) => (
          <tr key={item.id} className="border-t">
            <td className="p-3">{item.medicine}</td>
            <td className="p-3">{item.company}</td>
            <td className="p-3">{item.quantity}</td>
            <td className="p-3">₹{item.price}</td>
            <td className="p-3">₹{item.total}</td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* Summary */}
    <div className="mt-6 space-y-2 text-right">
      <p>
        <strong>Subtotal:</strong> ₹{selectedBill.subtotal}
      </p>

      <p>
        <strong>Discount:</strong> ₹{selectedBill.discount}
      </p>

      <p>
        <strong>GST:</strong> ₹{selectedBill.gstAmount}
      </p>

      <p className="text-xl font-bold text-brand-secondary">
        Grand Total: ₹{selectedBill.grandTotal}
      </p>
    </div>
  </div>
)}
    </div>
  );
};

export default BillHistoryPage;

import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getInvoiceHistory,
  getInvoiceDetails,
} from "../services/BillingService";

const BillHistoryPage = () => {
  const [selectedBill, setSelectedBill] = useState(null);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      const data = await getInvoiceHistory();
      setBills(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load invoice history.");
    }
  };

  const handleViewInvoice = async (invoiceNumber) => {
    try {
      const data = await getInvoiceDetails(invoiceNumber);
      setSelectedBill(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load invoice details.");
    }
  };

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
              <th className="text-left p-4">Customer Name</th>
              <th className="text-left p-4">Total</th>
              <th className="text-left p-4">Payment</th>
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
                <Fragment key={bill.invoiceNumber}>
                  <tr className="border-b border-slate-100">
                    <td className="p-4">{bill.invoiceNumber}</td>

                    <td className="p-4">
                      {new Date(bill.createdAt).toLocaleString()}
                    </td>

                    <td className="p-4">{bill.customerName}</td>

                    <td className="p-4 font-semibold">
                      ₹{Number(bill.grandTotal).toFixed(2)}
                    </td>

                    <td className="p-4">{bill.paymentMode}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleViewInvoice(bill.invoiceNumber)}
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

                  {selectedBill?.invoiceNumber === bill.invoiceNumber && (
                    
                    <tr>
                      <td colSpan="6" className="px-4 py-5 bg-slate-50">
                        {/* MOVE YOUR BILL DETAILS HERE */}
                        {selectedBill && (
                          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
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
                                <p className="text-sm text-slate-500">
                                  Customer Name
                                </p>
                                <p className="font-semibold">
                                  {selectedBill.customer?.customerName || "-"}
                                </p>
                              </div>

                              <div>
                                <p className="text-sm text-slate-500">
                                  Contact
                                </p>
                                <p className="font-semibold">
                                  {selectedBill.customer?.contactNumber || "-"}
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
                                <strong>Invoice:</strong>{" "}
                                {selectedBill.invoiceNumber}
                              </p>

                              <p>
                                <strong>Date:</strong>{" "}
                                {new Date(
                                  selectedBill.createdAt,
                                ).toLocaleString()}
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
                                {selectedBill.items.map((item, index) => (
                                  <tr key={index}>
                                    <td>{item.medicineName}</td>
                                    <td>{item.manufacturer}</td>
                                    <td>{item.quantity}</td>
                                    <td>₹{Number(item.price).toFixed(2)}</td>
                                    <td>
                                      ₹{Number(item.lineTotal).toFixed(2)}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>

                            {/* Summary */}
                            <div className="mt-6 space-y-2 text-right">
                              <p>
                                <strong>Subtotal:</strong> ₹
                                {Number(selectedBill.grossTotal).toFixed(2)}
                              </p>

                              <p>
                                <strong>Discount:</strong>{" "}
                                {selectedBill.discountPercentage}%
                              </p>

                              <p>
                                <strong>GST:</strong> ₹
                                {Number(selectedBill.taxAmount).toFixed(2)}
                              </p>

                              <p className="text-xl font-bold text-brand-secondary">
                                ₹{Number(selectedBill.grandTotal).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                    
                  )}
                </Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillHistoryPage;

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react"; // Run: npm install qrcode.react

const BillingPage = () => {
  const medicines = [
    {
      id: 1,
      name: "Dolo 650",
      company: "Micro Labs",
      category: "Tablet",
      stock: 120,
      stripSize: 15,
      price: 35,
    },
    {
      id: 2,
      name: "Crocin 500",
      company: "GSK",
      category: "Tablet",
      stock: 80,
      stripSize: 10,
      price: 25,
    },
  ];

  const [customerName, setCustomerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [billItems, setBillItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [discount, setDiscount] = useState(0);

  // Added functionality states
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMode, setPaymentMode] = useState("");

  const handleAddToBill = () => {
    if (!selectedMedicine || !quantity) return;

    if (Number(quantity) > selectedMedicine.stock) {
      alert("Quantity exceeds available stock");
      return;
    }

    const item = {
      id: Date.now(),
      medicine: selectedMedicine.name,
      company: selectedMedicine.company,
      category: selectedMedicine.category,
      quantity: Number(quantity),
      stock: selectedMedicine.stock,
      price: selectedMedicine.price,
      total: Number(quantity) * selectedMedicine.price,
    };

    setBillItems([...billItems, item]);

    setQuantity("");
    setSelectedMedicine(null);
  };

  const handleDeleteItem = (id) => {
    setBillItems(billItems.filter((item) => item.id !== id));
  };

  const subtotal = billItems.reduce((sum, item) => sum + item.total, 0);
  const gstAmount = subtotal * 0.12; // 12% GST

  const grandTotal = subtotal + gstAmount - Number(discount || 0);

  // Open the payment gate popup instead of firing immediate download
  const handleOpenPaymentGateway = () => {
    if (billItems.length === 0) {
      alert("Add medicines before generating bill");
      return;
    }
    setPaymentMode("");
    setShowPaymentModal(true);
  };

  // Process the final payload save operation
  const handleFinalCheckout = () => {
    if (!paymentMode) {
      alert("Please select a method of payment.");
      return;
    }

    const bill = {
      invoiceNo: `INV-${Date.now()}`,
      date: new Date().toLocaleString(),

      customer: {
        name: customerName,
        contact: contactNumber,
        age,
        gender,
      },

      items: billItems,

      subtotal,
      discount,
      gstAmount,
      grandTotal,
      paymentMode, // Bundled into structural dataset
    };

    const existingBills = JSON.parse(localStorage.getItem("billHistory")) || [];
    existingBills.push(bill);
    localStorage.setItem("billHistory", JSON.stringify(existingBills));

    alert("Bill saved to history successfully");
    
    // Reset core states after saving
    setShowPaymentModal(false);
    setBillItems([]);
    setCustomerName("");
    setContactNumber("");
    setAge("");
    setGender("");
    setDiscount(0);
  };

  const upiString = `upi://pay?pa=medisyncpharmacy@okaxis&pn=MediSync_Healthcare&am=${grandTotal.toFixed(2)}&cu=INR&tn=Pharmacy_Bill`;

  return (
    <div className="space-y-6 animate-fadeIn text-left">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
          Smart Billing Console Workspace
        </h2>
        <p className="text-sm text-slate-500 font-medium">
          Create invoice for customer and manage billing seamlessly.
        </p>
      </div>

      {/* Customer Information */}
<div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
  <div className="px-6 py-4 border-b border-slate-100">
    <h3 className="text-lg font-bold text-slate-800">
      Customer Information
    </h3>
  </div>

  <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
    <input
      value={customerName}
      onChange={(e) => setCustomerName(e.target.value)}
      placeholder="Customer Name"
      className="border border-slate-200 rounded-lg px-4 py-3 w-full"
    />

    <input
      value={contactNumber}
      onChange={(e) => setContactNumber(e.target.value)}
      placeholder="Contact Number"
      className="border border-slate-200 rounded-lg px-4 py-3 w-full"
    />

    <input
      value={age}
      onChange={(e) => setAge(e.target.value)}
      placeholder="Age"
      className="border border-slate-200 rounded-lg px-4 py-3 w-full"
    />

    <select 
      value={gender} 
      onChange={(e) => setGender(e.target.value)}
      className="border border-slate-200 rounded-lg px-4 py-3 w-full bg-white"
    >
      <option value="">Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
    </select> 
  </div>
</div>

      {/* Add Medicine */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">Add Medicine</h3>
        </div>

        <div className="p-6">
          <div className="mt-5 bg-slate-50 border border-slate-200 rounded-xl p-5">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Medicine Name
                </label>

                <div
                  onClick={() => setShowModal(true)}
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 text-left cursor-pointer bg-white"
                >
                  {selectedMedicine?.name || "Select Medicine"}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Company
                </label>

                <input
                  value={selectedMedicine?.company || "Select Company"}
                  readOnly
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>

                <input
                  value={selectedMedicine?.category || "Select Category"}
                  readOnly
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Strips / Qty
                </label>

                <input
                  type="number"
                  placeholder="Enter Strips / Qty"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Price (₹)
                </label>

                <input
                  value={selectedMedicine?.price || "0.00"}
                  readOnly
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 bg-slate-50"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleAddToBill}
                  className="w-full bg-brand-secondary text-white rounded-lg py-3 font-semibold"
                >
                  Add To Bill
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bill Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 min-h-[350px]">
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-800">Bill Items</h3>
          </div>

          <div className="overflow-x-auto">
            {billItems.length === 0 ? (
              <div className="flex items-center justify-center h-[250px] text-slate-400">
                No medicines added yet
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left p-4">#</th>
                    <th className="text-left p-4">Medicine Name</th>
                    <th className="text-left p-4">Company</th>
                    <th className="text-left p-4">Category</th>
                    <th className="text-left p-4">Strips / Qty</th>
                    <th className="text-left p-4">Price (₹)</th>
                    <th className="text-left p-4">Total (₹)</th>
                    <th className="text-left p-4">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {billItems.map((item, index) => (
                    <tr key={item.id} className="border-b border-slate-100">
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4">{item.medicine}</td>
                      <td className="p-4">{item.company}</td>
                      <td className="p-4">{item.category}</td>
                      <td className="p-4">
                        <div className="inline-flex items-center border border-slate-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => {
                              setBillItems(
                                billItems.map((bill) =>
                                  bill.id === item.id
                                    ? {
                                        ...bill,
                                        quantity: Math.max(1, bill.quantity - 1),
                                        total: Math.max(1, bill.quantity - 1) * bill.price,
                                      }
                                    : bill
                                )
                              );
                            }}
                            className="w-10 h-10 flex items-center justify-center text-lg font-semibold hover:bg-slate-50"
                          >
                            -
                          </button>

                          <div className="w-14 h-10 flex items-center justify-center border-x border-slate-200 font-medium">
                            {item.quantity}
                          </div>

                          <button
                            onClick={() => {
                              setBillItems(
                                billItems.map((bill) =>
                                  bill.id === item.id
                                    ? {
                                        ...bill,
                                        quantity: bill.quantity + 1,
                                        total: (bill.quantity + 1) * bill.price,
                                      }
                                    : bill
                                )
                              );
                            }}
                            className="w-10 h-10 flex items-center justify-center text-lg font-semibold hover:bg-slate-50"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="p-4">₹{item.price}</td>
                      <td className="p-4 font-semibold">₹{item.total}</td>

                      <td className="p-4">
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="w-10 h-10 rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 flex items-center justify-center"
                        >
                          🗑
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-800">Bill Summary</h3>
          </div>

          <div className="p-6 space-y-5">
            <div className="flex justify-between">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-medium">₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-600">Discount (%)</span>
              <input
                type="number"
                min="0"
                max="100"
                value={discount}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value > 100) {
                    setDiscount(100);
                  } else {
                    setDiscount(value);
                  }
                }}
                className="w-24 border border-slate-200 rounded-lg px-3 py-2 text-right"
              />
            </div>

            <div className="flex justify-between">
              <span className="text-slate-600">GST (12%)</span>
              <span className="font-medium">₹{gstAmount.toFixed(2)}</span>
            </div>

            <div className="border-t pt-4 flex justify-between text-xl font-bold">
              <span>Grand Total</span>
              <span className="text-brand-secondary">
                ₹{grandTotal.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleOpenPaymentGateway}
              className="w-full bg-brand-primary hover:bg-brand-secondary text-white py-3 rounded-lg font-semibold transition"
            >
              Generate Bill
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Payment Option Prompt Pop-Up Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h3 className="text-lg font-bold">Select Payment Mode</h3>
              <button onClick={() => setShowPaymentModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 text-center mb-4 border">
              <span className="text-xs font-semibold text-slate-500 uppercase">Amount Payable</span>
              <h2 className="text-2xl font-bold text-slate-800 mt-1">₹{grandTotal.toFixed(2)}</h2>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                type="button"
                onClick={() => setPaymentMode("CASH")}
                className={`p-4 rounded-xl border-2 font-bold transition text-center ${
                  paymentMode === "CASH"
                    ? "border-brand-primary bg-slate-50 text-slate-800"
                    : "border-slate-200 text-slate-600"
                }`}
              >
                💵 Cash
              </button>

              <button
                type="button"
                onClick={() => setPaymentMode("ONLINE")}
                className={`p-4 rounded-xl border-2 font-bold transition text-center ${
                  paymentMode === "ONLINE"
                    ? "border-brand-primary bg-slate-50 text-slate-800"
                    : "border-slate-200 text-slate-600"
                }`}
              >
                📱 Online / UPI
              </button>
            </div>

            {/* If choice matches Online -> Render the SVG code string */}
            {paymentMode === "ONLINE" && (
              <div className="bg-slate-50 border rounded-xl p-4 flex flex-col items-center justify-center gap-2 mb-4">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Scan UPI QR Code</p>
                <div className="bg-white p-2 rounded-lg border">
                  <QRCodeSVG value={upiString} size={160} includeMargin={true} />
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={handleFinalCheckout}
                className="flex-1 py-2.5 bg-brand-primary hover:bg-brand-secondary text-white font-semibold rounded-lg transition"
              >
                Confirm Bill
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Medicine Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Search Medicine</h3>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>

            <input
              type="text"
              placeholder="Search medicine..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-4 py-3 mb-4"
            />

            {medicines
              .filter((medicine) =>
                medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((medicine) => (
                <div
                  key={medicine.id}
                  className="flex justify-between items-center border-b py-3"
                >
                  <div>
                    <p className="font-semibold">{medicine.name}</p>
                    <p className="text-sm text-slate-500">{medicine.company}</p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedMedicine(medicine);
                      setShowModal(false);
                    }}
                    className="px-3 py-2 bg-brand-secondary text-white rounded-md"
                  >
                    Select
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingPage;
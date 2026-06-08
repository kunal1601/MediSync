const BillingPage = () => {
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
            placeholder="Customer Name"
            className="border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-brand-secondary"
          />

          <input
            placeholder="Contact Number"
            className="border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-brand-secondary"
          />

          <input
            placeholder="Age"
            className="border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-brand-secondary"
          />

          <select className="border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-brand-secondary">
            <option>Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      {/* Add Medicine */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">
            Add Medicine
          </h3>
        </div>

        <div className="p-6">
          <button
            className="
              px-5 py-3
              rounded-lg
              bg-brand-secondary
              text-white
              font-semibold
              hover:bg-brand-primary
              transition
            "
          >
            Search Medicine
          </button>
        </div>
      </div>

      {/* Bill Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 min-h-[350px]">
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-800">
              Bill Items
            </h3>
          </div>

          <div className="flex items-center justify-center h-[250px] text-slate-400">
            No medicines added yet
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-800">
              Bill Summary
            </h3>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹0</span>
            </div>

            <div className="flex justify-between">
              <span>GST</span>
              <span>₹0</span>
            </div>

            <div className="border-t pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹0</span>
            </div>

            <button
              className="
                w-full
                bg-brand-primary
                hover:bg-brand-secondary
                text-white
                py-3
                rounded-lg
                font-semibold
                transition
              "
            >
              Generate Bill
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default BillingPage;
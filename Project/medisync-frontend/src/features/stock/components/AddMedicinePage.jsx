import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCapsules } from "react-icons/fa6";

const AddMedicinePage = () => {
  const navigate = useNavigate();

  const [medicine, setMedicine] = useState({
    itemCode: "",
    name: "",
    category: "",
    batchNumber: "",
    expiryDate: "",
    stockQuantity: "",
    pricePerUnit: "",
  });

  const handleChange = (e) => {
    setMedicine({
      ...medicine,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(medicine);

    // TODO:
    // await addMedicine(medicine);

    alert("Medicine Saved Successfully");

    navigate("/dashboard/pharmacist/stock-details");
  };

  return (
    <div className="space-y-6 animate-fadeIn">

      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-6 py-5">
        <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-800">
          <FaCapsules className="text-brand-secondary" />
          Add Medicine
        </h2>

        <p className="text-slate-500 mt-1">
          Enter medicine details to add new stock.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Item Code */}
          <div>
            <label className="block mb-2 font-semibold text-slate-700">
              Item Code
            </label>

            <input
              type="text"
              name="itemCode"
              value={medicine.itemCode}
              onChange={handleChange}
              placeholder="Enter Item Code"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-brand-secondary"
              required
            />
          </div>

          {/* Medicine Name */}
          <div>
            <label className="block mb-2 font-semibold text-slate-700">
              Medicine Name
            </label>

            <input
              type="text"
              name="name"
              value={medicine.name}
              onChange={handleChange}
              placeholder="Enter Medicine Name"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-brand-secondary"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 font-semibold text-slate-700">
              Category
            </label>

            <select
              name="category"
              value={medicine.category}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-brand-secondary"
              required
            >
              <option value="">Select Category</option>
              <option value="TABLETS">TABLETS</option>
              <option value="CAPSULES">CAPSULES</option>
              <option value="SYRUPS">SYRUPS</option>
              <option value="DROPS">DROPS</option>
              <option value="INJECTIONS">INJECTIONS</option>
              <option value="OINTMENTS">OINTMENTS</option>
            </select>
          </div>

          {/* Batch Number */}
          <div>
            <label className="block mb-2 font-semibold text-slate-700">
              Batch Number
            </label>

            <input
              type="text"
              name="batchNumber"
              value={medicine.batchNumber}
              onChange={handleChange}
              placeholder="Enter Batch Number"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-brand-secondary"
              required
            />
          </div>

          {/* Expiry Date */}
          <div>
            <label className="block mb-2 font-semibold text-slate-700">
              Expiry Date
            </label>

            <input
              type="date"
              name="expiryDate"
              value={medicine.expiryDate}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-brand-secondary"
              required
            />
          </div>

          {/* Stock Quantity */}
          <div>
            <label className="block mb-2 font-semibold text-slate-700">
              Stock Quantity
            </label>

            <input
              type="number"
              name="stockQuantity"
              value={medicine.stockQuantity}
              onChange={handleChange}
              placeholder="Enter Quantity"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-brand-secondary"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-2 font-semibold text-slate-700">
              Price Per Unit (₹)
            </label>

            <input
              type="number"
              name="pricePerUnit"
              value={medicine.pricePerUnit}
              onChange={handleChange}
              placeholder="Enter Price"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-brand-secondary"
              required
            />
          </div>

        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-10">

          <button
            type="button"
            onClick={() =>
              navigate("/dashboard/pharmacist/stock-details")
            }
            className="px-6 py-3 rounded-lg border border-slate-300 hover:bg-slate-100 font-semibold"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-brand-primary hover:bg-brand-secondary text-white font-semibold"
          >
            Save Medicine
          </button>

        </div>
      </form>
    </div>
  );
};

export default AddMedicinePage;
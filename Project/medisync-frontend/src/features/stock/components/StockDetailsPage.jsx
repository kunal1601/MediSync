import { useState } from "react";
import { FaBoxesStacked } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const StockDetailsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const medicines = [
    {
      id: 1,
      medicineName: "Paracetamol 500mg",
      category: "Fever",
      company: "Cipla",
      units: 150,
      price: 25,
      expiryDate: "2027-08-12",
      status: "Fresh",
    },
    {
      id: 2,
      medicineName: "Amoxicillin 250mg",
      category: "Antibiotic",
      company: "Sun Pharma",
      units: 80,
      price: 120,
      expiryDate: "2026-05-01",
      status: "Near Expiry",
    },
    {
      id: 3,
      medicineName: "Cetirizine",
      category: "Allergy",
      company: "Dr. Reddy's",
      units: 200,
      price: 35,
      expiryDate: "2027-01-10",
      status: "Fresh",
    },
    {
      id: 4,
      medicineName: "Pantoprazole",
      category: "Acidity",
      company: "Lupin",
      units: 120,
      price: 90,
      expiryDate: "2026-04-15",
      status: "Expired",
    },
    {
      id: 5,
      medicineName: "Azithromycin",
      category: "Antibiotic",
      company: "Zydus",
      units: 60,
      price: 150,
      expiryDate: "2025-12-15",
      status: "Expired",
    },
    {
      id: 6,
      medicineName: "Crocin Advance",
      category: "Pain Relief",
      company: "GSK",
      units: 180,
      price: 30,
      expiryDate: "2027-09-20",
      status: "Fresh",
    },
    {
      id: 7,
      medicineName: "Benadryl Syrup",
      category: "Cough",
      company: "Johnson & Johnson",
      units: 75,
      price: 110,
      expiryDate: "2027-11-11",
      status: "Fresh",
    },
    {
      id: 8,
      medicineName: "Volini Gel",
      category: "Pain Relief",
      company: "Sun Pharma",
      units: 90,
      price: 95,
      expiryDate: "2026-12-25",
      status: "Fresh",
    },
  ];

  const filteredMedicines = medicines.filter((medicine) => {
    const matchesSearch =
      `${medicine.medicineName} ${medicine.category} ${medicine.company}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || medicine.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* PAGE TITLE */}
      <div className="bg-white rounded-xl border border-slate-200 px-6 py-4 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
          <FaBoxesStacked className="text-brand-secondary text-xl" />
          Stock Details
        </h2>
      </div>

      
      {/* SEARCH BAR */}
<div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex justify-between items-center">

  <input
    type="text"
    placeholder="Search by name, category, company..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-96 px-4 py-2 bg-slate-100 rounded-lg outline-none border border-transparent focus:border-brand-secondary"
  />

  <div className="flex items-center gap-3">

    <button
      onClick={() =>
        navigate("/dashboard/pharmacist/stock-details/add")
      }
      className="px-5 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary transition"
    >
      + Add Medicine
    </button>

    <div className="relative">
      <button
        onClick={() => setShowFilter(!showFilter)}
        className="px-4 py-2 bg-slate-100 rounded-lg text-slate-600 font-medium hover:bg-slate-200 transition"
      >
        Filter: {statusFilter} ▼
      </button>

      {showFilter && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-lg shadow-lg z-50">

          <button
            onClick={() => {
              setStatusFilter("All");
              setShowFilter(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-slate-100"
          >
            All
          </button>

          <button
            onClick={() => {
              setStatusFilter("Fresh");
              setShowFilter(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-slate-100"
          >
            Fresh
          </button>

          <button
            onClick={() => {
              setStatusFilter("Near Expiry");
              setShowFilter(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-slate-100"
          >
            Near Expiry
          </button>

          <button
            onClick={() => {
              setStatusFilter("Expired");
              setShowFilter(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-slate-100"
          >
            Expired
          </button>

        </div>
      )}
    </div>

  </div>

</div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr className="text-left text-sm text-slate-600">
                <th className="px-6 py-4">Medicine Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Company Name</th>
                <th className="px-6 py-4">Total Units</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Expiry Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredMedicines.map((medicine) => (
                <tr
                  key={medicine.id}
                  className="border-t border-slate-100 hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-4">{medicine.medicineName}</td>
                  <td className="px-6 py-4">{medicine.category}</td>
                  <td className="px-6 py-4 text-teal-700">
                    {medicine.company}
                  </td>
                  <td className="px-6 py-4">{medicine.units}</td>
                  <td className="px-6 py-4">₹{medicine.price}</td>
                  <td className="px-6 py-4">{medicine.expiryDate}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`font-semibold ${
                        medicine.status === "Fresh"
                          ? "text-green-600"
                          : medicine.status === "Near Expiry"
                            ? "text-orange-500"
                            : "text-red-600"
                      }`}
                    >
                      {medicine.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StockDetailsPage;

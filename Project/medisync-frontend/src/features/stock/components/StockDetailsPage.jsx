import { useEffect, useState } from "react";
import { FaBoxesStacked } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { getAllStocks } from "../services/stockService";

const StockDetailsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");

  const [medicines, setMedicines] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(20);

  useEffect(() => {
    loadStocks(currentPage);
  }, [currentPage]);

  const loadStocks = async (page = 0) => {
    try {
      const response = await getAllStocks(page, pageSize);

      console.log(response);

      setMedicines(response.data);
      setCurrentPage(response.currentPage);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredMedicines = medicines.filter((medicine) => {
    const matchesSearch =
      `${medicine.medicineName} ${medicine.batchNumber} ${medicine.manufacturer}`
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
          placeholder="Search by name, batch, manufacturer"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-96 px-4 py-2 bg-slate-100 rounded-lg outline-none border border-transparent focus:border-brand-secondary"
        />

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard/pharmacist/stock-details/add")}
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
                <th className="px-6 py-4">Batch ID</th>
                <th className="px-6 py-4">Manufacturer</th>
                <th className="px-6 py-4">Total Units</th>
                <th className="px-6 py-4">Expiry Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredMedicines.map((medicine) => (
                <tr
                  key={medicine.stockId}
                  className="border-t border-slate-100 hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-4">{medicine.medicineName}</td>
                  <td className="px-6 py-4">{medicine.batchNumber}</td>
                  <td className="px-6 py-4 text-teal-700">
                    {medicine.manufacturer}
                  </td>
                  <td className="px-6 py-4">{medicine.stockQuantity}</td>
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
      <div className="flex items-center justify-between mt-5">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={!currentPage}
          className="px-4 py-2 rounded-lg bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <span className="font-medium text-slate-600">
          Page {currentPage + 1} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage + 1 >= totalPages}
          className="px-4 py-2 rounded-lg bg-brand-primary text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StockDetailsPage;

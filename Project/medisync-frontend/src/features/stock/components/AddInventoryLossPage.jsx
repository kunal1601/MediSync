import React, { useState , useEffect} from 'react'
import { toast } from 'react-toastify';
import { addInventoryLoss, getAllStocks } from '../services/stockService';
import { useNavigate } from "react-router-dom";
import { FaCapsules } from "react-icons/fa6";
function AddInventoryLossPage() {
    const navigate = useNavigate();
    const [stocks, setStocks] = useState([]);
    const [loss, setLoss] = useState({
        stockId:"",
        quantity:"",
        lossType:"",
        reason:""
    });
    useEffect(() => {
        loadStocks();
    }, []);

    const loadStocks = async () => {
        try {
            const response = await getAllStocks();

            setStocks(response.data);
        } catch (error) {
            toast.error("Unable to load medicines");
        }
    };
    const handleChange=(e)=>{
        setLoss({
            ...loss,
            [e.target.name]:e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          console.log(loss);
            await addInventoryLoss(loss);

            toast.success("Inventory Loss Added");

            setTimeout(() => {
                navigate("/dashboard/pharmacist/stock-details");
            },1200);

        } catch (error) {
          console.log("Error:", error);
          console.log("Response:", error.response);
          console.log("Data:", error.response?.data);

          toast.error(
              error.response?.data?.message ||
              error.response?.data ||
              "Failed to add inventory loss"
          );
      }
    };
    const selectedStock = stocks.find(
          stock => stock.stockId == loss.stockId
      );
  return (
    
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-6 py-5">
              <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-800">
                <FaCapsules className="text-brand-secondary" />
                Report Inventory Loss
              </h2>
      
              <p className="text-slate-500 mt-1">
                Record damaged, expired or missing medicines.
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
                    Stock Id
                  </label>
      
                 <select
                      name="stockId"
                      value={loss.stockId}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-4 py-3"
                  >
                      <option value="">Select Medicine</option>

                      {stocks.map((stock) => (
                          <option
                              key={stock.stockId}
                              value={stock.stockId}
                          >
                              {stock.medicineName} ({stock.batchNumber})
                          </option>
                      ))}
                  </select>
                  {selectedStock && (
                      <div className="mt-3 p-4 bg-slate-50 rounded-lg border">
                          <p><strong>Manufacturer:</strong> {selectedStock.manufacturer}</p>
                          <p><strong>Batch:</strong> {selectedStock.batchNumber}</p>
                          <p><strong>Available Quantity:</strong> {selectedStock.stockQuantity}</p>
                          <p><strong>Status:</strong> {selectedStock.status}</p>
                      </div>
                  )}
                </div>

                {/* Manufacturer */}
                <div>
                  <label className="block mb-2 font-semibold text-slate-700">
                    Quantity
                  </label>
      
                  <input
                    type="number"
                    name="quantity"
                    value={loss.quantity}
                    onChange={handleChange}
                    placeholder="Enter Quantity"
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-brand-secondary"
                    required
                  />
                </div>
      
                {/* Category */}
             <div>
                    <label className="block mb-2 font-semibold text-slate-700">
                        Loss Type
                    </label>

                    <select
                        name="lossType"
                        value={loss.lossType}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-brand-secondary "
                        required
                    >
                        <option value="">Select Loss Type</option>
                        <option value="EXPIRED">Expired</option>
                        <option value="DAMAGED">Damaged</option>
                        <option value="BREAKAGE">Breakage</option>
                        <option value="RETURNED">Returned</option>
                        <option value="STOLEN">Stolen</option>
                        <option value="OTHER">Other</option>
                    </select>
                </div>
      
                {/* Batch Number */}
                <div>
                  <label className="block mb-2 font-semibold text-slate-700">
                    Reason
                  </label>
      
                  <textarea
                    name="reason"
                    value={loss.reason}
                    onChange={handleChange}
                    placeholder="Enter Reason"
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-brand-secondary"
                    required
                  />
                </div>
    
              </div>
      
              {/* Buttons */}
              <div className="flex justify-end gap-4 mt-10">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/pharmacist/stock-details")}
                  className="px-6 py-3 rounded-lg border border-slate-300 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
      
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-brand-primary hover:bg-brand-secondary text-white font-semibold"
                >
                  Save Loss
                </button>
              </div>
            </form>
          </div>
   
  )
}

export default AddInventoryLossPage

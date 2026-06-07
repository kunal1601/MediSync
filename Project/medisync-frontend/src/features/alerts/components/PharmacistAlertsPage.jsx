import { useState } from "react";
import {
  FaBell,
  FaClipboardList,
  FaPaperPlane,
  FaTriangleExclamation
} from "react-icons/fa6";
const PharmacistAlertsPage = () => {
    // Controls custom request type dropdown visibility
    const [showDropdown, setShowDropdown] = useState(false);
    // Stores all requests sent to Admin and their statuses
    const [requests, setRequests] = useState([
        {
            id: 1,
            medicine: "Volini Gel",
            requestType: "Restock Request",
            status: "Pending"
        },
        {
            id: 2,
            medicine: "Crocin Advance",
            requestType: "Customer Demand",
            status: "Approved"
        },
        {
            id: 3,
            medicine: "Dolo 650",
            requestType: "Special Order",
            status: "Rejected"
        }
    ]);
    // Stores data entered in the Raise New Request form
    const [newRequest, setNewRequest] = useState({
        medicine: "",
        requestType: "Restock Request",
        customRequestType: "",
        message: ""
    });
    // System-generated alerts automatically detected by inventory system
    const systemAlerts = [
        {
            id: 1,
            medicine: "Paracetamol 500mg",
            alertType: "Out Of Stock",
            severity: "High"
        },
        {
            id: 2,
            medicine: "Amoxicillin 250mg",
            alertType: "Near Expiry",
            severity: "Medium"
        },
        {
            id: 3,
            medicine: "Pantoprazole",
            alertType: "Expired",
            severity: "High"
        }
    ];
     // Handles manual request submission by pharmacist
    const handleSubmit = () => {

        if (!newRequest.medicine.trim()) return;

        if (
            newRequest.requestType === "Other" &&
            !newRequest.customRequestType.trim()
        ) {
            alert("Please specify the request type");
            return;
        }
        const request = {
            id: Date.now(),
            medicine: newRequest.medicine,
            requestType: newRequest.requestType === "Other"
            ? newRequest.customRequestType
            : newRequest.requestType,
            status: "Pending"
        };
        // Add new request at the top of request list
        setRequests([request, ...requests]);
        // Clear form after successful submission
        setNewRequest({
            medicine: "",
            requestType: "Restock Request",
            customRequestType: "",
            message: ""
        });
    };
     // Sends a system-generated alert to Admin as a request
    const sendAlertToAdmin = (alert) => {
        // Check whether the same alert was already sent
        const alreadySent = requests.some(
            (request) =>
                request.medicine === alert.medicine &&
                request.requestType === alert.alertType
        );

        if (alreadySent) {
            alert("Request already sent to Admin");
            return;
        }
        // Add alert-based request to request table
        const request = {
            id: Date.now(),
            medicine: alert.medicine,
            requestType: alert.alertType,
            status: "Pending"
        };

        setRequests([request, ...requests]);
    };

    return (
        <div className="space-y-6 animate-fadeIn">

            {/* PAGE HEADER */}
            <div className="bg-white rounded-xl border border-slate-200 px-6 py-4 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                    <FaBell className="text-brand-secondary" /> 
                    Alerts & Requests
                </h2>
            </div>

            {/* SYSTEM ALERTS */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm">
                <div className="px-6 py-4 border-b-0">
                    <h3 className="flex items-center gap-2 font-bold text-lg leading-none">
                         <FaTriangleExclamation className="text-brand-secondary text-base" />
                        System Generated Alerts
                    </h3>
                </div>

                <div className="p-5 space-y-3">

                    {systemAlerts.map((alert) => (
                       <div
                            key={alert.id}
                           className="border border-slate-100 rounded-lg p-4 flex justify-between items-center hover:bg-slate-50 transition-all duration-200" >
                        <div>
                            <p className="font-semibold">
                                {alert.medicine}
                            </p>

                            <p className="text-sm text-slate-500">
                                {alert.alertType}
                            </p>
                        </div>

                    <div className="flex items-center gap-3">

                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold
                            ${
                                alert.severity === "High"
                                    ? "bg-red-100 text-red-600"
                                    : "bg-orange-100 text-orange-600"
                            }`}
                        >
                            {alert.severity}
                        </span>

                        <button
                            onClick={() => sendAlertToAdmin(alert)}
                            className="
                                px-4
                                py-2
                                bg-brand-secondary
                                text-white
                                rounded-lg
                                text-sm
                                font-medium
                                transition
                                cursor-pointer
                            "
                        >
                            Send To Admin
                        </button>

                    </div>
                </div>
                    ))}

                </div>
            </div>

            {/* REQUEST STATUS */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm">

                <div className="px-6 py-4 border-b-0">
                    <h3 className="flex items-center gap-2 font-bold text-lg">
                        <FaClipboardList className="text-brand-secondary" />
                        Requests Sent To Admin
                    </h3>
                </div>

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-slate-50">

                            <tr className="text-left">
                                <th className="px-6 py-4">Medicine</th>
                                <th className="px-6 py-4">Request Type</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>

                        </thead>

                        <tbody>

                            {requests.map((request) => (

                                <tr
                                    key={request.id}
                                    className="border-t border-slate-100 hover:bg-slate-50 transition-all duration-200
"
                                >
                                    <td className="px-6 py-4">
                                        {request.medicine}
                                    </td>

                                    <td className="px-6 py-4">
                                        {request.requestType}
                                    </td>

                                    <td className="px-6 py-4">

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold
                                            ${
                                                request.status === "Approved"
                                                    ? "bg-green-100 text-green-600"
                                                    : request.status === "Rejected"
                                                    ? "bg-red-100 text-red-600"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }`}
                                        >
                                            {request.status}
                                        </span>

                                    </td>
                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>
            </div>

            {/* CREATE REQUEST */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm">

                <div className="px-6 py-4 border-b-0">
                    <h3 className="flex items-center gap-2 font-bold text-lg">
                         <FaPaperPlane className="text-brand-secondary" />
                        Raise New Request
                    </h3>
                </div>

                <div className="p-6 space-y-4">

                    <input
                        type="text"
                        placeholder="Medicine Name"
                        value={newRequest.medicine}
                        onChange={(e) =>
                            setNewRequest({
                                ...newRequest,
                                medicine: e.target.value
                            })
                        }
                        className="w-full border border-slate-200 rounded-lg px-4 py-3  hover:border-brand-secondary"
                    />

                   <div className="relative">
                        <button
                            type="button"
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="
                            w-full
                            flex
                            justify-between
                            items-center
                            px-4
                            py-3
                           
                            border
                            border-slate-200
                            rounded-lg
                            text-slate-700
                            hover:border-brand-secondary
                            "
                        >
                            {newRequest.requestType}
                            <span>▼</span>
                        </button>

                        {showDropdown && (
                            <div className="absolute z-20 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg">
                            {[
                                "Restock Request",
                                "Customer Demand",
                                "Special Order",
                                "Other"
                            ].map((option) => (
                                <button
                                key={option}
                                type="button"
                                onClick={() => {
                                    setNewRequest({
                                    ...newRequest,
                                    requestType: option
                                    });
                                    setShowDropdown(false);
                                }}
                                className="
                                    w-full
                                    text-left
                                    px-4
                                    py-3
                                    hover:bg-teal-50
                                    hover:text-brand-secondary
                                "
                                >
                                {option}
                                </button>
                            ))}
                            </div>
                        )}
                    </div>
                    {
                        newRequest.requestType === "Other" && (
                            <input
                                type="text"
                                placeholder="Specify Request Type"
                                value={newRequest.customRequestType}
                                onChange={(e) =>
                                    setNewRequest({
                                        ...newRequest,
                                        customRequestType: e.target.value
                                    })
                                }
                                className="
                                    w-full
                                    border
                                    rounded-lg
                                    px-4
                                    py-3
                                    
                                    hover:border-brand-secondary
                                    focus:outline-none
                                    focus:border-brand-secondary
                                "
                            />
                        )
                    }
                    <textarea
                        rows="4"
                        placeholder="Write request details..."
                        value={newRequest.message}
                        onChange={(e) =>
                            setNewRequest({
                                ...newRequest,
                                message: e.target.value
                            })
                        }
                        className="w-full border rounded-lg px-4 py-3 border-slate-200 hover:border-brand-secondary"
                    />

                    <button
                        onClick={handleSubmit}
                        className="bg-brand-secondary text-white px-6 py-3 rounded-lg font-semibold cursor-pointer"
                    >
                        Send Request To Admin
                    </button>

                </div>
            </div>

        </div>
    );
};

export default PharmacistAlertsPage;
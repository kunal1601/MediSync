import { useState } from "react";

const PharmacistAlertsPage = () => {
    // Controls custom request type dropdown visibility
    const [showDropdown, setShowDropdown] = useState(false);
    // Stores all requests sent to Admin and their statuses
    const [requests, setRequests] = useState([
        {
            id: 1,
            medicine: "Paracetamol 500mg",
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

        const request = {
            id: Date.now(),
            medicine: newRequest.medicine,
            requestType: newRequest.requestType,
            status: "Pending"
        };
        // Add new request at the top of request list
        setRequests([request, ...requests]);
        // Clear form after successful submission
        setNewRequest({
            medicine: "",
            requestType: "Restock Request",
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
                <h2 className="text-2xl font-bold text-slate-800">
                    Alerts & Requests
                </h2>
            </div>

            {/* SYSTEM ALERTS */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="px-6 py-4 border-b">
                    <h3 className="font-bold text-lg">
                        System Generated Alerts
                    </h3>
                </div>

                <div className="p-5 space-y-3">

                    {systemAlerts.map((alert) => (
                       <div
                            key={alert.id}
                            className="border rounded-lg p-4 flex justify-between items-center"
                        >
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

                <div className="px-6 py-4 border-b">
                    <h3 className="font-bold text-lg">
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
                                    className="border-t"
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

                <div className="px-6 py-4 border-b">
                    <h3 className="font-bold text-lg">
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
                        className="w-full border rounded-lg px-4 py-3  hover:border-brand-secondary"
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
                        className="w-full border rounded-lg px-4 py-3  hover:border-brand-secondary"
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
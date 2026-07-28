import { useState, useEffect } from "react";
import API from "../../../api/axios";

import {
  FaBell,
  FaClipboardList,
  FaPaperPlane,
  FaTriangleExclamation
} from "react-icons/fa6";

const REQUEST_TYPE_MAP = {
  "Restock Request": "RESTOCK_REQUEST",
  "Customer Demand": "CUSTOMER_DEMAND",
  "Special Order": "SPECIAL_ORDER",
  Other: "OTHER",
};

const formatLabel = (value) =>
  (value || "")
    .toString()
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

const getStatusStyles = (status) => {
  const normalized = (status || "").toUpperCase();

  if (normalized === "APPROVED") {
    return "bg-green-100 text-green-600";
  }

  if (normalized === "REJECTED") {
    return "bg-red-100 text-red-600";
  }

  return "bg-yellow-100 text-yellow-700";
};

const PharmacistAlertsPage = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [requests, setRequests] = useState([]);
  const [newRequest, setNewRequest] = useState({
    medicine: "",
    requestType: "Restock Request",
    customRequestType: "",
    message: "",
  });
  const [systemAlerts, setSystemAlerts] = useState([]);
  const [sendingAlertId, setSendingAlertId] = useState(null);
  const [submittingRequest, setSubmittingRequest] = useState(false);

  useEffect(() => {
    loadAlerts();
    loadRequests();
  }, []);

  const loadAlerts = async () => {
    try {
      const response = await API.get("/alerts/system");
      setSystemAlerts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadRequests = async () => {
    try {
      const response = await API.get("/alerts/requests");
      setRequests(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    if (!newRequest.medicine.trim()) {
      alert("Medicine name is required");
      return;
    }

    if (
      newRequest.requestType === "Other" &&
      !newRequest.customRequestType.trim()
    ) {
      alert("Please specify the request type");
      return;
    }

    setSubmittingRequest(true);

    try {
      const payload = {
        medicineId: null,
        medicineName: newRequest.medicine.trim(),
        alertType: REQUEST_TYPE_MAP[newRequest.requestType],
        description: newRequest.message.trim(),
        customRequestType:
          newRequest.requestType === "Other"
            ? newRequest.customRequestType.trim()
            : null,
      };

      const response = await API.post("/alerts/request", payload);

      setRequests((prev) => [response.data, ...prev]);

      setNewRequest({
        medicine: "",
        requestType: "Restock Request",
        customRequestType: "",
        message: "",
      });

      await loadRequests();
    } catch (error) {
      console.error(error);
      alert("Failed to send request");
    } finally {
      setSubmittingRequest(false);
    }
  };

  const sendAlertToAdmin = async (alert) => {
    setSendingAlertId(alert.alertId);

    const previousAlerts = systemAlerts;
    const previousRequests = requests;

    setSystemAlerts((prev) =>
      prev.filter((item) => item.alertId !== alert.alertId)
    );

    try {
      const response = await API.put(`/alerts/${alert.alertId}/send`);

      setRequests((prev) => {
        const withoutDuplicate = prev.filter(
          (item) => item.alertId !== response.data.alertId
        );
        return [response.data, ...withoutDuplicate];
      });

      await loadAlerts();
      await loadRequests();
    } catch (error) {
      setSystemAlerts(previousAlerts);
      setRequests(previousRequests);
      console.error(error);
      alert("Failed to send alert to admin");
    } finally {
      setSendingAlertId(null);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white rounded-xl border border-slate-200 px-6 py-4 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
          <FaBell className="text-brand-secondary" />
          Alerts & Requests
        </h2>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm">
        <div className="px-6 py-4 border-b-0">
          <h3 className="flex items-center gap-2 font-bold text-lg leading-none">
            <FaTriangleExclamation className="text-brand-secondary text-base" />
            System Generated Alerts
          </h3>
        </div>

        <div className="p-5 space-y-3">
          {systemAlerts.length === 0 ? (
            <p className="text-sm text-slate-500 py-4 text-center">
              No system alerts right now. New stock or expiry alerts will appear
              here.
            </p>
          ) : (
            systemAlerts.map((alert) => (
              <div
                key={alert.alertId}
                className="border border-slate-100 rounded-lg p-4 flex justify-between items-center hover:bg-slate-50 transition-all duration-200"
              >
                <div>
                  <p className="font-semibold">{alert.medicineName}</p>
                  <p className="text-sm text-slate-500">{alert.description}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      alert.alertType === "OUT_OF_STOCK" ||
                      alert.alertType === "EXPIRED"
                        ? "bg-red-100 text-red-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {formatLabel(alert.alertType)}
                  </span>

                  <button
                    onClick={() => sendAlertToAdmin(alert)}
                    disabled={sendingAlertId === alert.alertId}
                    className="px-4 py-2 bg-brand-secondary text-white rounded-lg text-sm font-medium transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sendingAlertId === alert.alertId
                      ? "Sending..."
                      : "Send To Admin"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

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
              {requests.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-8 text-center text-sm text-slate-500"
                  >
                    No requests sent yet. Send a system alert or raise a new
                    request below.
                  </td>
                </tr>
              ) : (
                requests.map((request) => (
                  <tr
                    key={request.alertId}
                    className="border-t border-slate-100 hover:bg-slate-50 transition-all duration-200"
                  >
                    <td className="px-6 py-4">{request.medicineName}</td>
                    <td className="px-6 py-4">
                      {formatLabel(request.alertType)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyles(
                          request.status
                        )}`}
                      >
                        {formatLabel(request.status)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

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
                medicine: e.target.value,
              })
            }
            className="w-full border border-slate-200 rounded-lg px-4 py-3 hover:border-brand-secondary"
          />

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full flex justify-between items-center px-4 py-3 border border-slate-200 rounded-lg text-slate-700 hover:border-brand-secondary"
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
                  "Other",
                ].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setNewRequest({
                        ...newRequest,
                        requestType: option,
                      });
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-teal-50 hover:text-brand-secondary"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {newRequest.requestType === "Other" && (
            <input
              type="text"
              placeholder="Specify Request Type"
              value={newRequest.customRequestType}
              onChange={(e) =>
                setNewRequest({
                  ...newRequest,
                  customRequestType: e.target.value,
                })
              }
              className="w-full border rounded-lg px-4 py-3 hover:border-brand-secondary focus:outline-none focus:border-brand-secondary"
            />
          )}

          <textarea
            rows="4"
            placeholder="Write request details..."
            value={newRequest.message}
            onChange={(e) =>
              setNewRequest({
                ...newRequest,
                message: e.target.value,
              })
            }
            className="w-full border rounded-lg px-4 py-3 border-slate-200 hover:border-brand-secondary"
          />

          <button
            onClick={handleSubmit}
            disabled={submittingRequest}
            className="bg-brand-secondary text-white px-6 py-3 rounded-lg font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submittingRequest ? "Sending..." : "Send Request To Admin"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PharmacistAlertsPage;

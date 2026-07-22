import { Navigate, Outlet } from "react-router-dom";

/**
 * Route Guard Component
 * Synchronously checks authentication & role authorization from localStorage.
 */
const ProtectedRoute = ({ allowedRole }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // 1. Unauthenticated users redirected to Admin Login
  if (!token) {
    return <Navigate to="/login/admin" replace />;
  }

  // 2. Role mismatch redirected to their appropriate portal
  if (allowedRole && userRole !== allowedRole) {
    return (
      <Navigate 
        to={userRole === "ADMIN" ? "/dashboard/admin" : "/login/pharmacist"} 
        replace 
      />
    );
  }

  // 3. Authorized -> Render requested child route
  return <Outlet />;
};

export default ProtectedRoute;
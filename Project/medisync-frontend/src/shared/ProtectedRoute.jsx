import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRole }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // 1. Unauthenticated users redirected to Login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2. Role mismatch redirected to their appropriate portal
  if (allowedRole && userRole !== allowedRole) {
    return <Navigate to={userRole === "ADMIN" ? "/admin/dashboard" : "/billing"} replace />;
  }

  // 3. Authorized -> Render requested child route
  return <Outlet />;
};

export default ProtectedRoute;
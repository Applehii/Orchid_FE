import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getRolesFromToken } from "../utils/authUtils";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const roles = getRolesFromToken();
  const hasAccess = roles.some((role) => allowedRoles.includes(role));
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    // Nếu user có quyền và không đứng ở /admin thì chuyển về /admin
    if (hasAccess && location.pathname !== "/admin") {
      navigate("/admin", { replace: true });
    }
  }, [hasAccess, location.pathname, navigate]);

  if (!hasAccess) {
    return <Navigate to="/401" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;

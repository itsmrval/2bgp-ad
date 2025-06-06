import { Navigate } from "react-router-dom";
import { useAuth } from "../api/auth/useAuth";

import VmsLoadingPage from "../pages/loading/vmsLoadingPage";
import ProfileDownloadPage from "../pages/loading/profileDownloadPage";

const ProtectedRoute = ({ children }) => {
  const { user, ovpnState, vmsState, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (ovpnState === false) {
    return <ProfileDownloadPage />;
  }

  if (vmsState === false) {
    return <VmsLoadingPage />;
  }

  return children;
};

export default ProtectedRoute;

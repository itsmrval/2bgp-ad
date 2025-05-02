import { Navigate } from "react-router-dom";
import { useAuth } from "../api/auth/useAuth";
import ProfileDownloadPage from "../pages/profileDownload/profileDownloadPage";

const ProtectedRoute = ({ children }) => {
  const { user, wgState, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  console.log(wgState)

  if (wgState === false) {
    return <ProfileDownloadPage />;
  }

  return children;
};

export default ProtectedRoute;

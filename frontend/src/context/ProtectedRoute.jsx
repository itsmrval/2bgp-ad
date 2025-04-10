import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    
    // Function to check if token is valid
    const isTokenValid = (token) => {
        try {
            // Parse token (assuming JWT format)
            const payload = JSON.parse(atob(token.split('.')[1]));
            
            // Check if token has expired
            if (payload.exp && payload.exp * 1000 < Date.now()) {
                return false;
            }
            return true;
        } catch (error) {
            console.error("Error validating token:", error);
            return false;
        }
    };
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        
        if (token && isTokenValid(token)) {
            setIsAuthenticated(true);
        } else {
            // If token doesn't exist or is invalid, remove it
            localStorage.removeItem("token");
            setIsAuthenticated(false);
        }
    }, []);
    
    if (isAuthenticated === null) {
        return <div>Loading...</div>; // 
    }
    
    return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
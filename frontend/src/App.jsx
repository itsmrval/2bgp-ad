import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from './api/auth/useAuth'; 

import LoginPages from './pages/auth/login';
import SignupPages from './pages/auth/signup';
import Intro from './pages/intro/intro';
import MainPage from './pages/main/main';
import MissionPage from './pages/mission/mission';
import AboutPage from './pages/about/aboutPage';
import Scoreboard from './pages/main/scoreboard';
import ProtectedRoute from "./context/ProtectedRoute";
import AdminPage from "./pages/admin/AdminDashboard"

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={
                        <ProtectedRoute>
                            <MainPage />
                        </ProtectedRoute>
                    } />                
                    <Route path="/intro" element={<Intro />} />
                    <Route path="/login" element={<LoginPages />} />
                    <Route path="/signup" element={<SignupPages />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/scoreboard" element={<Scoreboard />} />
                    

                    <Route path="/mission/:levelId" element={
                        <ProtectedRoute>
                            <MissionPage />
                        </ProtectedRoute>
                    } />

                    <Route path="/admin" element={
                        <ProtectedRoute>
                            <AdminPage />
                        </ProtectedRoute>
                    } />


                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;

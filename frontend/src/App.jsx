import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from 'react';

import { AuthProvider } from './api/auth/useAuth';  // Import AuthProvider

import LoginPages from './pages/auth/login';
import SignupPages from './pages/auth/signup';
import Intro from './pages/intro/intro';
import MainPage from './pages/main/main';
import ProfileDownloadPage from "./pages/profileDownload/profileDownloadPage";
import MissionPage from './pages/mission/mission';
import AboutPage from './pages/about/aboutPage';
import Scoreboard from './pages/main/scoreboard';
import ProtectedRoute from "./context/ProtectedRoute";

function App() {
    return (
        <AuthProvider> {/* Make sure AuthProvider is wrapping the whole app */}
            <Router>
                <Routes>
                    {/* Protected route */}
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

                    <Route path="/mission" element={
                        <ProtectedRoute>
                            <MissionPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/profile" element={
                        <ProtectedRoute>
                            <ProfileDownloadPage />
                        </ProtectedRoute>
                    } />

                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;

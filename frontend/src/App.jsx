import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from 'react';

import LoginPages from './pages/auth/login';
import SignupPages from './pages/auth/signup';
import Intro from './pages/intro/intro';
import MainPage from './pages/main/main';
import ProfileDownloadPage from "./pages/profileDownload/profileDownloadPage";
import MissionPage from './pages/mission/mission';
import LoadingPage from './pages/animation/Loading';
import AboutPage from './pages/about/aboutPage';
import Scoreboard from './pages/main/scoreboard';
import ProtectedRoute from "./context/ProtectedRoute"; 

function App() {
    return (
        <Router>
            <Routes>
            <Route path="/" element={
                    <ProtectedRoute>
                        <MainPage />
                    </ProtectedRoute>
                } />                <Route path="/intro" element={<Intro />} />
                <Route path="/login" element={<LoginPages />} />
                <Route path="/signup" element={<SignupPages />} />
                <Route path="/about" element={<AboutPage />} />

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
                <Route path="/scoreboard" element={
                    <ProtectedRoute>
                        <Scoreboard />
                    </ProtectedRoute>
                } />

                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/mission" element={<MissionPage />} />
                <Route path="/loading" element={<LoadingPage />} />
                <Route path="/about" element={<AboutPage />} />  {/* Nouvelle route */}
                {/* Redirect all other paths to the login page */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;

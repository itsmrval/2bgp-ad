import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from 'react';
import LoginPages from './pages/auth/login';
import SignupPages from './pages/auth/signup';
import Intro from './pages/intro/intro';
import MainPage from './pages/main/main';
import TestPage from './pages/main/test';
import ProfileDownloadPage from "./pages/profileDownload/profileDownloadPage";
import MissionPage from './pages/mission/mission';

import Scoreboard from './pages/main/scoreboard';



function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Intro />} />
                <Route path="/login" element={<LoginPages />} />
                <Route path="/scoreboard" element={<Scoreboard />} />
                <Route path="/profiledownload" element={<ProfileDownloadPage />} />
                <Route path="/signup" element={<SignupPages />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/test" element={<TestPage />} />
                <Route path="/mission" element={<MissionPage />} />
                {/* Redirect all other paths to the login page */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
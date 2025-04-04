import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from 'react';
import LoginPages from './pages/auth/login';
import SignupPages from './pages/auth/signup';
import Intro from './pages/intro/intro';
import MainPage from './pages/main/main';
import TestPage from './pages/main/test';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Intro />} />
                <Route path="/login" element={<LoginPages />} />
                <Route path="/signup" element={<SignupPages />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/test" element={<TestPage />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
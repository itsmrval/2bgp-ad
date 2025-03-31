import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from 'react';
import './App.css';
import Login from "./pages/login"; 
import Signup from "./pages/signup"; 
import Intro from './pages/intro';

function App() {
    return (
        <Router>
        <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        </Router>
    );
}

export default App;
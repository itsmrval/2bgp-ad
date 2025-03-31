import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from 'react';
import './App.css';
import Intro from './pages/intro';

function App() {
    return (
        <Router>
        <Routes>
            <Route path="/" element={<Intro />} />
        </Routes>
        </Router>
    );
}

export default App;
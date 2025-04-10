import React from 'react';
import Team from '../../components/team/team.jsx';
import Header from '../../components/header/Header.jsx';
import InProgress from '../../components/animation/inProgress.jsx';
import Footer from '../../components/footer/Footer.jsx';

const AboutPage = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Header area */}
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
                <Header />
            </div>
            
            {/* Main content area */}
            <div style={{ flex: 1 }}>
                <Team />
            </div>
            
        </div>
    );
};

export default AboutPage;

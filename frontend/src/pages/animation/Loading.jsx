import React from 'react';
import InProgress from '../../components/animation/inProgress.jsx';
import Header from '../../components/header/Header.jsx';
import Footer from '../../components/footer/Footer.jsx';

const LoadingPage = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

            {/* Header area */}
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
                <Header />
            </div>

            {/* Main content area */}
            <div style={{ flex: 1 }}>
                <InProgress />
            </div>

            {/* Footer area */}
            <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }}>
                <Footer />
            </div>
        </div>
    );
};

export default LoadingPage;

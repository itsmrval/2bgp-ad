import React from 'react';
import Vms from '../../components/loading/vms.jsx';
import Header from '../../components/header/Header.jsx';

const VmsLoadingPage = () => {
    return (
        <div>
            {/* Header area */}
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
                <Header />
            </div>
            
            {/* Main content area */}
            <div style={{ marginTop: '60px', marginBottom: '0px' }}>
                <Vms />
            </div>
            
        </div>
    );
};

export default VmsLoadingPage;

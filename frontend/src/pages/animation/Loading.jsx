import React from 'react';
import InProgress from '../../components/animation/inProgress.jsx';

const LoadingPage = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            
            
            {/* Main content area */}
            <div style={{ flex: 1 }}>
                <InProgress />  
            </div>
            
        </div>
    );
};

export default LoadingPage;

import React from 'react';
import Mission from '../../components/mission/mission.jsx';
import Header from '../../components/header/Header.jsx';

const MissionPage = () => {
    return (
    <div>
      {/* Header area */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <Header />
      </div>
      {/* Main content area */}
      <Mission/>
    </div>
    );
};

export default MissionPage;
import React from 'react';
import Header from '../../components/header/Header.jsx';
import Main from '../../components/main/main.jsx';

const MainPage = () => {
  return (
    <div>
      {/* Header area */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <Header />
      </div>
      {/* Main content area */}
      <Main />
    </div>
  );
};

export default MainPage;
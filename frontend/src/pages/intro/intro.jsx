import React from 'react';
import { useNavigate } from 'react-router-dom';
import Intro from '../../components/intro/Intro.jsx';

const Intro_page = () => {
  const handleIntroComplete = () => {
  };
return (
    <div>
      <Intro onComplete={handleIntroComplete} />
    </div>
  );
};

export default Intro_page;




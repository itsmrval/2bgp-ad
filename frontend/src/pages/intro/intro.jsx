import React from 'react';
import { useNavigate } from 'react-router-dom';
import Intro from '../../components/intro/Intro.jsx';

const intro = () => {
  const handleIntroComplete = () => {
  };
return (
    <div>
      <Intro onComplete={handleIntroComplete} />
    </div>
  );
};

export default intro;




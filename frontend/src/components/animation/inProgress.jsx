import React from 'react';
import Lottie from 'react-lottie';
import engrenage from '../../assets/lottie/engranage.json';

const InProgress = ({ 
  width =400, 
  height = 400, 
  loop = true, 
  autoplay = true,
  speed = 1,
  className = ''
}) => {
  const defaultOptions = {
    loop: loop,
    autoplay: autoplay,
    animationData: engrenage,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className={`in-progress-animation ${className}`} style={{ width, height }}>
      <Lottie 
        options={defaultOptions}
        height={height}
        width={width}
        speed={speed}
      />
    </div>
  );
};

export default InProgress;


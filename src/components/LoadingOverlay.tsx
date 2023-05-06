import React from 'react';
import LoadingIcon from './NoRampButton/LoadingIcon';

const LoadingOverlay = () => {
  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full">
      <div className="absolute w-full h-full bg-black opacity-25"></div>
      <div className="z-10 text-4xl font-bold text-center text-white">
        <LoadingIcon />
      </div>
    </div>
  );
};

export default LoadingOverlay;

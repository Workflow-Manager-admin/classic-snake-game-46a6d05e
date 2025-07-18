import React from 'react';

const GameControls = ({ isPlaying, onStart, onPause, onReset }) => {
  return (
    <div className="controls">
      <button 
        className={`btn start`}
        onClick={isPlaying ? onPause : onStart}
      >
        {isPlaying ? 'Pause' : 'Start'}
      </button>
      <button 
        className="btn reset"
        onClick={onReset}
      >
        Reset
      </button>
    </div>
  );
};

export default GameControls;

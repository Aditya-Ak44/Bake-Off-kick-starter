import React from 'react';
import { useGame } from '../context/GameContext';
import { Flame } from 'lucide-react';

const OvenTimer = () => {
  const { timer, initialTime } = useGame();
  
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progress = ((initialTime - timer) / initialTime) * 100;
  
  // Color shifts from Green -> Orange -> Red as time runs out
  const getColor = () => {
    if (progress < 50) return 'var(--color-sage-green)';
    if (progress < 80) return 'var(--color-golden-crust)';
    return 'var(--color-burnt-orange)';
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--color-dough)', padding: '0.5rem 1rem', borderRadius: '20px' }}>
      <Flame className="animate-wobble" color={getColor()} />
      <div style={{ fontWeight: 'bold', fontFamily: 'var(--font-family-display)', fontSize: '1.2rem', minWidth: '60px' }}>
        {formatTime(timer)}
      </div>
      <div style={{ width: '100px', height: '8px', background: 'rgba(0,0,0,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ 
          width: `${100 - progress}%`, 
          height: '100%', 
          background: getColor(),
          transition: 'width 1s linear, background-color 1s ease'
        }} />
      </div>
    </div>
  );
};

export default OvenTimer;

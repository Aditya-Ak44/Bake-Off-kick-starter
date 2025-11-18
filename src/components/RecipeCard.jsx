import React from 'react';
import { ChefHat, Flame } from 'lucide-react';

const RecipeCard = ({ idea, onSelect, isSelected }) => {
  return (
    <div 
      className={`card animate-wobble ${isSelected ? 'selected' : ''}`} 
      style={{ 
        border: isSelected ? '2px solid var(--color-burnt-orange)' : '1px solid transparent',
        cursor: onSelect ? 'pointer' : 'default',
        transition: 'all 0.3s ease'
      }}
      onClick={() => onSelect && onSelect(idea)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
        <ChefHat color="var(--color-text-light)" />
        <span style={{ 
          background: 'var(--color-dough)', 
          padding: '4px 8px', 
          borderRadius: '12px', 
          fontSize: '0.8rem', 
          fontWeight: '600',
          color: 'var(--color-chocolate-dark)'
        }}>
          {idea.difficulty}
        </span>
      </div>
      <h3 style={{ marginBottom: '0.5rem' }}>{idea.title}</h3>
      <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem' }}>{idea.description}</p>
    </div>
  );
};

export default RecipeCard;

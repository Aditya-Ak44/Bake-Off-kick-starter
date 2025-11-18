import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import RecipeCard from '../components/RecipeCard';
import { Users, CheckCircle } from 'lucide-react';

const ROLES = [
  { 
    title: 'Product Owner', 
    alias: 'The Head Chef', 
    desc: 'Defines the taste. "It needs more salt... I mean features."', 
    icon: '👨‍🍳' 
  },
  { 
    title: 'Scrum Master', 
    alias: 'The Sous Chef', 
    desc: 'Keeps the station clean. "Stop throwing flour at the backend dev!"', 
    icon: '📋' 
  },
  { 
    title: 'Developer', 
    alias: 'The Line Cook', 
    desc: 'Chopping and cooking. "I swear it worked on my local stove."', 
    icon: '🔪' 
  },
  { 
    title: 'Tester', 
    alias: 'The Food Critic', 
    desc: 'Checks for soggy bottoms. "This is raw! RAW!"', 
    icon: '🧐' 
  }
];

const Kitchen = () => {
  const { ideas } = useGame();
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [activeRole, setActiveRole] = useState(null);

  return (
    <div className="container animate-rise">
      <header style={{ marginBottom: '3rem' }}>
        <h1>The Kitchen 🥣</h1>
        <p style={{ color: 'var(--color-text-light)' }}>Pick a recipe and assign your brigade.</p>
      </header>

      {!selectedIdea ? (
        <div>
          <h2 style={{ marginBottom: '1.5rem' }}>Select Your Challenge</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {ideas.map(idea => (
              <RecipeCard 
                key={idea.id} 
                idea={idea} 
                onSelect={setSelectedIdea} 
                isSelected={false} 
              />
            ))}
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem' }}>
          {/* Selected Recipe */}
          <div>
            <div className="card" style={{ border: '2px solid var(--color-burnt-orange)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0 }}>Current Order</h3>
                <button 
                  onClick={() => setSelectedIdea(null)}
                  style={{ background: 'none', textDecoration: 'underline', color: 'var(--color-text-light)', fontSize: '0.9rem' }}
                >
                  Change
                </button>
              </div>
              <h2>{selectedIdea.title}</h2>
              <p style={{ marginTop: '0.5rem' }}>{selectedIdea.description}</p>
              <div style={{ marginTop: '1rem', padding: '0.5rem', background: 'var(--color-dough)', borderRadius: '8px', textAlign: 'center' }}>
                <strong>Difficulty:</strong> {selectedIdea.difficulty}
              </div>
            </div>
          </div>

          {/* Role Assignment */}
          <div>
            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users /> Mise en Place (Roles)
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {ROLES.map((role, idx) => (
                <div 
                  key={idx}
                  className="card animate-wobble"
                  style={{ 
                    cursor: 'pointer',
                    border: activeRole === idx ? '2px solid var(--color-sage-green)' : '1px solid transparent',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => setActiveRole(idx)}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{role.icon}</div>
                  <h3 style={{ fontSize: '1.1rem' }}>{role.title}</h3>
                  <div style={{ fontSize: '0.9rem', color: 'var(--color-burnt-orange)', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {role.alias}
                  </div>
                  {activeRole === idx && (
                    <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--color-text-light)', marginTop: '0.5rem', borderTop: '1px solid #eee', paddingTop: '0.5rem' }}>
                      {role.desc}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Kitchen;

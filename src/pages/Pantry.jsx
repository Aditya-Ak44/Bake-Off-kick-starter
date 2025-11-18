import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import RecipeCard from '../components/RecipeCard';
import { Plus, Play, Square } from 'lucide-react';

const Pantry = () => {
  const { ideas, addIdea, startBaking, stopBaking, gameState, timer } = useGame();
  const [newIdea, setNewIdea] = useState({ title: '', description: '', difficulty: 'Medium' });
  const [bakeTime, setBakeTime] = useState(60); // Default 60 minutes

  const handleAddIdea = (e) => {
    e.preventDefault();
    if (!newIdea.title || !newIdea.description) return;
    addIdea(newIdea);
    setNewIdea({ title: '', description: '', difficulty: 'Medium' });
  };

  return (
    <div className="container animate-rise">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1>The Pantry 👨‍🍳</h1>
          <p style={{ color: 'var(--color-text-light)' }}>Stock the shelves and set the oven.</p>
        </div>
        
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
          {gameState === 'PLANNING' ? (
            <>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Bake Time (mins)</label>
                <input 
                  type="number" 
                  value={bakeTime} 
                  onChange={(e) => setBakeTime(parseInt(e.target.value))}
                  style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ddd', width: '80px' }}
                />
              </div>
              <button 
                className="btn-primary" 
                onClick={() => startBaking(bakeTime)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Play size={16} /> Start Oven
              </button>
            </>
          ) : (
            <button 
              className="btn-primary" 
              onClick={stopBaking}
              style={{ backgroundColor: 'var(--color-berry-red)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Square size={16} /> Stop Oven ({Math.floor(timer / 60)}m left)
            </button>
          )}
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        {/* Add Recipe Form */}
        <div className="card">
          <h3>Add New Recipe</h3>
          <form onSubmit={handleAddIdea} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <input 
              type="text" 
              placeholder="Recipe Name" 
              value={newIdea.title}
              onChange={(e) => setNewIdea({...newIdea, title: e.target.value})}
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
            />
            <textarea 
              placeholder="Description (Make it spicy)" 
              value={newIdea.description}
              onChange={(e) => setNewIdea({...newIdea, description: e.target.value})}
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd', minHeight: '100px' }}
            />
            <select 
              value={newIdea.difficulty}
              onChange={(e) => setNewIdea({...newIdea, difficulty: e.target.value})}
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
            >
              <option>Easy Peasy</option>
              <option>Medium</option>
              <option>Gordon Ramsay Level</option>
            </select>
            <button type="submit" className="btn-primary" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
              <Plus size={18} /> Add to Shelf
            </button>
          </form>
        </div>

        {/* Recipe List */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {ideas.map(idea => (
            <RecipeCard key={idea.id} idea={idea} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pantry;

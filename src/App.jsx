import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ChefHat, Utensils, Timer } from 'lucide-react';
import { GameProvider, useGame } from './context/GameContext';
import Pantry from './pages/Pantry';
import Kitchen from './pages/Kitchen'; // Will create next
import OvenTimer from './components/OvenTimer'; // Will create next

const Home = () => (
  <div className="container animate-rise" style={{ textAlign: 'center', padding: '4rem 0' }}>
    <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>Ready, Set, BAKE! 🧁</h1>
    <p style={{ fontSize: '1.5rem', color: 'var(--color-text-light)', marginBottom: '3rem' }}>
      The ultimate sarcastic hackathon management tool.
    </p>
    <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
      <Link to="/pantry" className="card animate-wobble" style={{ textDecoration: 'none', color: 'inherit', width: '300px' }}>
        <ChefHat size={48} color="var(--color-burnt-orange)" />
        <h2 style={{ margin: '1rem 0' }}>The Pantry</h2>
        <p>For Judges only. Add recipes and set the oven.</p>
      </Link>
      <Link to="/kitchen" className="card animate-wobble" style={{ textDecoration: 'none', color: 'inherit', width: '300px' }}>
        <Utensils size={48} color="var(--color-sage-green)" />
        <h2 style={{ margin: '1rem 0' }}>The Kitchen</h2>
        <p>For Teams. Pick a recipe and start cooking.</p>
      </Link>
    </div>
  </div>
);

import NotificationToast from './components/NotificationToast';

const Layout = ({ children }) => {
  const { gameState, notifications, removeNotification } = useGame();
  
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav style={{ padding: '1rem 2rem', background: 'white', boxShadow: 'var(--shadow-soft)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Timer color="var(--color-burnt-orange)" />
          <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--color-chocolate-dark)' }}>BAKE OFF</span>
        </Link>
        {gameState === 'BAKING' && <OvenTimer />}
      </nav>
      
      <main style={{ flex: 1, padding: '2rem 0', position: 'relative' }}>
        {children}
      </main>

      {/* Notification Container */}
      <div style={{ 
        position: 'fixed', 
        bottom: '2rem', 
        right: '2rem', 
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
      }}>
        {notifications && notifications.map(n => (
          <NotificationToast key={n.id} notification={n} onClose={removeNotification} />
        ))}
      </div>
    </div>
  );
};

function App() {
  return (
    <GameProvider>
      <Router basename="/Bake-Off-kick-starter">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pantry" element={<Pantry />} />
            <Route path="/kitchen" element={<Kitchen />} />
          </Routes>
        </Layout>
      </Router>
    </GameProvider>
  );
}

export default App;

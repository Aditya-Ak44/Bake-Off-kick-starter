import React, { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [ideas, setIdeas] = useState([
    { id: 1, title: "AI-Powered Toaster", description: "It burns your toast, but tells you why.", difficulty: "Hard" },
    { id: 2, title: "Sarcastic Weather App", description: "Forecasts with a side of judgment.", difficulty: "Medium" }
  ]);
  
  const [gameState, setGameState] = useState('PLANNING'); // PLANNING, BAKING, FINISHED
  const [timer, setTimer] = useState(0); // in seconds
  const [initialTime, setInitialTime] = useState(0);

  // Timer Logic
  useEffect(() => {
    let interval;
    if (gameState === 'BAKING' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && gameState === 'BAKING') {
      setGameState('FINISHED');
    }
    return () => clearInterval(interval);
  }, [gameState, timer]);

  const addIdea = (idea) => {
    setIdeas([...ideas, { ...idea, id: Date.now() }]);
  };

  const startBaking = (minutes) => {
    const seconds = minutes * 60;
    setInitialTime(seconds);
    setTimer(seconds);
    setGameState('BAKING');
  };

  const stopBaking = () => {
    setGameState('PLANNING');
    setTimer(0);
  };

  const [notifications, setNotifications] = useState([]);

  const addNotification = (title, message, gif) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, title, message, gif }]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Kitchen Nightmares Logic
  useEffect(() => {
    if (gameState !== 'BAKING') return;
    
    const progress = ((initialTime - timer) / initialTime) * 100;
    
    // Milestones (approximate percentages for demo purposes)
    // Using a ref or checking exact seconds would be better to avoid duplicates, 
    // but for this MVP we'll check if it's within a 1-second window of the milestone.
    
    // Start
    if (timer === initialTime - 1) {
      addNotification("Aprons On!", "Don't burn the water. The clock is ticking.", "🏃💨");
    }
    
    // 25% - Planning Check
    if (Math.floor(progress) === 25 && timer % 5 === 0) { // Simple debounce
       addNotification("Planning Check", "PO, is the menu set? Or are we serving raw chicken?", "🐔❓");
    }
    
    // 50% - Halfway
    if (Math.floor(progress) === 50 && timer % 5 === 0) {
       addNotification("Halfway There", "Scrum Master, whip them into shape! We need features, not flour clouds.", "🌪️☁️");
    }
    
    // 75% - Testing
    if (Math.floor(progress) === 75 && timer % 5 === 0) {
       addNotification("Taste Test", "Tester, find the eggshells! 10 minutes to plating!", "🥚🔍");
    }
    
    // 90% - Panic
    if (Math.floor(progress) === 90 && timer % 5 === 0) {
       addNotification("PANIC STATION", "It's raw! It's dry! Fix it!", "🔥😱");
    }

  }, [timer, gameState, initialTime]);

  return (
    <GameContext.Provider value={{
      ideas,
      addIdea,
      gameState,
      timer,
      initialTime,
      startBaking,
      stopBaking,
      notifications,
      removeNotification
    }}>
      {children}
    </GameContext.Provider>
  );
};

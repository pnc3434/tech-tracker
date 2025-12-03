import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Technologies from './pages/Technologies';
import TechnologyDetail from './pages/TechnologyDetail';
import AddTechnology from './pages/AddTechnology';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  const [technologies, setTechnologies] = useState(() => {
    const saved = localStorage.getItem('techTrackerData');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      { 
        id: 1, 
        title: 'React Components', 
        description: 'Изучение базовых компонентов React и их жизненного цикла', 
        status: 'not-started',
        notes: ''
      },
      { 
        id: 2, 
        title: 'JSX Syntax', 
        description: 'Освоение синтаксиса JSX и его отличий от HTML', 
        status: 'in-progress',
        notes: ''
      },
      { 
        id: 3, 
        title: 'State Management', 
        description: 'Работа с состоянием компонентов через useState', 
        status: 'completed',
        notes: 'Важно помнить про иммутабельность!'
      }
    ];
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('techTrackerLoggedIn') === 'true';
  });
  
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('techTrackerUsername') || '';
  });

  // Сохранение технологий в localStorage
  useEffect(() => {
    localStorage.setItem('techTrackerData', JSON.stringify(technologies));
  }, [technologies]);

  const handleStatusChange = (id, newStatus) => {
    setTechnologies(prevTechnologies =>
      prevTechnologies.map(tech =>
        tech.id === id ? { ...tech, status: newStatus } : tech
      )
    );
  };

  const updateTechnologyNotes = (techId, newNotes) => {
    setTechnologies(prevTechnologies =>
      prevTechnologies.map(tech =>
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    );
  };

  const handleLogin = (user) => {
    localStorage.setItem('techTrackerLoggedIn', 'true');
    localStorage.setItem('techTrackerUsername', user);
    setIsLoggedIn(true);
    setUsername(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('techTrackerLoggedIn');
    localStorage.removeItem('techTrackerUsername');
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <Router>
      <div className="App">
        <Navigation 
          isLoggedIn={isLoggedIn} 
          username={username} 
          onLogout={handleLogout} 
        />
        
        <Routes>
          {/* Публичные маршруты */}
          <Route path="/" element={<Home technologies={technologies} isLoggedIn={isLoggedIn} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          
          {/* Защищенные маршруты */}
          <Route path="/technologies" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Technologies 
                technologies={technologies}
                onStatusChange={handleStatusChange}
              />
            </ProtectedRoute>
          } />
          
          <Route path="/technology/:techId" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <TechnologyDetail />
            </ProtectedRoute>
          } />
          
          <Route path="/add-technology" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AddTechnology technologies={technologies} />
            </ProtectedRoute>
          } />
          
          <Route path="/statistics" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Statistics technologies={technologies} />
            </ProtectedRoute>
          } />
          
          <Route path="/settings" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Settings />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
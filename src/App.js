import React, { useState } from 'react';
import Login from './components/Login';
import Chat from './components/Chat';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <div className="app-container">
      {user ? <Chat user={user} /> : <Login onLogin={handleLogin} />}
    </div>
  );
};

export default App;

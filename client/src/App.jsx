import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import ContactPage from './pages/ContactPage';

function App() {
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUsername = localStorage.getItem('username');
    
    if (savedToken) setToken(savedToken);
    if (savedUsername) setUsername(savedUsername);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LoginPage setToken={setToken} setUsername={setUsername} username={username} />} />
      <Route path="/contact" element={<ContactPage token={token} setToken={setToken} username={username} />} />
    </Routes>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import ContactPage from './pages/ContactPage';

function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('token');
    if (saved) setToken(saved);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LoginPage setToken={setToken} />} />
      <Route path="/contact" element={<ContactPage token={token} setToken={setToken} />} />
    </Routes>
  );
}

export default App;

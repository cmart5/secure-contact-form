import { useState } from 'react';
import ContactForm from './ContactForm';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        setToken(data.token);
        setMessage('Login successful!');
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred');
    }
  };

  const getProtectedMessage = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/messages', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message + ` (user: ${data.user.username})`);
      } else {
        setMessage(data.message || 'Could not fetch message');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      /><br />
      <button onClick={handleLogin}>Login</button>
      <button onClick={getProtectedMessage} disabled={!token}>
        Get Protected Message
      </button>
      <p>{message}</p>
      <ContactForm token={token} />
    </div>
  );
}

export default App;

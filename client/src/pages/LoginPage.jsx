import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        setMessage('Login successful!');
        navigate('/contact');
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch {
      setMessage('Error occurred');
    }
  };

  return (
    <div style={styles.box}>
      <h2>Login</h2>
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
      <p>{message}</p>
    </div>
  );
}

const styles = {
  box: {
    maxWidth: '400px',
    margin: '100px auto',
    padding: '2rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  }
};

export default LoginPage;

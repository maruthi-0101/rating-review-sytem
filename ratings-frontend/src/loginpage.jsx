import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function LoginPage() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg]           = useState('');
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const { data } = await axios.post(
        'http://localhost:4000/login',
        { email, password }
      );
      localStorage.setItem('token', data.token);
      navigate('/');
      setMsg('✅ Logged in!');
    } catch (err) {
      setMsg('❌ ' + (err.response?.data || 'Login failed'));
    }
  };

  return (
    <div style={{ maxWidth: 320, margin: '4rem auto', textAlign: 'center' }}>
      <h2>Login</h2>
      <form onSubmit={login}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: 12 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: 12 }}
        />
        <button style={{ width: '100%' }}>Log In</button>
      </form>
      {msg && <p style={{ marginTop: 16 }}>{msg}</p>}

      <button
        onClick={() => navigate('/signup')}
        style={{ marginTop: 12, background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}
      >
        Don't have an account? Sign Up
      </button>
    </div>
  );
}
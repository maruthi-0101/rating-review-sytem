import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function SignUpPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg]           = useState('');
  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      await axios.post('http://localhost:4000/signup', {
        username,
        email,
        password,
      });
      setMsg('Account created. Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setMsg(err.response?.data || 'Signup failed');
    }
  };

  return (
    <div style={{ maxWidth: 320, margin: '4rem auto', textAlign: 'center' }}>
      <h2>Sign Up</h2>
      <form onSubmit={signup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: 12 }}
        />
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
        <button style={{ width: '100%' }}>Sign Up</button>
      </form>
      {msg && <p style={{ marginTop: 16 }}>{msg}</p>}

      <button
        onClick={() => navigate('/login')}
        style={{ marginTop: 12, background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}
      >
        Already have an account? Log In
      </button>
    </div>
  );
}
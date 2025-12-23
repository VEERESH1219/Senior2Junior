import { useState } from 'react';

const pageStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background:
    'linear-gradient(135deg, #0f766e 0%, #2563eb 40%, #7c3aed 100%)',
  padding: '20px'
};

const cardStyle = {
  width: '100%',
  maxWidth: '460px',
  background: 'rgba(255,255,255,0.92)',
  borderRadius: '16px',
  boxShadow: '0 20px 40px rgba(15,23,42,0.4)',
  padding: '32px 28px',
  backdropFilter: 'blur(12px)'
};

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: '8px',
  border: '1px solid #d4d4d8',
  fontSize: '14px',
  outline: 'none'
};

const labelStyle = {
  fontSize: '13px',
  fontWeight: 600,
  color: '#4b5563',
  marginBottom: '4px',
  display: 'block'
};

const buttonStyle = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '999px',
  border: 'none',
  background:
    'linear-gradient(135deg, #22c55e 0%, #22c55e 30%, #3b82f6 100%)',
  color: '#fff',
  fontWeight: 600,
  cursor: 'pointer',
  marginTop: '8px'
};

export default function RegisterPage({ onLogin }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg('Creating your account...');

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) {
        setMsg(data.message || 'Signup failed');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setMsg('Account created! You are logged in.');
      onLogin(data.user);
    } catch {
      setMsg('Server error, try again.');
    }
  }

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: 6, color: '#111827' }}>
          Create your student account ✨
        </h2>
        <p style={{ marginBottom: 20, fontSize: 13, color: '#6b7280' }}>
          One account to sell, rent and buy academic items.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Full name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="John Doe"
            />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="you@example.com"
            />
          </div>

          <div style={{ marginBottom: 6 }}>
            <label style={labelStyle}>Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="Create a strong password"
            />
          </div>

          <button type="submit" style={buttonStyle}>
            Sign up
          </button>

          {msg && (
            <p style={{ marginTop: 10, fontSize: 13, color: '#4b5563' }}>
              {msg}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

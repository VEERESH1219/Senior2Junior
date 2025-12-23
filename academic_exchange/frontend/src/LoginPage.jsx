import { useState } from 'react';

const pageStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background:
    'linear-gradient(135deg, #1e3a8a 0%, #9333ea 50%, #f97316 100%)',
  padding: '20px'
};

const cardStyle = {
  width: '100%',
  maxWidth: '420px',
  background: 'rgba(255,255,255,0.9)',
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
    'linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #ec4899 100%)',
  color: '#fff',
  fontWeight: 600,
  cursor: 'pointer',
  marginTop: '8px'
};

export default function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [role, setRole] = useState('student'); // 'admin' or 'student'
  const [msg, setMsg] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // only this email can try admin
    if (role === 'admin' && form.email !== 'vamsikrishnapallam@gmail.com') {
      setMsg('Only Vamsi can login as admin.');
      return;
    }

    setMsg('Logging in...');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      }); // POST login from React to Express. [web:259][web:223]

      const data = await res.json();
      if (!res.ok) {
        setMsg(data.message || 'Invalid email or password');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setMsg('Logged in!');
      onLogin(data.user);
    } catch {
      setMsg('Server error, try again.');
    }
  }

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: 6, color: '#111827' }}>Welcome back 👋</h2>
        <p style={{ marginBottom: 20, fontSize: 13, color: '#6b7280' }}>
          Login to sell or rent your books and instruments.
        </p>

        <form onSubmit={handleSubmit}>
          {/* role select */}
          <div style={{ marginBottom: 14, fontSize: 13, color: '#4b5563' }}>
            <span style={{ fontWeight: 600, marginRight: 8 }}>Login as:</span>
            <label style={{ marginRight: 10 }}>
              <input
                type="radio"
                name="role"
                value="student"
                checked={role === 'student'}
                onChange={() => setRole('student')}
              />{' '}
              Student
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={role === 'admin'}
                onChange={() => setRole('admin')}
              />{' '}
              Admin
            </label>
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
              placeholder="••••••••"
            />
          </div>

          <button type="submit" style={buttonStyle}>
            Login
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

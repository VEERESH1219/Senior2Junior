import BookDetails from './BookDetails.jsx';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from './HomePage.jsx';
import Dashboard from './Dashboard.jsx';
import AdminPanel from './AdminPanel.jsx';
import AddListing from './AddListing.jsx';
import LoginPage from './LoginPage.jsx';
import RegisterPage from './RegisterPage.jsx';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }

  return (
    <BrowserRouter>
      <div style={{ padding: 30, fontFamily: 'Arial' }}>
        <h1 style={{ color: '#2563eb', textAlign: 'center' }}>
          🎓 Academic Exchange – Books & Stationery
        </h1>

        <nav
          style={{
            marginBottom: 20,
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 15
          }}
        >
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>

          {user && user.isAdmin && <Link to="/admin">Admin</Link>}

          <Link to="/add">Add Listing</Link>

          {user ? (
            <>
              <span>Hi, {user.name}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Sign up</Link>
            </>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/admin"
            element={user && user.isAdmin ? <AdminPanel /> : <HomePage />}
          />
          <Route
            path="/add"
            element={
              user ? <AddListing /> : <LoginPage onLogin={setUser} />
            }
          />
          <Route path="/login" element={<LoginPage onLogin={setUser} />} />
          <Route path="/register" element={<RegisterPage onLogin={setUser} />} />

          {/* DYNAMIC DETAILS PAGE */}
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

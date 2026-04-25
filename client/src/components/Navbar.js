 
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>📋 Project Manager</div>
      {user && (
        <div style={styles.links}>
          <Link to="/dashboard" style={styles.link}>Dashboard</Link>
          <Link to="/projects" style={styles.link}>Projects</Link>
          <Link to="/tasks" style={styles.link}>Tasks</Link>
          <span style={styles.user}>👤 {user.name}</span>
          <button onClick={handleLogout} style={styles.btn}>Logout</button>
        </div>
      )}
    </nav>
  );
};

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#2c3e50', padding: '12px 24px' },
  brand: { color: '#fff', fontSize: '20px', fontWeight: 'bold' },
  links: { display: 'flex', alignItems: 'center', gap: '20px' },
  link: { color: '#ecf0f1', textDecoration: 'none', fontSize: '15px' },
  user: { color: '#3498db', fontSize: '15px' },
  btn: { backgroundColor: '#e74c3c', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer' }
};

export default Navbar;
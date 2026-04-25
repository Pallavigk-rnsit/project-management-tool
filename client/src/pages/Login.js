 
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      login(res.data.token, res.data.user);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back 👋</h2>
        <p style={styles.sub}>Login to Project Manager</p>
        <input style={styles.input} type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input style={styles.input} type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button style={styles.btn} onClick={handleSubmit}>Login</button>
        <p style={styles.text}>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' },
  card: { backgroundColor: '#fff', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: '360px', display: 'flex', flexDirection: 'column', gap: '14px' },
  title: { margin: 0, fontSize: '24px', color: '#2c3e50' },
  sub: { margin: 0, color: '#888' },
  input: { padding: '12px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px' },
  btn: { padding: '12px', backgroundColor: '#2c3e50', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '16px', cursor: 'pointer' },
  text: { textAlign: 'center', fontSize: '14px' }
};

export default Login;
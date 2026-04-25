 
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'member' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      login(res.data.token, { name: formData.name, email: formData.email, role: formData.role });
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account 🚀</h2>
        <p style={styles.sub}>Join Project Manager</p>
        <input style={styles.input} type="text" name="name" placeholder="Full Name" onChange={handleChange} />
        <input style={styles.input} type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input style={styles.input} type="password" name="password" placeholder="Password" onChange={handleChange} />
        <select style={styles.input} name="role" onChange={handleChange}>
          <option value="member">Member</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
        <button style={styles.btn} onClick={handleSubmit}>Register</button>
        <p style={styles.text}>Already have an account? <Link to="/login">Login</Link></p>
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

export default Register;
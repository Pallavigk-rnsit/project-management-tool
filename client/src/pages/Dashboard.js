 import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, taskRes] = await Promise.all([
          axios.get('http://localhost:5000/api/projects'),
          axios.get('http://localhost:5000/api/tasks')
        ]);
        setProjects(projRes.data);
        setTasks(taskRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const todo = tasks.filter(t => t.status === 'todo').length;
  const inprogress = tasks.filter(t => t.status === 'inprogress').length;
  const done = tasks.filter(t => t.status === 'done').length;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Welcome, {user?.name} 👋</h2>
      <div style={styles.cards}>
        <div style={{ ...styles.card, backgroundColor: '#3498db' }}>
          <h3>Total Projects</h3>
          <p style={styles.num}>{projects.length}</p>
        </div>
        <div style={{ ...styles.card, backgroundColor: '#e67e22' }}>
          <h3>To-Do Tasks</h3>
          <p style={styles.num}>{todo}</p>
        </div>
        <div style={{ ...styles.card, backgroundColor: '#9b59b6' }}>
          <h3>In Progress</h3>
          <p style={styles.num}>{inprogress}</p>
        </div>
        <div style={{ ...styles.card, backgroundColor: '#27ae60' }}>
          <h3>Completed</h3>
          <p style={styles.num}>{done}</p>
        </div>
      </div>

      <h3 style={styles.subheading}>Recent Projects</h3>
      <div style={styles.list}>
        {projects.slice(0, 5).map(p => (
          <div key={p._id} style={styles.item}>
            <span>📁 {p.title}</span>
            <span style={styles.desc}>{p.description}</span>
          </div>
        ))}
        {projects.length === 0 && <p style={styles.empty}>No projects yet. Create one!</p>}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '30px', backgroundColor: '#f0f2f5', minHeight: '100vh' },
  heading: { fontSize: '26px', color: '#2c3e50', marginBottom: '24px' },
  subheading: { fontSize: '20px', color: '#2c3e50', margin: '30px 0 16px' },
  cards: { display: 'flex', gap: '20px', flexWrap: 'wrap' },
  card: { color: '#fff', padding: '24px', borderRadius: '10px', width: '200px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
  num: { fontSize: '42px', fontWeight: 'bold', margin: '8px 0 0' },
  list: { display: 'flex', flexDirection: 'column', gap: '12px' },
  item: { backgroundColor: '#fff', padding: '16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' },
  desc: { color: '#888', fontSize: '14px' },
  empty: { color: '#888' }
};

export default Dashboard;

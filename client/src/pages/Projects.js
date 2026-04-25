 import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/projects');
      setProjects(res.data);
    } catch (err) { toast.error('Failed to fetch projects'); }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/projects', formData);
      toast.success('Project created!');
      setFormData({ title: '', description: '' });
      setShowForm(false);
      fetchProjects();
    } catch (err) { toast.error('Failed to create project'); }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`);
      toast.success('Project deleted!');
      fetchProjects();
    } catch (err) { toast.error('Failed to delete project'); }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.heading}>Projects</h2>
        <button style={styles.btn} onClick={() => setShowForm(!showForm)}>+ New Project</button>
      </div>

      {showForm && (
        <div style={styles.form}>
          <input style={styles.input} name="title" placeholder="Project Title" value={formData.title} onChange={handleChange} />
          <input style={styles.input} name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
          <button style={styles.btn} onClick={handleSubmit}>Create</button>
        </div>
      )}

      <div style={styles.list}>
        {projects.map(p => (
          <div key={p._id} style={styles.card}>
            <div>
              <h3 style={styles.title}>📁 {p.title}</h3>
              <p style={styles.desc}>{p.description}</p>
              <p style={styles.meta}>Created by: {p.createdBy?.name}</p>
            </div>
            <button style={styles.delBtn} onClick={() => handleDelete(p._id)}>🗑 Delete</button>
          </div>
        ))}
        {projects.length === 0 && <p style={styles.empty}>No projects yet. Create one!</p>}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '30px', backgroundColor: '#f0f2f5', minHeight: '100vh' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
  heading: { fontSize: '26px', color: '#2c3e50', margin: 0 },
  form: { backgroundColor: '#fff', padding: '20px', borderRadius: '10px', display: 'flex', gap: '12px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' },
  input: { padding: '10px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px', flex: 1 },
  btn: { padding: '10px 20px', backgroundColor: '#2c3e50', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' },
  list: { display: 'flex', flexDirection: 'column', gap: '14px' },
  card: { backgroundColor: '#fff', padding: '20px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' },
  title: { margin: '0 0 6px', color: '#2c3e50' },
  desc: { margin: '0 0 6px', color: '#666', fontSize: '14px' },
  meta: { margin: 0, color: '#999', fontSize: '13px' },
  delBtn: { padding: '8px 14px', backgroundColor: '#e74c3c', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  empty: { color: '#888' }
};

export default Projects;

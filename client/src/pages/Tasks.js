 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', status: 'todo', priority: 'medium', deadline: '', project: '' });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { fetchTasks(); fetchProjects(); }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks');
      setTasks(res.data);
    } catch (err) { toast.error('Failed to fetch tasks'); }
  };

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/projects');
      setProjects(res.data);
    } catch (err) { toast.error('Failed to fetch projects'); }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!formData.project) return toast.error('Please select a project');
    try {
      await axios.post('http://localhost:5000/api/tasks', formData);
      toast.success('Task created!');
      setFormData({ title: '', description: '', status: 'todo', priority: 'medium', deadline: '', project: '' });
      setShowForm(false);
      fetchTasks();
    } catch (err) { toast.error('Failed to create task'); }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, { status });
      fetchTasks();
    } catch (err) { toast.error('Failed to update task'); }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      toast.success('Task deleted!');
      fetchTasks();
    } catch (err) { toast.error('Failed to delete task'); }
  };

  const statusColor = { todo: '#e67e22', inprogress: '#3498db', done: '#27ae60' };
  const priorityColor = { low: '#27ae60', medium: '#f39c12', high: '#e74c3c' };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.heading}>Tasks</h2>
        <button style={styles.btn} onClick={() => setShowForm(!showForm)}>+ New Task</button>
      </div>

      {showForm && (
        <div style={styles.form}>
          <input style={styles.input} name="title" placeholder="Task Title" value={formData.title} onChange={handleChange} />
          <input style={styles.input} name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
          <select style={styles.input} name="project" value={formData.project} onChange={handleChange}>
            <option value="">Select Project</option>
            {projects.map(p => <option key={p._id} value={p._id}>{p.title}</option>)}
          </select>
          <select style={styles.input} name="status" value={formData.status} onChange={handleChange}>
            <option value="todo">To-Do</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <select style={styles.input} name="priority" value={formData.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input style={styles.input} name="deadline" type="date" value={formData.deadline} onChange={handleChange} />
          <button style={styles.btn} onClick={handleSubmit}>Create</button>
        </div>
      )}

      <div style={styles.list}>
        {tasks.map(t => (
          <div key={t._id} style={styles.card}>
            <div>
              <h3 style={styles.title}>✅ {t.title}</h3>
              <p style={styles.desc}>{t.description}</p>
              <p style={styles.meta}>Project: {t.project?.title} | Deadline: {t.deadline ? new Date(t.deadline).toLocaleDateString() : 'N/A'}</p>
              <div style={styles.badges}>
                <span style={{ ...styles.badge, backgroundColor: statusColor[t.status] }}>{t.status}</span>
                <span style={{ ...styles.badge, backgroundColor: priorityColor[t.priority] }}>{t.priority}</span>
              </div>
            </div>
            <div style={styles.actions}>
              <select style={styles.select} value={t.status} onChange={(e) => handleStatusChange(t._id, e.target.value)}>
                <option value="todo">To-Do</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
              </select>
              <button style={styles.delBtn} onClick={() => handleDelete(t._id)}>🗑</button>
            </div>
          </div>
        ))}
        {tasks.length === 0 && <p style={styles.empty}>No tasks yet. Create one!</p>}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '30px', backgroundColor: '#f0f2f5', minHeight: '100vh' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
  heading: { fontSize: '26px', color: '#2c3e50', margin: 0 },
  form: { backgroundColor: '#fff', padding: '20px', borderRadius: '10px', display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' },
  input: { padding: '10px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px', flex: 1, minWidth: '150px' },
  btn: { padding: '10px 20px', backgroundColor: '#2c3e50', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' },
  list: { display: 'flex', flexDirection: 'column', gap: '14px' },
  card: { backgroundColor: '#fff', padding: '20px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' },
  title: { margin: '0 0 6px', color: '#2c3e50' },
  desc: { margin: '0 0 6px', color: '#666', fontSize: '14px' },
  meta: { margin: '0 0 8px', color: '#999', fontSize: '13px' },
  badges: { display: 'flex', gap: '8px' },
  badge: { color: '#fff', padding: '4px 10px', borderRadius: '12px', fontSize: '12px' },
  actions: { display: 'flex', gap: '10px', alignItems: 'center' },
  select: { padding: '8px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '13px' },
  delBtn: { padding: '8px 12px', backgroundColor: '#e74c3c', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  empty: { color: '#888' }
};

export default Tasks;
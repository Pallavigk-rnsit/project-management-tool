 
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');

// Get all tasks
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find().populate('project', 'title').populate('assignedTo', 'name email').populate('createdBy', 'name email');
    res.json(tasks);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get tasks by project
router.get('/project/:projectId', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId }).populate('assignedTo', 'name email');
    res.json(tasks);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Create task
router.post('/', auth, async (req, res) => {
  const { title, description, status, priority, deadline, project, assignedTo } = req.body;
  try {
    const task = new Task({ title, description, status, priority, deadline, project, assignedTo, createdBy: req.user.id });
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Update task
router.put('/:id', auth, async (req, res) => {
  const { title, description, status, priority, deadline, assignedTo } = req.body;
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    task = await Task.findByIdAndUpdate(req.params.id, { title, description, status, priority, deadline, assignedTo }, { new: true });
    res.json(task);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Task removed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
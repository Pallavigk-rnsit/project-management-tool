 
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Project = require('../models/Project');

// Get all projects
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find().populate('createdBy', 'name email').populate('members', 'name email');
    res.json(projects);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Create project
router.post('/', auth, async (req, res) => {
  const { title, description, members } = req.body;
  try {
    const project = new Project({ title, description, members, createdBy: req.user.id });
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Update project
router.put('/:id', auth, async (req, res) => {
  const { title, description, members } = req.body;
  try {
    let project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });
    project = await Project.findByIdAndUpdate(req.params.id, { title, description, members }, { new: true });
    res.json(project);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Delete project
router.delete('/:id', auth, async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });
    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Project removed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
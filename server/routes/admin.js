const express = require('express');
const router = express.Router();
require('dotenv').config();
const Task = require('../models/task');
const Theme = require('../models/theme');

router.post('/add-task', async (req, res) => {
    try {
      const taskData = req.body;
      const task = new Task(taskData);
  
      const savedTask = await task.save();
  
      res.status(201).json(savedTask);
    } catch (error) {
      console.error('Error saving task:', error);
      res.status(500).json({ error: 'Failed to save task' });
    }
  });

router.post('/add-theme', async (req, res) => {
    try {
      const themeData = req.body;
      const theme = new Theme(themeData);
  
      const savedTheme = await theme.save();
  
      res.status(201).json(savedTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
      res.status(500).json({ error: 'Failed to save theme' });
    }
  });


module.exports = router;
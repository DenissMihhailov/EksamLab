const express = require('express');
const router = express.Router();
require('dotenv').config();
const Task = require('../models/task');
const Theme = require('../models/theme');

router.post('/get-themes', async (req, res) => {
    const { subjectTitle } = req.body;

    try {
        const themes = await Theme.find({ subject: subjectTitle });
        res.json(themes);
    } catch (error) {
        console.error('Error fetching themes:', error);
        res.status(500).json({ message: 'An error occurred while fetching themes' });
    }
  });

  router.post('/get-tasks-years', async (req, res) => {
    const { subjectTitle, themeTitle } = req.body;

    try {
        if (themeTitle === 'Полные экзамены') {
            var tasks = await Task.find({ subject: subjectTitle});
        }else{
            tasks = await Task.find({ subject: subjectTitle, theme: themeTitle });
        }
      const years = tasks.map(task => task.year);
      const uniqueYears = [...new Set(years)];
      const sortedUniqueYears = uniqueYears.sort((a, b) => a - b);
      res.json(sortedUniqueYears);
    } catch (error) {
      console.error('Error fetching themes:', error);
      res.status(500).json({ message: 'An error occurred while fetching themes' });
    }
  });

  router.post('/get-tasks', async (req, res) => {
    const { subjectTitle, themeTitle, taskYear } = req.body;

    try {
        if (themeTitle === 'Полные экзамены') {
            var tasks = await Task.find({ subject: subjectTitle, year: taskYear});
        }else{
            tasks = await Task.find({ subject: subjectTitle, theme: themeTitle, year: taskYear });
        }
      res.json(tasks);
    } catch (error) {
      console.error('Error fetching themes:', error);
      res.status(500).json({ message: 'An error occurred while fetching themes' });
    }
  });

module.exports = router;
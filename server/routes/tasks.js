const express = require('express');
const router = express.Router();
require('dotenv').config();
const Task = require('../models/task');
const Theme = require('../models/theme');
const User = require('../models/user');

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

  router.post('/get-tasks-years-with-progress', async (req, res) => {
    const { subjectTitle, themeTitle, email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let tasks;
        if (themeTitle === 'Полные экзамены') {
            tasks = await Task.find({ subject: subjectTitle });
        } else {
            tasks = await Task.find({ subject: subjectTitle, theme: themeTitle });
        }

        const years = tasks.map(task => task.year);
        const uniqueYears = [...new Set(years)];
        const sortedUniqueYears = uniqueYears.sort((a, b) => a - b);

        const tasksYearsWithProgress = sortedUniqueYears.map(year => {
            const userTasksForYear = user.tasks.filter(taskId => tasks.some(task => task._id.toString() === taskId.toString() && task.year === year));
            const totalTasksForYear = tasks.filter(task => task.year === year).length;
            const progressPercentage = totalTasksForYear > 0 ? Math.round((userTasksForYear.length / totalTasksForYear) * 100) : 0;
            return { year, procent: `${progressPercentage}%` };
        });

        const totalTasksForTheme = tasks.length;
        const userTasksForTheme = user.tasks.filter(taskId => tasks.some(task => task._id.toString() === taskId.toString())).length;
        const themePercentage = totalTasksForTheme > 0 ? Math.round((userTasksForTheme / totalTasksForTheme) * 100) : 0;
        const themeStatistic = { procent: `${themePercentage}%` };

        const theme = await Theme.findOne({ title: themeTitle })

        const link = theme ? theme.link : ''

        res.json({ tasksYearsWithProgress, themeStatistic, link });
    } catch (error) {
        console.error('Error fetching themes with progress:', error);
        res.status(500).json({ message: 'An error occurred while fetching themes with progress' });
    }
});

router.post('/get-themes-progress', async (req, res) => {
  const { subjectTitle, email } = req.body;

  try {
    const themes = await Theme.find({ subject: subjectTitle });

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const themeProgress = [];

    let totalTasks = 0;
    let userTotalTasks = 0;

    for (const theme of themes) {
      const tasks = await Task.find({ theme: theme.title });
      const userTasks = user.tasks.filter(taskId => tasks.some(task => task._id.toString() === taskId.toString()));

      const progressPercentage = tasks.length > 0 ? Math.round((userTasks.length / tasks.length) * 100) : 0;

      themeProgress.push({
        title: theme.title,
        procent: `${progressPercentage}%`
      });

      totalTasks += tasks.length;
      userTotalTasks += userTasks.length;
    }

    const overallProgressPercentage = totalTasks > 0 ? Math.round((userTotalTasks / totalTasks) * 100) : 0;

    themeProgress.unshift({
      title: 'Общий прогресс по предмету',
      procent: `${overallProgressPercentage}%`
    });

    res.json({ themesStatistic: themeProgress });
  } catch (error) {
    console.error('Error fetching themes progress:', error);
    res.status(500).json({ message: 'An error occurred while fetching themes progress' });
  }
});

  router.post('/get-tasks', async (req, res) => {
    const { subjectTitle, themeTitle, taskYear, email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let tasks;
        if (themeTitle === 'Полные экзамены') {
            tasks = await Task.find({ subject: subjectTitle, year: taskYear });
        } else {
            tasks = await Task.find({ subject: subjectTitle, theme: themeTitle, year: taskYear });
        }
        const tasksWithStatus = tasks.map(task => {
            const isDone = user.tasks.includes(task._id);
            return { ...task.toObject(), isDone };
        });

        res.json(tasksWithStatus);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'An error occurred while fetching tasks' });
    }
});
  
  router.post('/set-task-done', async (req, res) => {
    const { email, currentTaskId } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
  
      if (user.tasks.includes(currentTaskId)) {
        return res.status(200).json({ message: 'Task already saved' });
      }
  
      user.tasks.push(currentTaskId);
  
      await user.save();
  
      return res.status(200).json({ message: 'Task saved' });
    } catch (error) {
      console.error('Error task saving:', error);
      return res.status(500).json({ message: 'Enternal server error' });
    }
  });

module.exports = router;
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
    const { subjectTitle, themeTitle, taskYear, email } = req.body;

    try {
        // Найти пользователя по его email
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

        // Создать новый массив с заданиями и их статусом isDone
        const tasksWithStatus = tasks.map(task => {
            const isDone = user.tasks.includes(task._id); // Проверяем, выполнено ли задание пользователем
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
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  theme: String,
  subject: String,
  type: String,
  grade: String,
  year: String,
  partOfExam: String,
  orderInExam: String,
  pointsInExam: String,
  text: String,
  answers: {
      type: [{
          answerText: String,
          answer: [String]
      }],
      _id: false
  }
}, { versionKey: false });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
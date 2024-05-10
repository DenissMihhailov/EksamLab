const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,

    },
    subject: {
      type: String,
      required: true
    }
  }, { versionKey: false });

const Theme = mongoose.model('Theme', themeSchema);

module.exports = Theme;
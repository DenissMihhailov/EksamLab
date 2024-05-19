const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,

    },
    subject: {
      type: String,
      required: true
    },
    link:{
      type: String,
    }
  }, { versionKey: false });

const Theme = mongoose.model('Theme', themeSchema);

module.exports = Theme;
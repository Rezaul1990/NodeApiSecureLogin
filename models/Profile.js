const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  username: { type: String, unique: true },
  name: String,
  bio: String,
  avatar: String,
  facebook: String,
  github: String,
  template: { type: String, default: 'template1' },
});

module.exports = mongoose.model('Profile', profileSchema);

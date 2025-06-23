const Profile = require('../models/Profile');

exports.createProfile = async (req, res) => {
  const { username, name, bio, avatar, facebook, github, template } = req.body;
  const userId = req.user.userId;

  try {
    const existing = await Profile.findOne({ username });
    if (existing) return res.status(400).json({ error: 'Username already taken' });

    const profile = new Profile({
      userId, username, name, bio, avatar, facebook, github, template,
    });

    await profile.save();
    res.json({ message: 'Profile created', profile });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getProfileByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const profile = await Profile.findOne({ username });
    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    res.json(profile);
  } catch {
    res.status(500).json({ error: 'Error loading profile' });
  }
};

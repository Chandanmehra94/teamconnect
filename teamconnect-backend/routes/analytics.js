const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const totalPosts = await Post.countDocuments();
    const totalLikes = await Post.aggregate([{ $group: { _id: null, likes: { $sum: { $size: '$likes' } } } }]);
    const totalComments = await Post.aggregate([{ $group: { _id: null, comments: { $sum: { $size: '$comments' } } } }]);
    const postsByDepartment = await Post.aggregate([
      { $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'user' } },
      { $group: { _id: '$user.department', count: { $sum: 1 } } },
    ]);

    res.json({
      totalPosts,
      totalLikes: totalLikes[0]?.likes || 0,
      totalComments: totalComments[0]?.comments || 0,
      postsByDepartment,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// Create post
router.post('/', auth, async (req, res) => {
  const { content, image } = req.body;
  try {
    // Basic sentiment analysis (keyword-based)
    const sentiment = content.includes('good') ? 'Positive' : content.includes('bad') ? 'Negative' : 'Neutral';
    const post = new Post({ user: req.user.id, content, image, sentiment });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all posts
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'email department').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Like post
router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.likes.includes(req.user.id)) {
      post.likes = post.likes.filter(id => id.toString() !== req.user.id);
    } else {
      post.likes.push(req.user.id);
    }
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Comment on post
router.post('/:id/comment', auth, async (req, res) => {
  const { content } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const comment = { user: req.user.id, content };
    post.comments.push(comment);
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// MongoDB Connection
mongoose.connect('mongodb://chandan:SimSimJi@cluster0-shard-00-00.jyf9u.mongodb.net:27017,cluster0-shard-00-01.jyf9u.mongodb.net:27017,cluster0-shard-00-02.jyf9u.mongodb.net:27017/?replicaSet=atlas-jfiu0g-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const analyticsRoutes = require('./routes/analytics');

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/analytics', analyticsRoutes);

// Serve uploaded images
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => res.send('TeamConnect Backend'));

app.listen(5000, () => console.log('Server running on port 5000'));
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer  = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (_, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Upload file
router.post('/upload', auth, upload.single('file'), (req, res) => {
  res.json({ filename: req.file.filename, url: `/files/${req.file.filename}` });
});

// List files
router.get('/files', auth, (req, res) => {
  const files = fs.readdirSync('uploads').map(name => ({
    name,
    url: `/files/${name}`
  }));
  res.json(files);
});

// Download
router.get('/files/:name', auth, (req, res) => {
  const file = path.join(__dirname, '../uploads', req.params.name);
  res.download(file);
});

// Delete
router.delete('/files/:name', auth, (req, res) => {
  fs.unlinkSync(path.join('uploads', req.params.name));
  res.json({ msg: 'File deleted' });
});

module.exports = router;

const { textToSpeech } = require('./server/tts.js');
const express = require('express');

const app = express();
const port = process.env.PORT || 3008;
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const SRC = path.join(__dirname, 'src');

// GET endpoint to fetch tag descriptions
app.get('/', (req, res) => {
  res.sendFile(path.join(SRC, 'index.html'));
});

// serve everything in src
app.use(express.static(SRC));

// POST /api/dialogue
// should take a text to speak and return the audio file
app.post('/api/dialogue', express.json(), (req, res) => {
  const dialogue = req.body;
  const text = dialogue.text;
  console.log("text", text)
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  textToSpeech(DATA_DIR, text).then(file => {
    res.sendFile(file);
  });
});

app.listen(port, () => {
  console.log(`Running at: http://localhost:${port}/`);
});
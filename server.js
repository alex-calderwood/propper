
const express = require('express');
const serveStatic = require('serve-static');

const app = express();
const port = process.env.PORT || 3008;
const path = require('path');

const src = path.join(__dirname, 'src');

// GET endpoint to fetch tag descriptions

app.get('/', (req, res) => {
  res.sendFile(path.join(src, 'index.html'));
});

// serve everything in src
console.log(src);
app.use(express.static(src));

app.listen(port, () => {
  console.log(`Running at: http://localhost:${port}/`);
});
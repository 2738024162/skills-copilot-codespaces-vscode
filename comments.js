// create web server 
const express = require('express');
const app = express();
// parse request body
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// allow cross-origin requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
// create in-memory database
const comments = [];
// create a new comment
app.post('/comments', (req, res) => {
  const comment = req.body;
  comments.push(comment);
  res.status(201).json(comment);
});
// list all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});
// start the web server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
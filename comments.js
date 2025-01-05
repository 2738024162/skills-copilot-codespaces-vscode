// Create web server
// 1. Create a web server using express
// 2. Create a route for GET /comments
// 3. Return a list of comments in JSON format
// 4. Listen on port 3000

const express = require('express');
const app = express();

app.get('/comments', (req, res) => {
  const comments = [
    { username: 'alice', comment: 'I am so cool' },
    { username: 'bob', comment: 'You are so cool' },
  ];
  res.json(comments);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// Run the server
// $ node comments.js
// Output: Server is running on http://localhost:3000
// Open a web browser and go to http://localhost:3000/comments
// You should see the list of comments in JSON format
// [{"username":"alice","comment":"I am so cool"},{"username":"bob","comment":"You are so cool"}]
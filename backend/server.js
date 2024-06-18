// server.js

const express = require('express');
const db = require('./database'); // Import the SQLite database instance
const app = express();
const port = 3001; // or any port you prefer

// Define routes and other server logic here

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get('/restaurants', (req, res) => {
  db.all('SELECT * FROM restaurants', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

//server.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

const dataFilePath = path.join(__dirname, 'data.json');

app.get('/api/data', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data file', err);
      res.status(500).send('Error reading data file');
      return;
    }

  
    res.json(JSON.parse(data));
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
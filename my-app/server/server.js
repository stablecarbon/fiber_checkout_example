const express = require("express");
const app = express();
const hostname = '127.0.0.1';
const port = 8000;
const charge = require('./charge');

app.get('/', async (req,res) => {
   return res.send('Home.');
});

app.use('/charge', charge);

const server = app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

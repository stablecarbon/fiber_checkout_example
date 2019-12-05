const express = require("express");
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config()
const hostname = '127.0.0.1';
const port = 3001;
const checkout = require('./checkout');
const termUrl = require('./termUrl');


// app.get('/', async (req,res) => {
//    return res.send('Home.');
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/checkout', checkout);
app.use('/termUrl', termUrl);


const server = app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

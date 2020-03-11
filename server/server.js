const express = require("express");
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config()
const hostname = '127.0.0.1';
const port = 3001;
const checkout = require('./checkout');
const termUrl = require('./termUrl');
const verificationRedirectUrl = require('./verificationRedirectUrl');
const successRedirectUrl = require('./successRedirectUrl');
const errorRedirectUrl = require('./successRedirectUrl');
const confirmationUrl = require('./confirmationUrl');



// app.get('/', async (req,res) => {
//    return res.send('Home.');
// });


// JSON request body parameters will be
// available under the request body params
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/checkout', checkout);
app.use('/termUrl', termUrl);
app.use('/verificationRedirectUrl', verificationRedirectUrl);
app.use('/confirmationUrl', confirmationUrl);
app.use('/successRedirectUrl', successRedirectUrl);
app.use('/errorRedirectUrl', errorRedirectUrl);


const server = app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

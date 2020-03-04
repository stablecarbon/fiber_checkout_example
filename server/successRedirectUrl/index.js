const express = require('express');
const axios = require('axios');
const successRedirectUrlRouter = express.Router();


successRedirectUrlRouter
  .route('')
  .get(async (req, res) => {
    console.log('Successfully redirected to successRedirectUrl');
    console.log(req.query); 
});

module.exports = successRedirectUrlRouter;

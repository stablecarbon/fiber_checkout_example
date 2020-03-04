const express = require('express');
const axios = require('axios');
const errorRedirectUrlRouter = express.Router();


errorRedirectUrlRouter
  .route('')
  .get(async (req, res) => {
    console.log('Successfully redirected to errorRedirectUrl');
    console.log(req.query); 
});

module.exports = errorRedirectUrlRouter;

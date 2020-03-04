const express = require('express');
const confirmationRouter = express.Router();


// TODO: update given prod v sandbox env (https://api.carbon.money v https://sandbox.carbon.money)
confirmationRouter
  .route('')
  .post(async (req, res) => {
    console.log('Successfully posted to confirmationUrl');
    console.log(req.query);
    console.log(req.body);
});

module.exports = confirmationRouter;

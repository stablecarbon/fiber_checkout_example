const express = require('express');
const chargeRouter = express.Router();


chargeRouter
  .route('')
  .post(async (req, res) => {
    return res.send(`This is the request body: ${req.body}`);
});

module.exports = chargeRouter;

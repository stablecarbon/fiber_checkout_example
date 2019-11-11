const express = require('express');
const chargeRouter = express.Router();


chargeRouter
  .route('/charge')
  .post(async (req, res) => {
    return res.send('Charged.');
});

module.exports = chargeRouter;

const express = require('express');
const chargeRouter = express.Router();


chargeRouter
  .route('')
  .post(async (req, res) => {
    let sampleTokenObject = {
      billingPostal: 'tok_sandbox_cX7qASdFWyDY3KbCXUZeMs',
      billingPremise: 'tok_sandbox_tbLwipMuUxoqZcwXuKwv8w',
      billingStreet: 'tok_sandbox_cQJ8WxYtgNj2faEiu61sP6',
      cardNumber: 'tok_sandbox_ptZBZ1Gnq4DqEpNdDUP65M',
      cvc: 'tok_sandbox_8oz8RVe8saXDXCsCmFyBVa',
      expiry: 'tok_sandbox_j3bT6mRaPXWmJwFcsH9WVF'
    };
    let sandboxSecretKey = process.env.SANDBOX_SECRET_KEY;
    let sandboxContactId = process.env.SANDBOX_CONTACT_ID;
    return res.send(`Charged.`);
});

module.exports = chargeRouter;

const express = require('express');
const axios = require('axios');
const publicIp = require('public-ip');
const checkoutRouter = express.Router();


checkoutRouter
  .route('')
  .post(async (req, res) => {
    try {
    // reference from own env. update given prod v sandbox env
    let secretKey = process.env.SANDBOX_SECRET_KEY; 
    let headers = {
      headers: {
        Authorization: `Bearer ${secretKey}`,
        // need to pass in `userip` as detailed here: https://docs.carbon.money/docs/blocked-countries
        userip: await publicIp.v4() 
      }
    }
   
    // reference from card form "tokenizationSuccess" event data in App.js
    // console.log(req.body);

    // if you configured the card form to to hide the billing street and/or billing postal code fields, 
    // you will have to tokenize those fields (along with the billing premise) separately on your end 
    // and then supply the `tokenizedBillingStreet`, `tokenizedBillingPremise`, and `tokenizedBillingPostal` 
    // fields at checkout as detailed here: https://docs.carbon.money/docs/checkout-widget#section-example-request-response-for-checkout-backend-integration. 
    // You can also set the contact's default `billingStreet` and `billingPostalCode` as detailed here: 
    // https://docs.carbon.money/docs/contacts#section-8-patch-contact-patch
    let tokenObject = req.body.tokenObject;

    // current options: usd, eur, gbp
    let fiatBaseCurrency = 'usd';

    // convention is to scale charged amount by 100 
    // to remove decimal considerations
    // so this represents $10 for example
    let fiatChargeAmount = '1000';
    
    // reference from own contact. update given prod v sandbox env
    let contactId = process.env.SANDBOX_CONTACT_ID; 
    let data = {
      tokenObject, fiatBaseCurrency, contactId, fiatChargeAmount
    };

    // update given prod v sandbox env (https://api.carbon.money v https://sandbox.carbon.money)
    let url = 'https://sandbox.carbon.money/v1/card/checkout'

    let resp;
    try {
      resp = await axios.post(url, data, headers);
      let respData = resp.data;
      console.log('Checkout endpoint success resp data')
      console.log(respData);
      return res.send(respData);
    } catch(err) {
      let errResponse = err.response;
      if (errResponse) {
        console.log('Error resp data for checkout endpoint', errResponse.data);
        console.log('Error resp status for checkout endpoint', errResponse.status);
      } else {
        console.log('Error calling checkout endpoint', err);
      }      
      return res.status(errResponse.status).send(errResponse.data);
    }
    
  } catch(err) {
    console.log(`Error charging card`);
    console.log(err);
  }
});

module.exports = checkoutRouter;

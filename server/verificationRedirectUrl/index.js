const express = require('express');
const axios = require('axios');
const verificationRedirectRouter = express.Router();


// TODO: update given prod v sandbox env (https://api.carbon.money v https://sandbox.carbon.money)
// TODO: convert to client-side code
verificationRedirectRouter
  .route('')
  .get(async (req, res) => {
    console.log('Successfully redirected to verificationRedirectUrl');
    console.log(req.query);
    console.log(req.body);
    try {
    let data = {
      orderId: req.query.orderId,
      // use to complete card verification in sandbox. will be undefined in PROD of course
      verificationCode: req.query.sandboxCode 
    };
    console.log(data);

    let url =  req.query.callbackUrl;
    console.log(url);

    let resp;
    try {
      resp = await axios.post(url, data);
      let respData = resp.data;
      console.log('Posting to callback url response data');
      console.log(respData);
      return res.send(respData);
    } catch(err) {
      let errResponse = err.response;
      if (errResponse) {
        console.log('Error resp data posting to callback url', errResponse.data);
        console.log('Error resp status posting to callback url', errResponse.status);
      } else {
        console.log('Error posting to callback url', err);
      }      
      return res.status(errResponse.status).send(errResponse.data);
    }
  } catch(err) {
    console.log(`Error at verification redirect url.`);
    console.log(err);
  }
});

module.exports = verificationRedirectRouter;

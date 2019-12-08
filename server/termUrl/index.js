const express = require('express');
const axios = require('axios');
const termUrlRouter = express.Router();


termUrlRouter
  .route('')
  .get(async (req, res) => {
    try {
    
    let data = {
      orderId: req.query.orderId
    };
    console.log(data);

    // update given prod v sandbox env (https://api.carbon.money v https://sandbox.carbon.money)
    let url = 'https://sandbox.carbon.money/v1/card/charge3d/complete'

    // if you want to cancel order call the cancel order endpoint
    let resp;
    try {
      resp = await axios.post(url, data);
      let respData = resp.data;
      console.log('Term url endpoint success resp data')
      console.log(respData);
      return res.send(respData);
    } catch(err) {
      let errResponse = err.response;
      if (errResponse) {
        console.log('Error resp data for charge 3d complete endpoint', errResponse.data);
        console.log('Error resp status for charge 3d complete endpoint', errResponse.status);
      } else {
        console.log('Error calling charge 3d complete endpoint at term url', err);
      }      
      return res.status(errResponse.status).send(errResponse.data);
    }
    
  } catch(err) {
    console.log(`Error at term url.`);
    console.log(err);
  }
});

module.exports = termUrlRouter;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
require('dotenv').config()

function App() {

  const [step, setStep] = useState(0);
  const [isSubmitting, setSubmitting] = useState(false);

  const receiveIframeMessage = (e) => {
    console.log('handling message');
    console.log(e);
    console.log('origin');
    console.log(e.origin);
    // console.log('source');
    // console.log(e.source);
    console.log('data passed');
    console.log(e.data);
    const data = { ...e.data };
    if (data.type === 'tokenizationSuccess') {
      console.log('Card form successfully submitted and card tokenized. Here is card token data.');
      console.log(data.data);
      axios.post('/checkout', data.data, {
        headers: {
        }
      })
            .then(resp => {
              console.log(resp);

              let iframeWindow = document.getElementById('checkoutIframe').contentWindow;
              // render acs form in checkout iframe with two parameters:
              // 1. your superuser public key ('publicKey') for authentication
              // 2. the target environment ('env'). options are 'sandbox' or 'production'
              // 3. the order id for checkout ("orderId")
              iframeWindow.postMessage(
                {
                  type: "renderACSForm",
                  publicKey: process.env.REACT_APP_SANDBOX_PUBLIC_KEY,
                  env: "sandbox",
                  orderId: resp.data.details.orderId,
                }, "*"
              );
              // let acs = elements.create('acs', { acsUrl: resp.data.details.acsUrl });

              // setStep(1);

              // acs.mount('acs-container');
            })
            .catch(err => {
              console.log('Error checking out.');
              console.log(err);
            });
    }
  };

  const loadCarbon = () => {
    let iframeWindow = document.getElementById('checkoutIframe').contentWindow;
    // render card form in checkout iframe with two parameters:
    // 1. your superuser public key ('publicKey') for authentication
    // 2. the target environment ('env'). options are 'sandbox' or 'production'
    iframeWindow.postMessage(
      {
        type: "renderCardForm",
        publicKey: process.env.REACT_APP_SANDBOX_PUBLIC_KEY, 
        env: "sandbox",
      }, "*"
    );
    console.log('done');

    // add event handler for receiving messages from checkout iframe
    window.addEventListener("message", receiveIframeMessage, false);
  
  };

  useEffect(() => {
    setTimeout(() => {
      loadCarbon()
    }, 1000)
  }, []);

  const determineStepDisplayed = (num) => {
    switch (num) {
      case 0:
        return (
          <div className="payment-container">
            <div className="payment-row">
              {/* Load checkout iframe here from https://card.carbon.money. 
                  The card form dimensions are around 335px X 290px,
                  so you can adjust the size of your checkout iframe accordingly.
                */}
              <iframe 
              id="checkoutIframe"
              title="Carbon Checkout Iframe"
              width="335"
              height="290"
              allow="fullscreen"
              src="https://card.carbon.money">
              </iframe>
          </div>
        </div>
        );
      case 1:
        return (
          <div className="acs">
            <h2>ACS Confirmation</h2>
            <div id="acs-container">
              {/* Carbon generated ACS iframe element rendered here. */}
            </div>
          </div>
        );
      default:
        break;
    }
  };
  
  return (
    <div className="App">
      {determineStepDisplayed(step)}
    </div>
  );
}

export default App;

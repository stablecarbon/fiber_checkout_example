import React, { useEffect } from 'react';
import axios from 'axios';
import './App.css';

require('dotenv').config();

function App() {
  /**
   * Handler for receiving messages from payment gateway widget iframe
   * via the `postMessage` API.
   *
   * After accessing the message data object in the 'data' field, you should handle one message type
   * in particular: 'tokenizationSuccess'. You can access the message type by accessing the 'type'
   * field in the message data object. The 'tokenizationSuccess' message is transmitted to the parent window
   * from card.carbon.money when a card is successfully submitted and tokenized via the rendered card form.
   * The tokenized card object will be available in the 'tokenizationSuccess' message 'data' field. We then use
   * the tokenized card object to initiate checkout via the proxy server checkout endpoint, which calls the
   * Carbon Fiber /v1/card/checkout endpoint to add and begin charging a card for payment.
   *
   * If checkout is successful, you will receive an order id. You can then use that order id in addition to
   * your superuser public key to begin the 3DS authentication process for the order in the designated environment.
   * Again you can use the `postMessage` API to send a message of type `renderACSForm` with the above parameters
   * to render the ACS form. If 3DS authentication is successful, you can then complete payment.
   * Note that this example integration assumes the superuser has set a `customTermUrl` where the superuser
   * can then decide to either not complete payment or complete payment by posting to our charge completion
   * url with their order id.
   * */
  const receiveIframeMessage = (e) => {
    // comment out below console logs to debug
    // console.log('Handling message.');
    // console.log(e);
    // console.log('Message origin.');
    // console.log(e.origin);
    // console.log('Message data passed.');
    // console.log(e.data);
    const data = { ...e.data };
    if (data.type === 'tokenizationSuccess') {
      // console.log('Card form submitted and card tokenized. Here is card token data.');
      // console.log(data.data);
      axios.post('/checkout', data.data)
        .then((resp) => {
          // console.log('Checkout success response data.')
          // console.log(resp.data);

          const iframeWindow = document.getElementById('paymentGatewayIframe').contentWindow;
          /**
           * Use the `postMessage` API to render the 3DS authentication ACS form
           * in the payment gateway widget iframe with the following three parameters:
           *   1. your superuser public key ('publicKey') for authentication
           *   2. the target environment ('env'). options are 'sandbox' or 'production'
           *   3. the order id for checkout ("orderId")
           * */
          iframeWindow.postMessage(
            {
              type: 'renderACSForm',
              publicKey: process.env.REACT_APP_SANDBOX_PUBLIC_KEY,
              env: 'sandbox',
              orderId: resp.data.details.orderId,
            }, '*',
          );
        })
        .catch((err) => {
          console.log('Error checking out.');
          console.log(err);
        });
    }
  };

  const loadCarbon = () => {
    // access payment gateway widget iframe window
    const iframeWindow = document.getElementById('paymentGatewayIframe').contentWindow;
    /**
     * Use the `postMessage` API to render the card form in the payment gateway iframe with two parameters:
     *   1. your superuser public key ('publicKey') for authentication
     *   2. the target environment ('env'). options are 'sandbox' or 'production'.
     * */
    iframeWindow.postMessage(
      {
        type: 'renderCardForm',
        publicKey: process.env.REACT_APP_SANDBOX_PUBLIC_KEY,
        env: 'sandbox',
      }, '*',
    );

    // Add event handler in parent window for receiving messages
    // from payment gateway widget iframe
    window.addEventListener('message', receiveIframeMessage, false);
  };

  // useEffect runs after every component render.
  // We call 'loadCarbon', which uses the `postMessage` API
  // to communicate with the 'paymentGatewayIframe' to render
  // the card form so users can add their payment cards. 
  // If the card form submission is successful, the 'paymentGatewayIframe'
  // will communicate via the 'postMessage' API the tokenized payment card fields
  // to the parent app window. The superuser can use this token card object to 
  // initiate checkout.
  useEffect(() => {
    setTimeout(() => {
      loadCarbon();
    }, 1000);
  }, []);

  return (
    <div className="App">
      <div className="payment-container">
        <div className="payment-row">
          {/* Load the payment gateway widget here from https://card.carbon.money.
              The card form dimensions are around 335px X 290px,
              so you can adjust the size of your checkout iframe accordingly.
          */}
          <iframe
            id="paymentGatewayIframe"
            title="Carbon Payment Gateway Iframe"
            width="335"
            height="290"
            allow="fullscreen"
            src="https://card.carbon.money"
          />
        </div>
      </div>
    </div>
  );
}

export default App;

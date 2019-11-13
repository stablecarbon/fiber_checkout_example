import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [step, setStep] = useState(0);
  const [isSubmitting, setSubmitting] = useState(false);

  const loadCarbon =  () => {
    // Initiate carbon. update with your superuser public key here
    let carbon = window.CarbonCheckoutCli.default.carbonCheckout("pk_test_i405dzcO1229d1833SMeTGah", "sandbox");

    // Initiate elements object
    let elements = carbon.elements();

    // Create card element (will allow for css to be passed in)
    let card = elements.create('card');

    // Mount card UI to app
    card.mount("card-element");

    // Handle payment submission.
    var btn = document.getElementById('payment-submission-btn');

    btn.addEventListener('click', function(event) {
      event.preventDefault();
      setSubmitting(true);

      carbon.createToken(card).then(function(result) {
        if (result.error) {
          // Inform the user if there was an error.
          // var errorElement = document.getElementById('card-errors');
          // errorElement.textContent = result.error.message;
        } else {
          // Submit the payment info
          axios.post('/charge', result)
            .then(resp => {
              // create acs component
              let acs = elements.create('acs', { acsUrl: resp.data.details.acsUrl });

              setStep(1);

              acs.mount('acs-container');
            });
        }
      });
    });
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
              <label for="firstName">
                <p>First Name:</p>
                <input type="text" id="firstName" name="first_name" />
              </label>
            </div>
            <div className="payment-row">
              <label for="firstName">
                <p>Last Name:</p>
                <input type="text" id="firstName" name="first_name" />
              </label>
            </div>
            <div className="payment-row">
              <label for="card-element">
                <p>Credit or debit card</p>
              </label>
              <div id="card-element">
                {/* Carbon generated card iframe element rendered here. */}
              </div>
            </div>
            <button id="payment-submission-btn">
              {isSubmitting ? (
                'Pending...'
              ) : 'Next'}
            </button>
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

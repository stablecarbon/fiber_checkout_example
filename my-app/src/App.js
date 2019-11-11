import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const loadCarbon = async () => {
    let carbon = await window.CarbonCheckoutCli.default.carbonCheckout("pk_test_i405dzcO1229d1833SMeTGah", "sandbox");
    let elements = carbon.elements();
    let card = elements.create('card');
    card.mount("card-element");
  };

  useEffect(() => {
    setTimeout(() => {
      loadCarbon()
    }, 5000)
  }, []);

  return (
    <div className="App">
      <form action="/charge" method="post" id="payment-form">
        <div class="form-row">
          <label>
            Name
          </label>
          <input />
          <label for="card-element">
            Credit or debit card
          </label>
          <div id="card-element">
          </div>
          <div id="card-errors" role="alert"></div>
        </div>
        <button>Submit Payment</button>
      </form>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PaymentGatewayWidget from './components/PaymentGatewayWidget';
import CardVerification from './components/CardVerification/CardVerification';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={PaymentGatewayWidget} />
          <Route path="/verify" render={(props) => <CardVerification {...props} />} />
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;

## Overview
This is an example integration of Carbon's payment gateway widget. 
Further technical documentation is available at https://docs.carbon.money/docs/checkout-widget. 

## `Payment Gateway Widget Iframe Overview`

The payment gateway widget is available at https://card.carbon.money and should 
be enclosed in an iframe for integration. There are two main components that you will have to render at various points in the iframe: 
  1. A card form for your users to add payment cards. If submission is successful, you will receive a tokenized card object. You can then use
  the tokenized card fields to begin charge of a card and create an order
  via the Carbon Fiber Credit/Debit Card API checkout endpoint.
  2. A 3DS authentication ACS (Access Control Server) form. You can use
  the returned order id from the checkout endpoint to render this form.

If you set a `customTermUrl`, then you can decide to either complete or not 
complete the payment. To complete the payment, you can post to the Carbon Fiber API charge 3D completion url with the order.

Integration with the Carbon Fiber Credit/Debit Card API is handled in the 
proxy server.

## `postMessage` API

We use the `postMessage` API to securely communicate across origins
from this app's parent window to the child payment gateway widget window 
in addition to responding to messages from the card.carbon.money frame. For more on the `postMessage` API, please refer to: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage


## Documentation References

For more on 3DS authentication, please check out our 3DS overview here: https://
docs.carbon.money/docs/3d-secure-card-payments and our credit/debit purchases API here: https://docs.carbon.money/docs/credit-debit.

For more on completing processing payments at your `customTermUrl`, please go here: https://docs.carbon.money/docs/custom-term-url. Note that this functionality is not completely fleshed out yet.

## `Progress Update`

This integration right now assumes the superuser secret key, contact id, and
public key are available as env vars (SANDBOX_SECRET_KEY, SANDBOX_CONTACT_ID,
and REACT_APP_SANDBOX_PUBLIC_KEY respectively).

This integration right now assumes a sandbox env but will also soon be updated 
to work for either production or sandbox config.

This integration right now has minimal styling and error handling and no 
testing.

## Available Scripts

Make sure to run `yarn` to install dependencies.
In the project directory, you can run:

### `yarn start`

Runs the app client in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn start-server`

Runs the app server. Logs will be available. Make sure to run the proxy server before you add a payment card via the card form or complete 3DS authentication via the ACS form at http://localhost:3000. <br />

Open [http://localhost:3001](http://localhost:3001) to access the proxy server's home route in the browser. 

Note that the proxy server root is set in the `package.json` under the 'proxy' key.


### `npm run lint`

We use Airbnb's eslint config for linting this code. This config is quite strict
so feel free to use or ignore it at your discretion.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

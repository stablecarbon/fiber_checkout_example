This is an example integration of Carbon's payment gateway checkout widget. Technical documentation is available at https://docs.carbon.money/docs/checkout-widget. 

## Available Scripts

Make sure to run `yarn` to install dependencies.
In the project directory, you can run:

### `yarn start`

Runs the app client in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.


### `yarn start-server`

Runs the app server. Logs will be available. Make sure to run the server before you add a payment card at http://localhost:3000. <br />

Open [http://localhost:3001](http://localhost:3001) to access the server's home route in the browser.

### `Progress Update`

This integration right now assumes the superuser secret key and contact id are available as env vars (SANDBOX_SECRET_KEY and SANDBOX_CONTACT_ID, respectively) for simplicity's sake but will very soon be updated to not
take that assumption. 

This integration right now assumes a sandbox env but will also soon be updated to work for either production or sandbox config.

This integration right now uses a fixed tokenized sandbox credit/debit card that will trigger a success response but will soon be updated to take in the tokenized credit/debit card from the form UI.

This integration right now loads a bank's ACS UI for 3DS authentication via an HTML script with sensitive 3DS authentication data unencrypted but will soon be updated to return an ACS HTML script with tokenized 3DS payment data (such as the `md` and `pareq`) in addition to taking in CSS and JS config. For more on 3DS authentication, please out 3DS overview here: https://docs.carbon.money/docs/3d-secure-card-payments and our credit/debit purchases API here: https://docs.carbon.money/docs/credit-debit.

Lastly, this integration needs testing of payment gateway functionality post 3DS authentication in particular completing processing payments at the termination URL as highlighted here: https://docs.carbon.money/docs/custom-term-url.

Styling and error handling will also be updated over time.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

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

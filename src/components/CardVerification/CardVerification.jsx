import React from 'react';
import { useLocation } from 'react-router-dom';
import './_cardVerification.scss';
import Button from '../../common/button/button';

const axios = require('axios');

function CardVerification() {
  function GetQueryParams() {
    // useLocation hook returns url query parameters under the search field
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    return {
      orderId: queryParams.get('orderId'),
      sandboxCode: queryParams.get('sandboxCode'),
      callbackUrl: queryParams.get('callbackUrl'),
    };
  }

  const queryParams = GetQueryParams();
  const verificationCode = queryParams.sandboxCode;
  const { callbackUrl } = queryParams;
  const { orderId } = queryParams;

  async function onNext() {
    try {
      const data = {
        orderId,
        // use to complete card verification in sandbox. will be undefined in PROD of course
        verificationCode,
      };
      console.log(data);

      const url = callbackUrl;
      console.log(url);

      let resp;
      try {
        resp = await axios.post(url, data);
        const respData = resp.data;
        console.log('Posting to callback url response data');
        console.log(respData);
        // return res.send(respData);
      } catch (err) {
        const errResponse = err.response;
        if (errResponse) {
          console.log('Error resp data posting to callback url', errResponse.data);
          console.log('Error resp status posting to callback url', errResponse.status);
        } else {
          console.log('Error posting to callback url', err);
        }
      }
    } catch (err) {
      console.log('Error at card verification UI.');
      console.log(err);
    }
  };

  return (
    <div className="payment-row">
      <div className="card-verification-container">
        <p className="card-verification-text-intro">
                Please complete your purchase by logging into your credit card account and entering the 4 character code from your latest charge description. You can access your charge descriptions by going to your history of transactions (sometimes called statement) in your account.
            An example charge description from us is carbon-1234. If you do not enter in your verification code in 10 minutes, your order will be cancelled and funds returned.
        </p>
        <img className="card-verification-image" src="https://d2xxy1rwbjzckp.cloudfront.net/verification.jpeg" alt="Example" />
        <p className="card-verification-text-example">
                    Code = 3122 in this example
        </p>
        <div className="input-group mb-3">
          <input value={verificationCode} id="carbon2faCode" type="text" className="form-control" placeholder="4 digit code" aria-describedby="basic-addon2" />
          <div className="input-group-append">
            <Button
              type="submit"
              disabled={false}
              fixed
              className="button"
              onClick={onNext}
            >
              <p style={{ color: 'white' }}>Next</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardVerification;

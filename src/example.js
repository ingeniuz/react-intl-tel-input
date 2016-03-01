import React from 'react';
import ReactDOM from 'react-dom';
import IntlTelInput from 'react-intl-tel-input';
import { debounce } from 'throttle-debounce';

import 'file?name=libphonenumber.js!./libphonenumber.js';
import './main.css';

const loadJSONP = (url, callback) => {
  const ref = window.document.getElementsByTagName('script')[0];
  const script = window.document.createElement('script');
  script.src = `${url + (url.indexOf('?') + 1 ? '&' : '?')}callback=${callback}`;
  ref.parentNode.insertBefore(script, ref);
  script.onload = () => {
    this.remove();
  };
};

const lookup = (callback) => {
  loadJSONP('http://ipinfo.io', 'sendBack');
  window.sendBack = (resp) => {
    const countryCode = (resp && resp.country) ? resp.country : '';
    callback(countryCode);
  };
};

class DemoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      0: '',
      1: '',
    };
  }

  componentWillMount() {
    this.deplayedChangeHandler = (...data) => {
      debounce(250, () => {
        this.changeHandler.apply(this, data);
      })();
    };
  }

  changeHandler(isValid, value, countryData, number, id) {
    /* eslint-disable */
    console.log(isValid, value, countryData, number, id);
    /* eslint-enable */
    this.setState({
      [id]: value,
    });
  }

  render() {
    return (
      <div>
        <IntlTelInput id={'0'}
          onPhoneNumberChange={this.deplayedChangeHandler}
          defaultCountry={'auto'}
          geoIpLookup={lookup}
          css={['intl-tel-input', 'form-control']}
          utilsScript={'assets/libphonenumber.js'}
        />
        <div>Phone Number: {this.state['0']}</div>

        <IntlTelInput id={'1'}
          onPhoneNumberChange={this.deplayedChangeHandler}
          defaultCountry={'auto'}
          geoIpLookup={lookup}
          css={['intl-tel-input', 'form-control']}
          utilsScript={'assets/libphonenumber.js'}
        />
        <div>Phone Number: {this.state['1']}</div>
      </div>
    );
  }
}

ReactDOM.render(<DemoComponent />, document.getElementById('content'));

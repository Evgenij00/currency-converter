import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux';
import store from './store';
import { CurrenciesServiceProvider } from './components/currencies-service-context';
import CurrenciesService from './services/currencies-service';

const service = new CurrenciesService()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CurrenciesServiceProvider value={service}>
        <App />
      </CurrenciesServiceProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

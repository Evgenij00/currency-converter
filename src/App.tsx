import React from 'react';
import { Container } from 'react-bootstrap';
import Converter from './components/Converter';
import CurrencyRatesTable from './components/CurrencyRates';
import Header from './components/Header';

import { BrowserRouter, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container fluid='sm'>
        <Switch>
          <Route path='/' exact component={CurrencyRatesTable} />
          <Route path='/convert' component={Converter} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;

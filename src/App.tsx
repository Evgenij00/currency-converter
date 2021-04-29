import React from 'react';
import { Container } from 'react-bootstrap';
import Converter from './components/Converter';
import CurrencyRatesTable from './components/CurrencyRatesTable';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <Container fluid='sm'>
        <CurrencyRatesTable />
        <Converter />
      </Container>
    </>
  );
}

export default App;

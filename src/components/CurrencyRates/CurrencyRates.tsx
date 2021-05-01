import React, { Component } from "react";
import { connect } from 'react-redux'

import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { ratesRequested, ratesLoaded, ratesError, setBaseCurrency } from "../../actions";
import { TCurrenciesReducer } from "../../reducers/currencies-rates";
import CurrenciesService from "../../services/currencies-service";
import { TBaseCurrency, TFeatchRatesRequest, TFetchRatesError, TFetchRatesSuccess } from "../../actions/types";

type CurrencyRatesProps = {
  baseCurrency: string
  currenciesRates: [string, number][] | []
  error: Error | null
  loading: boolean
  ratesRequested: () => TFeatchRatesRequest
  ratesLoaded: (rates: [string, number][]) => TFetchRatesSuccess
  ratesError: (error: Error) => TFetchRatesError
  setBaseCurrency: (baseCurrency: string) => TBaseCurrency
}

class CurrencyRates extends Component<CurrencyRatesProps> {

  service = new CurrenciesService()

  private _idInterval: any

  componentDidMount(): void {
    ratesRequested()
    this.fetchRates(this.props.baseCurrency);
    this._idInterval = setInterval(
      () => this.fetchRates(this.props.baseCurrency),
      5000
    );
  }

  fetchRates = (baseCurrency: string) => {
    const {ratesRequested, ratesLoaded, ratesError} = this.props
    this.service.getRatesByBase(baseCurrency)
      .then((rates: [string, number][]) => ratesLoaded(rates))
      .catch((error: Error) => ratesError(error))
  }

  componentWillUnmount(): void {
    clearInterval(this._idInterval);
  }

  hendleChangeSelector = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    this.props.setBaseCurrency(e.target.value)
  };

  renderSelect = (name: string): any => {
    return (
      <option key={name} value={name}>
        {name}
      </option>
    );
  };

  renderTabels = (item: any): any => {
    return (
      <tr key={item[0]}>
        <td>
          {this.props.baseCurrency}/{item[0]}
        </td>
        <td>{item[1]}</td>
      </tr>
    );
  };

  render() {
    // console.log(this.props)

    const { baseCurrency, loading, error, currenciesRates } = this.props;

    if (loading) return <h1>Loading...</h1>;

    if (error) return <h1>Error</h1>;

    const currenciesNames = this.service.getCurrenciesNames().map(this.renderSelect)
    const items = currenciesRates.map(this.renderTabels)

    return (
      <>
        <Form>
          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>Выберите валюту</Form.Label>
            <Form.Control as="select"
              value={baseCurrency}
              onChange={this.hendleChangeSelector}
              custom>
              {currenciesNames}
            </Form.Control>
          </Form.Group>
        </Form>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Основные пары</th>
              <th>Покупка</th>
            </tr>
          </thead>
          <tbody>
            {items}
          </tbody>
        </Table>
      </>
    );
  }
}

const mapStateToProps = (
  { updateCurrenciesRates: { baseCurrency, currenciesRates, error, loading } }:
  { updateCurrenciesRates: TCurrenciesReducer }
): TCurrenciesReducer => {
  return { baseCurrency, currenciesRates, error, loading };
};

type TmapDispatchToProps = {
  ratesRequested: () => TFeatchRatesRequest
  ratesLoaded: (rates: [string, number][]) => TFetchRatesSuccess
  ratesError: (error: Error) => TFetchRatesError
  setBaseCurrency: (baseCurrency: string) => TBaseCurrency
}

const mapDispatchToProps: TmapDispatchToProps = {
  ratesLoaded,
  setBaseCurrency,
  ratesError,
  ratesRequested
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyRates)


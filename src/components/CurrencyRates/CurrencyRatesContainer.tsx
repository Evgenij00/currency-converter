import React, { Component } from "react";
import { connect } from 'react-redux'

import { ratesRequested, ratesLoaded, ratesError, setBaseCurrency } from "../../actions";
import { TCurrenciesReducer } from "../../reducers/currencies-rates";
import CurrenciesService from "../../services/currencies-service";
import { TBaseCurrency, TFeatchRatesRequest, TFetchRatesError, TFetchRatesSuccess } from "../../actions/types";
import { CurrencyRatesView } from "./CurrencyRatesView";

type TDispatchProps = {
  ratesRequested: () => TFeatchRatesRequest
  ratesLoaded: (rates: [string, number][]) => TFetchRatesSuccess
  ratesError: (error: Error) => TFetchRatesError
  setBaseCurrency: (baseCurrency: string) => TBaseCurrency
}

type CurrencyRatesContainerProps = TDispatchProps & TCurrenciesReducer


class CurrencyRatesContainer extends Component<CurrencyRatesContainerProps> {

  service = new CurrenciesService()

  private _idInterval: any
  private _interval: number = 5000

  componentDidMount(): void {
    this.props.ratesRequested()
    this.fetchRates(this.props.baseCurrency);
    this._idInterval = setInterval(
      () => this.fetchRates(this.props.baseCurrency),
      this._interval
    );
  }

  componentWillUnmount(): void {
    clearInterval(this._idInterval);
  }
  
  fetchRates = (baseCurrency: string) => {
    const {ratesLoaded, ratesError} = this.props
    this.service.getRatesByBase(baseCurrency)
      .then((rates: [string, number][]) => ratesLoaded(rates))
      .catch((error: Error) => ratesError(error))
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
    const { baseCurrency, loading, error, currenciesRates } = this.props;

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>Error</h1>;

    const currenciesNames = this.service.getCurrenciesNames().map(this.renderSelect)
    const items = currenciesRates.map(this.renderTabels)

    return (
      <CurrencyRatesView
        currenciesNames={currenciesNames}
        items={items}
        baseCurrency={baseCurrency}
        hendleChangeSelector={this.hendleChangeSelector} />
    );
  }
}


const mapStateToProps = (
  { updateCurrenciesRates: { baseCurrency, currenciesRates, error, loading } }:
  { updateCurrenciesRates: TCurrenciesReducer }
): TCurrenciesReducer => {
  return { baseCurrency, currenciesRates, error, loading };
};

const mapDispatchToProps: TDispatchProps = {
  ratesLoaded,
  setBaseCurrency,
  ratesError,
  ratesRequested
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyRatesContainer)

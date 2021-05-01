import React, { Component } from "react";
import { connect } from 'react-redux'

import { ratesRequested, ratesLoaded, ratesError, setBaseCurrency } from "../../actions";
import { TCurrenciesReducer } from "../../reducers/currencies-rates";
import { ICurrenciesService } from "../../services/currencies-service";
import { TBaseCurrency, TFeatchRatesRequest, TFetchRatesError, TFetchRatesSuccess } from "../../actions/types";
import { CurrencyRatesView } from "./CurrencyRatesView";
import { withCurrenciesService } from "../hoc";

type TDispatchProps = {
  ratesRequested: () => TFeatchRatesRequest
  ratesLoaded: (rates: [string, number][]) => TFetchRatesSuccess
  ratesError: (error: Error) => TFetchRatesError
  setBaseCurrency: (baseCurrency: string) => TBaseCurrency
}

type TOwnProps = {
  service: ICurrenciesService
}

type CurrencyRatesContainerProps = TDispatchProps & TCurrenciesReducer & TOwnProps

class CurrencyRatesContainer extends Component<CurrencyRatesContainerProps> {

  private _idInterval: any
  private _interval: number = 5000

  componentDidMount(): void {
    this.props.ratesRequested()
    this.props.service.loadCurrenciesName()
    this.startTimer()
  }

  componentWillUnmount(): void {
    clearInterval(this._idInterval);
  }

  startTimer = () => {
    this.fetchRates(this.props.baseCurrency);
    this._idInterval = setInterval(
      () => this.fetchRates(this.props.baseCurrency),
      this._interval
    );
  }
  
  fetchRates = (baseCurrency: string) => {
    const {service, ratesLoaded, ratesError} = this.props
    service.getRatesByBaseRandom(baseCurrency)
      .then((rates: [string, number][]) => ratesLoaded(rates))
      .catch((error: Error) => ratesError(error))
  }

  hendleChangeSelector = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    localStorage.setItem('baseCurrency', e.target.value)
    this.props.setBaseCurrency(e.target.value)

    clearInterval(this._idInterval);
    this.startTimer()
  };

  renderSelect = (name: string): any => {
    return (
      <option key={name} value={name}>
        {name}
      </option>
    );
  };

  renderTabels = (item: any): any => {

    const [currency, diff] = item[0].split('/')

    let colorClassName = undefined
    let icon = undefined

    if (diff > 0) {
      colorClassName = 'green'
      icon = <i className="fas fa-arrow-up"></i>
    }
      
    if (diff < 0) {
      colorClassName = 'red'
      icon = <i className="fas fa-arrow-down"></i>
    }

    return (
      <tr key={item[0]}>
        <td>
          {this.props.baseCurrency}/{currency}
        </td>
        <td className={colorClassName}>
          <span className="icon">{icon}</span>
          <span>{item[1]}</span>
          </td>
      </tr>
    );
  };

  render() {
    const {service, baseCurrency, loading, error, currenciesRates } = this.props;

    if (loading) return <h1>Выполняем работу :)</h1>;
    if (error) return <h1>Что-то пошло не так... Попробуйте в другой раз.</h1>;

    const currenciesNames = service.getCurrenciesNames().map(this.renderSelect)
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

export default withCurrenciesService()(
  connect(mapStateToProps, mapDispatchToProps)(CurrencyRatesContainer)
)
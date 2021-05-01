import React, { Component } from "react";

import { connect } from 'react-redux';
import { TFetchPriceRequest, TFetchPriceSuccess, TFetchPriceError, TString } from "../../actions/types";
import { priceRequest, priceLoaded, priceError, setString,} from '../../actions'
import { TConvertReducer } from "../../reducers/converter";
import { ICurrenciesService } from "../../services/currencies-service";

import {ConverterView} from './ConverterView'
import { withCurrenciesService } from "../hoc";

type TDispatchProps = {
  priceRequest: () => TFetchPriceRequest
  priceLoaded: (price: number) => TFetchPriceSuccess
  priceError: (error: Error) => TFetchPriceError
  setString: (string: string, inputValid: boolean) => TString
}

type TOwnProps = {
  service: ICurrenciesService
}

type ConverterContainerProps = TConvertReducer & TDispatchProps & TOwnProps

class ConverterContainer extends Component<ConverterContainerProps> {

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const string = e.target.value
    this.props.setString(string, !!(this.isValid(string)))
  }

  handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { string, service, priceRequest, priceLoaded, priceError } = this.props

    const [quantity, fromName, , toName] = string.toUpperCase().split(" ");

    priceRequest();
    service
      .getConvertPrice(fromName, toName, +quantity)
      .then((price: number) => priceLoaded(price))
      .catch((error: Error) => priceError(error));
  };

  isValid = (str: string) => {
    const regExp = /^\d+\s[A-Za-z]{3}\sin\s[A-Za-z]{3}$/;
    return Boolean(str.match(regExp)?.[0]);
  };

  render() {

    const { loading, result, inputValid, error, string} = this.props;

    let general: any

    if (loading) {
      general = <div>Loading...</div>;
    } else if (error) {
      general = <div>Error...</div>;
    } else {
      general = <div>{result}</div>;
    }

    return (
      <ConverterView
      string={string}
      general={general}
      inputValid={inputValid}
      handleFormSubmit={this.handleFormSubmit}
      handleInputChange={this.handleInputChange}
      />
    );
  }
}

const mapStateToProps = (
  { convertCurrency: { loading, result, inputValid, error, string } }:
  { convertCurrency: TConvertReducer }): TConvertReducer => {
  return { loading, result, error, string, inputValid};
};

const mapDispatchToProps: TDispatchProps = {
  priceRequest,
  priceLoaded,
  priceError,
  setString,
};

export default withCurrenciesService()(
  connect(mapStateToProps, mapDispatchToProps)(ConverterContainer)
)

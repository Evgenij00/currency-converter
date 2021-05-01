import React, { Component } from "react";

import { connect } from 'react-redux';
import { TEmptyStringError, TInvalidStringError, TFetchPriceRequest, TFetchPriceSuccess, TFetchPriceError, TString } from "../../actions/types";
import {setEmptyStringError, setInvalidStringError, priceRequest, priceLoaded, priceError, setString,} from '../../actions'
import { TConvertReducer } from "../../reducers/converter";
import CurrenciesService, { ICurrenciesService } from "../../services/currencies-service";

import {ConverterView} from './ConverterView'

type TDispatchProps = {
  setEmptyStringError: () => TEmptyStringError
  setInvalidStringError: () => TInvalidStringError
  priceRequest: () => TFetchPriceRequest
  priceLoaded: (price: number) => TFetchPriceSuccess
  priceError: (error: Error) => TFetchPriceError
  setString: (value: string) => TString
}

type ConverterContainerProps = TConvertReducer & TDispatchProps

class ConverterContainer extends Component<ConverterContainerProps> {

  service: ICurrenciesService = new CurrenciesService()

  handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { string, setEmptyStringError, setInvalidStringError, priceRequest, priceLoaded, priceError } = this.props

    const text = string.trim();

    if (!text) {
      setEmptyStringError();
      return;
    }

    if (!this.isValid(text)) {
      setInvalidStringError();
      return;
    }

    const [quentity, fromName, , toName] = text.toUpperCase().split(" ");

    priceRequest();
    this.service
      .getConvertPrice(fromName, toName, +quentity)
      .then((price: number) => priceLoaded(price))
      .catch((error: Error) => priceError(error));
  };

  isValid = (str: string) => {
    const regExp = /^\d+\s[A-Za-z]{3}\sin\s[A-Za-z]{3}$/;
    return Boolean(str.match(regExp)?.[0]);
  };

  render() {

    const { loading, errorMessage, price, error, string, setString} = this.props;

    let result: any

    if (loading) {
      result = <p>Loading...</p>;
    } else if (errorMessage) {
      result = <p>{errorMessage}</p>;
    } else if (error) {
      result = <p>Error</p>;
    } else {
      result = <p>{price}</p>;
    }

    return (
      <ConverterView
      string={string}
      result={result}
      setString={setString}
      handleFormSubmit={this.handleFormSubmit}
      />
    );
  }
}

const mapStateToProps = (
  { convertCurrency: { loading, errorMessage, price, error, string } }:
    { convertCurrency: TConvertReducer }): TConvertReducer => {
  return {
    loading,
    errorMessage,
    price,
    error,
    string,
  };
};

const mapDispatchToProps: TDispatchProps = {
  setEmptyStringError,
  setInvalidStringError,
  priceRequest,
  priceLoaded,
  priceError,
  setString,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConverterContainer)

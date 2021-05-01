import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from 'react-redux';
import { TEmptyStringError, TInvalidStringError, TFetchPriceRequest, TFetchPriceSuccess, TFetchPriceError, TString } from "../../actions/types";
import {setEmptyStringError, setInvalidStringError, priceRequest, priceLoaded, priceError, setString,} from '../../actions'
import { TConvertReducer } from "../../reducers/converter";
import CurrenciesService, { ICurrenciesService } from "../../services/currencies-service";

type TOwnProps = {
  service: ICurrenciesService
}

type TDispatchProps = {
  setEmptyStringError: () => TEmptyStringError
  setInvalidStringError: () => TInvalidStringError
  priceRequest: () => TFetchPriceRequest
  priceLoaded: (price: number) => TFetchPriceSuccess
  priceError: (error: Error) => TFetchPriceError
  setString: (value: string) => TString
}

type ConverterProps = TConvertReducer & TDispatchProps & TOwnProps

class Converter extends Component<ConverterProps> {

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

    const {
      loading,
      errorMessage,
      price,
      error,
      string,
      setString,
    } = this.props;

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
      <Form onSubmit={this.handleFormSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Что вы хотите конвертировать?</Form.Label>
        <Form.Control
          type="text"
          value={string}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setString(e.target.value)}
          placeholder="10 usd in rub"
        />
        <Form.Text className="text-muted">
          Убедитесь, что вы правильно ввели данные. Регистр не имеет значения.
          Пример: 10 usd in rub
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Конвертировать
      </Button>
      {result}
    </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Converter)

import { FETCH_RATES_SUCCESS, FETCH_RATES_FUILURE, FETCH_RATES_REQUEST, SET_BASE_CURRENCY, FETCH_PRICE_FUILURE, FETCH_PRICE_REQUEST, FETCH_PRICE_SUCCESS, SET_EMPTY_STRING_ERROR, SET_INVALID_STRING_ERROR, SET_STRING } from "./conts"
import { TFetchRatesSuccess, TFetchRatesError, TFeatchRatesRequest, TBaseCurrency,
  TEmptyStringError,
  TInvalidStringError,
  TFetchPriceRequest,
  TFetchPriceSuccess,
  TFetchPriceError,
  TString } from "./types"

const ratesRequested = (): TFeatchRatesRequest => ({ type: FETCH_RATES_REQUEST })

const ratesLoaded = (newRates: [string, number][]): TFetchRatesSuccess => {
  return {
    type: FETCH_RATES_SUCCESS,
    payload: newRates,
  }
}

const ratesError = (error: Error): TFetchRatesError => ({
  type: FETCH_RATES_FUILURE,
  payload: error
})

const setBaseCurrency = (baseCurrency: string): TBaseCurrency => {
  return {
    type: SET_BASE_CURRENCY,
    payload: baseCurrency
  }
}

const setEmptyStringError = (): TEmptyStringError => ({ type: SET_EMPTY_STRING_ERROR })
const setInvalidStringError = (): TInvalidStringError => ({ type: SET_INVALID_STRING_ERROR })
const priceRequest = (): TFetchPriceRequest => ({ type: FETCH_PRICE_REQUEST })
const priceLoaded = (price: number): TFetchPriceSuccess => ({ type: FETCH_PRICE_SUCCESS, payload: price })
const priceError = (error: Error): TFetchPriceError => ({ type: FETCH_PRICE_FUILURE, payload: error })
const setString = (value: string): TString => ({ type: SET_STRING, payload: value })

export {
  ratesRequested,
  ratesLoaded,
  ratesError,
  setBaseCurrency,
  setEmptyStringError,
  setInvalidStringError,
  priceRequest,
  priceLoaded,
  priceError,
  setString,
}

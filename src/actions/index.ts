import { FETCH_RATES_SUCCESS, FETCH_RATES_FUILURE, FETCH_RATES_REQUEST, FETCH_PRICE_REQUEST, FETCH_PRICE_SUCCESS, FETCH_PRICE_FUILURE, SET_STRING, SET_BASE_CURRENCY } from "./conts"
import { TFetchRatesSuccess, TFetchRatesError, TFeatchRatesRequest, TFetchPriceRequest, TFetchPriceSuccess, TFetchPriceError, TString, TBaseCurrency } from "./types"

const ratesRequested = (): TFeatchRatesRequest => ({ type: FETCH_RATES_REQUEST })

const ratesLoaded = (rates: [string, number][]): TFetchRatesSuccess => {
  return {
    type: FETCH_RATES_SUCCESS,
    payload: rates,
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

const setString = (string: string, inputValid: boolean): TString => {
  return { 
    type: SET_STRING, 
    payload: {string, inputValid} 
  }
}

const priceLoaded = (price: number): TFetchPriceSuccess => {
  return { 
    type: FETCH_PRICE_SUCCESS,
    payload: price 
  }
}
const priceError = (error: Error): TFetchPriceError => {
  return { 
    type: FETCH_PRICE_FUILURE, 
    payload: error 
  }
}

const priceRequest = (): TFetchPriceRequest => ({ type: FETCH_PRICE_REQUEST })


export {
  ratesRequested,
  ratesLoaded,
  ratesError,
  setBaseCurrency,
  priceRequest,
  priceLoaded,
  priceError,
  setString,
}

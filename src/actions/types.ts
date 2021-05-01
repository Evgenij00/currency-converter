import { FETCH_RATES_SUCCESS, FETCH_RATES_FUILURE, FETCH_RATES_REQUEST, FETCH_PRICE_REQUEST, FETCH_PRICE_SUCCESS, FETCH_PRICE_FUILURE, SET_STRING, SET_BASE_CURRENCY } from "./conts"

export type TFetchRatesSuccess = {
  type: typeof FETCH_RATES_SUCCESS,
  payload: [string, number][]
}

export type TFetchRatesError = {
  type: typeof FETCH_RATES_FUILURE
  payload: Error
}

export type TFeatchRatesRequest = {
  type: typeof FETCH_RATES_REQUEST
}

export type TBaseCurrency = {
  type: typeof SET_BASE_CURRENCY
  payload: string
}

export type TFetchPriceRequest = {
  type: typeof FETCH_PRICE_REQUEST
}

export type TFetchPriceSuccess = {
  type: typeof FETCH_PRICE_SUCCESS
  payload: number
}

export type TFetchPriceError = {
  type: typeof FETCH_PRICE_FUILURE
  payload: Error
}

export type TString = {
  type: typeof SET_STRING
  payload: {string: string, inputValid: boolean}
}
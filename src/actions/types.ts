import { FETCH_RATES_SUCCESS, FETCH_RATES_FUILURE, FETCH_RATES_REQUEST, SET_BASE_CURRENCY } from "./conts"

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
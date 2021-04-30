// import { ICurrenciesService } from "../services/currencies-service"
import CurrenciesService from "../services/currencies-service"
import { FETCH_RATES_SUCCESS, FETCH_RATES_FUILURE, FETCH_RATES_REQUEST, SET_BASE_CURRENCY } from "./conts"
import { TFetchRatesSuccess, TFetchRatesError, TFeatchRatesRequest, TBaseCurrency } from "./types"

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

const fetchRates = (dispatch: any) => (baseCurrency: string): void => {
  const service = new CurrenciesService()
  dispatch(ratesRequested())
  service.getRatesByBase(baseCurrency)
    .then((rates: [string, number][]) => dispatch(ratesLoaded(rates)))
    .catch((error: Error) => dispatch(ratesError(error)))
}

export {
  ratesRequested,
  ratesLoaded,
  ratesError,
  fetchRates,
  setBaseCurrency,
}

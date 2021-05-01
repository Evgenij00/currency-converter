import { FETCH_RATES_FUILURE, FETCH_RATES_REQUEST, FETCH_RATES_SUCCESS, SET_BASE_CURRENCY } from "../actions/conts";

export type TCurrenciesReducer = {
  baseCurrency: string
  currenciesRates: [string, number][] | []
  error: Error | null
  loading: boolean
}

const updateCurrenciesRates = (state: any, action: any): TCurrenciesReducer => {

  if (state === undefined) {
    return {
      ...state,
      baseCurrency: localStorage.getItem('baseCurrency') || 'USD',
      currenciesRates: [],
      error: null,
      loading: true,
    }
  }

  switch (action.type) {
    case FETCH_RATES_REQUEST:
      return {
        ...state,
        currenciesRates: [],
        loading: true,
        error: null,
      };
    case FETCH_RATES_SUCCESS:
      return {
        ...state,
        currenciesRates: action.payload,
        loading: false,
      };
    case FETCH_RATES_FUILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case SET_BASE_CURRENCY:
      console.log(action.payload)
      return {
        ...state,
        baseCurrency: action.payload
      }

    default:
      return state;
  }
};

export default updateCurrenciesRates;
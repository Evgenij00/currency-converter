import { FETCH_PRICE_FUILURE, FETCH_PRICE_REQUEST, FETCH_PRICE_SUCCESS, SET_STRING } from "../actions/conts";

export type TConvertReducer = {
  string: string
  result: number | string
  loading: boolean
  error: Error | null
  inputValid: boolean
}

const convertCurrency = (state: any, action: any): TConvertReducer => {

  if (state === undefined) {
    return {
      ...state,
      string: "",
      result: "",
      loading: false,
      error: null,
      inputValid: false
    }
  }

  switch (action.type) {
    case FETCH_PRICE_REQUEST:
      return {
        ...state,
        result: '',
        loading: true,
        error: null,
      };
    case FETCH_PRICE_SUCCESS:
      if (!action.payload) {
        return {
          ...state,
          result: 'Извините, сейчас у нас нет данных об интересующих вас валютах.',
          loading: false,
          error: null,
        };
      } else {
        return {
          ...state,
          result: action.payload,
          loading: false,
          error: null,
        };
      }
    case FETCH_PRICE_FUILURE:
      return {
        ...state,
        result: '',
        string: "",
        error: action.payload,
        loading: false,
      };
    case SET_STRING:
      return {
        ...state,
        string: action.payload.string,
        inputValid: action.payload.inputValid
      };
    default:
      return state;
  }
};

export default convertCurrency;
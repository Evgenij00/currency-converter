import { FETCH_PRICE_FUILURE, FETCH_PRICE_REQUEST, FETCH_PRICE_SUCCESS, SET_EMPTY_STRING_ERROR, SET_INVALID_STRING_ERROR, SET_STRING } from "../actions/conts";

export type TConvertReducer = {
  string: string
  price: number | null
  errorMessage: string
  loading: boolean
  error: Error | null
}

const convertCurrency = (state: any, action: any): TConvertReducer => {

  if (state === undefined) {
    return {
      ...state,
      string: "",
      price: null,
      errorMessage: "",
      loading: false,
      error: null,
    }
  }

  switch (action.type) {
    case SET_EMPTY_STRING_ERROR:
      return {
        ...state,
        price: null,
        string: "",
        errorMessage: `Введите пожалуйста текст.`,
        loading: false,
        error: null,
      };
    case SET_INVALID_STRING_ERROR:
      return {
        ...state,
        price: null,
        string: "",
        errorMessage: `Неверный формат! Введите текст в формате: '5 eur in cad'. Регистр не имеет значения!`,
        loading: false,
        error: null,
      };
    case FETCH_PRICE_REQUEST:
      return {
        ...state,
        price: null,
        string: "",
        errorMessage: "",
        loading: true,
        error: null,
      };
    case FETCH_PRICE_SUCCESS:
      if (!action.payload) {
        return {
          ...state,
          price: null,
          errorMessage: `В данный момент у нас нет данных об интересующих вас валютах.`,
          string: "",
          loading: false,
          error: null,
        };
      } else {
        return {
          ...state,
          price: action.payload,
          string: "",
          errorMessage: "",
          loading: false,
          error: null,
        };
      }
    case FETCH_PRICE_FUILURE:
      return {
        ...state,
        price: null,
        string: "",
        errorMessage: "",
        error: action.payload,
        loading: false,
      };
    case SET_STRING:
      return {
        ...state,
        string: action.payload,
      };

    default:
      return state;
  }
};

export default convertCurrency;
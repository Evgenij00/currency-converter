import { combineReducers, createStore } from 'redux'
import { convertCurrency, updateCurrenciesRates } from './reducers'

const rootReducer = combineReducers({
  convertCurrency,
  updateCurrenciesRates
})

const store = createStore(rootReducer)

export default store

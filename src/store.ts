import { combineReducers, createStore } from 'redux'
import { convertCurrency, updateCurrenciesRates } from './reducers'


const rootReducer = combineReducers({
  convertCurrency,
  updateCurrenciesRates
})

const store = createStore(rootReducer)

store.subscribe(() => {
  console.log('Store update!', store.getState())
})

export default store

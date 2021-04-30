import { combineReducers, createStore } from 'redux'
import { updateCurrenciesRates } from './reducers'


const rootReducer = combineReducers({
  updateCurrenciesRates
})

const store = createStore(rootReducer)

store.subscribe(() => {
  console.log('Store update!', store.getState())
})

export default store
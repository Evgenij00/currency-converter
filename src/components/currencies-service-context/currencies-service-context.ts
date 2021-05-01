import React from 'react'
import CurrenciesService, { ICurrenciesService } from '../../services/currencies-service'

const {
  Provider: CurrenciesServiceProvider,
  Consumer: CurrenciesServiceConsumer
} = React.createContext<ICurrenciesService>(new CurrenciesService())

export {
  CurrenciesServiceProvider,
  CurrenciesServiceConsumer
}

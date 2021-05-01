// import React from 'react'
import { CurrenciesServiceConsumer } from '../currencies-service-context'

const withCurrenciesService = () => (Wrapped: any) => {
  return (props: any) => {
    return (
      <CurrenciesServiceConsumer>
        {(service) => {
          return <Wrapped {...props} service={service} />
        }}
      </CurrenciesServiceConsumer>
    )
  }
}

export default withCurrenciesService

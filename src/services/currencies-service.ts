import axios from "axios"

type TRates = {
  [key: string]: number
}

export interface ICurrenciesService {
  getCurrenciesNames: () => string[]
  getResource: (url: string) => Promise<any>
  getInitialRates: () => Promise<TRates>
  getRatesByBase: (newBase: string) => Promise<[string, number][]>
  getRatesByBaseRandom: (newBase: string) => Promise<[string, number][]>
  getConvertPrice: (fromName: string, toName: string, quantity: number) => Promise<number>
  loadCurrenciesName: () => Promise<void>
}

export default class CurrenciesService implements ICurrenciesService {
  
  private _currenciesNames = [
    'AUD',
    'AZN',
    'GBP',
    'AMD',
    'BYN',
    'BGN',
    'BRL',
    'HUF',
    'HKD',
    'DKK',
    'USD',
    'EUR',
    'INR',
    'KZT',
    'CAD',
    'KGS',
    'CNY',
    'MDL',
    'NOK',
    'PLN',
    'RON',
    'XDR',
    'SGD',
    'TJS',
    'TRY',
    'TMT',
    'UZS',
    'UAH',
    'CZK',
    'SEK',
    'CHF',
    'ZAR',
    'KRW',
    'JPY',
  ]

  getCurrenciesNames = (): string[] => {
    return this._currenciesNames
  }

  loadCurrenciesName = async () => {
    const currenciesNames = await this.getInitialRates()
    this._currenciesNames = Object.keys(currenciesNames)
  }

  getResource = async (url: string): Promise<any> => {
    const res = await axios.get(url)

    if (res.status !== 200) {
      throw new Error(
        `Could not fetch ${url}, received ${res.status}`
      )
    }
    return await res.data
  }

  getInitialRates = async (): Promise<TRates> => {
    const data = await this.getResource('https://www.cbr-xml-daily.ru/latest.js')
    return data.rates
  }

  getRatesByBase = async (newBase: string): Promise<[string, number][]> => {
    const rates = await this.getInitialRates()

    //Курс новой базовой валюты относительно рубля
    const newBasePrice = rates[newBase]

    const ratesArray = Object.entries(rates)

    //Необходимо обновить массив валют относительно новой базовой
    const updateRatesArray = ratesArray.map((item) => {
      item[1] /= newBasePrice
      return item
    })

    return updateRatesArray
  }

  getRatesByBaseRandom = async (newBase: string): Promise<[string, number][]> => {
    const updateRatesArray = await this.getRatesByBase(newBase)
    return this._simulateUpdateCurrenciesRates(updateRatesArray)
  }

  getConvertPrice = async (fromName: string, toName: string, quantity: number): Promise<number> => {
    const updateRatesArray = await this.getRatesByBase(fromName)
    const newRates: TRates = {}

    for (let [name, price] of updateRatesArray) {
      newRates[name] = price
    }

    return Number((newRates[toName] * quantity).toFixed(5))
  }

  private _simulateUpdateCurrenciesRates = (rates: [string, number][]): [string, number][] => {
    return rates.map((item: [string, number]) => {
      const diff = this._getRandomDifference(item[1])
      item[0] = item[0] + '/' + diff
      item[1] = +(item[1] + diff).toFixed(5)
      return item
    })
  }

  private _getRandomDifference = (price: number): number => {
    return (-0.001 + Math.random() * (0.001 + 0.001)) * price
  }
}
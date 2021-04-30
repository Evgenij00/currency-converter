import axios from "axios"

type TRates = {
  [key: string]: number
}

export interface ICurrenciesService {
  getCurrenciesNames: () => string[]
  getResource: (url: string) => Promise<any>
  getRates: () => Promise<TRates>
  getRatesByBase: (newBase: string) => Promise<any>
  getConvertPrice: (fromName: string, toName: string, quantity: number) => Promise<any>
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

  getCurrenciesNames = () => {
    return this._currenciesNames
  }

  getResource = async (url: string) => {
    const res = await axios.get(url)

    // console.log(res)

    if (res.status !== 200) {
      throw new Error(
        `Could not fetch ${url}, received ${res.status}`
      )
    }
    return await res.data
  }

  getRates = async (): Promise<TRates> => {
    const data = await this.getResource('https://www.cbr-xml-daily.ru/latest.js')

    console.log(data.rates)

    return data.rates
  }

  //получить курсы валют относительно базаовой
  getRatesByBase = async (newBase: string) => {
    //курсы относительно рубля
    const rates = await this.getRates()

    //достаем текущую цену нужной валюты относительно рубля
    const newBasePrice = rates[newBase]

    //преобразуем объект в массив
    const ratesArray = Object.entries(rates)

    //обновляем курсы всех валют относительно новой базовой: newBasePrice
    const updateRatesArray = ratesArray.map((item) => {
      item[1] /= newBasePrice
      return item
    })

    console.log(updateRatesArray)

    return updateRatesArray
  }

  getConvertPrice = async (fromName: string, toName: string, quantity: number) => {
    //получаем обновленные курсы валют
    const updateRatesArray = await this.getRatesByBase(fromName)

    const newRates: TRates = {}

    //обратно в объект
    for (let [name, price] of updateRatesArray) {
      newRates[name] = price
    }

    console.log(newRates[toName] * quantity)

    return newRates[toName] * quantity
  }
}
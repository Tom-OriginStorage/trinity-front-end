import { ITabCurrency, ITabItem } from './types'


export const tabItems: ITabItem[] = [
  {
    key: '1',
    name: 'Mint',
    order: 1,
  },
  {
    key: '2',
    name: 'Redeem',
    order: 2,
  },
]

export const listCurrency: ITabCurrency[] = [
  {
    name: 'DAI-Bond',
    apy: 4.42,
    image: 'DAI.png',
    isPermission: true,
    price: '123.21',
  },
  {
    name: 'ETH-Bond',
    apy: 3.22,
    image: 'ETH.png',
    isPermission: true,
    price: '2689.21',
  },
  {
    name: 'USDC-Bond',
    apy: 27.6,
    image: 'USDC.png',
    isPermission: false,
    price: '456.21',
  },
  {
    name: 'USDT-Bond',
    apy: 4.63,
    image: 'USDT.png',
    isPermission: false,
    price: '456.21',
  },
  {
    name: 'WBTC-Bond',
    apy: 2.71,
    image: 'WBTC.png',
    isPermission: false,
    price: '456.21',
  },
  {
    name: 'UNI-Bond',
    apy: 2.48,
    image: 'UNI.png',
    isPermission: false,
    price: '456.21',
  },
]

export const useInfoBalance = {
  balance: {
    eth: 12345.678,
    dai: 5555.666,
  },
  available: {
    eth: 88.99,
    dai: 99.88,
  }
}

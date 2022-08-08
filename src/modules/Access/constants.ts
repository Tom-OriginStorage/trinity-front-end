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
    isPermission: false,
    price: '123.21',
    contract: "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD",
    decimal: 18,
  },
  {
    name: 'ETH-Bond',
    apy: 3.22,
    image: 'ETH.png',
    isPermission: true,
    price: '2689.21',
    contract: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    decimal: 18,
  },
  {
    name: 'USDC-Bond',
    apy: 27.6,
    image: 'USDC.png',
    isPermission: false,
    price: '456.21',
    contract: "0xe22da380ee6B445bb8273C81944ADEB6E8450422",
    decimal: 6,
  },
  {
    name: 'USDT-Bond',
    apy: 4.63,
    image: 'USDT.png',
    isPermission: false,
    price: '456.21',
    contract: "0x13512979ADE267AB5100878E2e0f485B568328a4",
    decimal: 6,
  },
  {
    name: 'WBTC-Bond',
    apy: 2.71,
    image: 'WBTC.png',
    isPermission: false,
    price: '456.21',
    contract: "0x3b92f58feD223E2cB1bCe4c286BD97e42f2A12EA",
    decimal: 8,
  },
  {
    name: 'Trinity-Bond',
    apy: 2.48,
    image: 'trinitybond.png',
    isPermission: false,
    price: '456.21',
    contract: "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD",
    decimal: 18,
  },
  {
    name: 'Uni-Bond',
    apy: 2.48,
    image: 'UNI.png',
    isPermission: false,
    price: '456.21',
    contract: "0x260071C8D61DAf730758f8BD0d6370353956AE0E",
    decimal: 18,
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

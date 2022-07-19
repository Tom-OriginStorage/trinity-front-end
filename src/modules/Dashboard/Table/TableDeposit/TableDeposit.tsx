import { IColumnsProps, Table, TYPE_TABLE } from "../Table"

const depositConfig: IColumnsProps[] = [
  {
    key: '1',
    children: null,
    isHover: false,
    isSort: false,
    name: 'Asset',
    onSort: () => null,
  },
  {
    key: '2',
    children: null,
    isHover: false,
    isSort: false,
    name: 'Bond Fixed Interest',
    onSort: () => null,
  },
  {
    key: '3',
    children: null,
    isHover: false,
    isSort: false,
    name: 'Current Face Value Per Unit',
    onSort: () => null,
  },
  {
    key: '4',
    children: null,
    isHover: false,
    isSort: false,
    name: 'Your wallet balance',
    onSort: () => null,
  },
  {
    key: '5',
    children: null,
    isHover: false,
    isSort: false,
    name: 'Use as collateral',
    onSort: () => null,
  },
  {
    key: '6',
    children: null,
    isHover: false,
    isSort: false,
    name: 'Action',
    onSort: () => null,
  },
]
const rows = [
  {
    key: '1',
    asset: 'BTC-BOND',
    apy: '6.9%',
    amount: '$102.36',
    balance: '32',
    collateral: 'No',
    action: 'Delete',
  },
  {
    key: '2',
    asset: 'DAI-BOND',
    apy: '2.9%',
    amount: '$133.99',
    balance: '51',
    collateral: 'No',
    action: 'Delete',
  },
  {
    key: '3',
    asset: 'ETH-BOND',
    apy: '1.3%',
    amount: '$420.69',
    balance: '14',
    collateral: 'Yes',
    action: 'Delete',
  },
]

export const TableDeposit = () => {
  return <Table columns={depositConfig} rows={rows} name={TYPE_TABLE.DEPOSIT}/>
}

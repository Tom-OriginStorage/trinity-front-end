import { IColumnsProps, Table, TYPE_TABLE } from '../Table'

const borrowingsConfig: IColumnsProps[] = [
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
    name: 'Final Value Per Unit',
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
    name: 'Action',
    onSort: () => null,
  },
]
const rows = [
  {
    key: '1',
    asset: 'FIL-BOND',
    apy: '13.9%',
    amount: '$119.86',
    balance: '38',
    action: 'Redeem',
  },
]
export const TableBorrowings = () => {
  return <Table columns={borrowingsConfig} rows={rows} name={TYPE_TABLE.BORROW} />
}

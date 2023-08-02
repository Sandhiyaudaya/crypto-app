import { ColumnsType } from 'antd/es/table';
import { CurrencyData } from '../../../typedefs';

export const currencyColumns: ColumnsType<CurrencyData> = [
  {
    key: 'symbol',
    title: 'SYMBOL',
    dataIndex: 'symbol',
    align: 'center',
  },
  {
    key: 'high',
    title: 'HIGH',
    dataIndex: 'high',
    align: 'center',
  },
  {
    key: 'low',
    title: 'LOW',
    dataIndex: 'low',
    align: 'center',
  },
  {
    key: 'volume',
    title: 'VOLUME',
    dataIndex: 'volume',
    align: 'center',
  },
  {
    key: 'quoteVolume',
    title: 'QUOTE VOLUME',
    dataIndex: 'quoteVolume',
    align: 'center',
  },
  {
    key: 'percentChange',
    title: 'PERCENTAGE CHANGE',
    dataIndex: 'percentChange',
    align: 'center',
  },
  {
    key: 'updatedAt',
    title: 'UPDATED AT',
    dataIndex: 'updatedAt',
    align: 'center',
  },
];

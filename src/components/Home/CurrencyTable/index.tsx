import { Table, Alert, Spin } from 'antd';
import { currencyColumns } from './column';
import { CurrencyData } from '../../../typedefs';
import Styles from './CurrencyTable.module.css';

interface CurrencyTableProps {
  isError: boolean;
  isLoading: boolean;
  data?: CurrencyData[];
  error?: string;
}

export const CurrencyTable = ({
  isError,
  isLoading,
  data,
  error,
}: CurrencyTableProps) => {
  if (isError) {
    return (
      <div className={Styles.currencyTableContainer}>
        <Alert type="error" message={error} banner closable />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={Styles.spinnerContainer}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className={Styles.currencyTableContainer}>
      <Table
        dataSource={data}
        columns={currencyColumns}
        pagination={{ position: ['topRight'] }}
        scroll={{ y: 540 }}
        bordered
      />
    </div>
  );
};

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { CurrencyTable } from '../../Home';
import { MOCK_SINGLE_CURRENCY_DATA } from '../../../test-utils/mocks';

describe('CurrencyTable', () => {
  it('Displays a loader when isLoading is truthy', () => {
    const { container } = render(<CurrencyTable isLoading isError={false} />);
    const spinner = container.getElementsByClassName('ant-spin-dot-spin');
    expect(spinner.length).toBe(1);
  });

  it('Displays a error when isError is truthy', () => {
    const error = 'Something went wrong';
    const { container } = render(
      <CurrencyTable isLoading={false} isError={true} error={error} />,
    );
    const alert = container.getElementsByClassName('ant-alert-message');
    expect(alert.length).toBe(1);
  });

  it('Displays a table when no error and loading', () => {
    render(
      <CurrencyTable
        isLoading={false}
        isError={false}
        data={MOCK_SINGLE_CURRENCY_DATA}
      />,
    );
    expect(screen.queryByRole('table')).toBeInTheDocument();
  });
});

import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '../../Home';
import { navigationSpy, setSearchParamSpy } from '../../../test-utils/mocks';

describe('Header Component', () => {
  it('Renders a search box', () => {
    render(<Header />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('Updates the query param filter with the textbox value on search', async () => {
    const value = 'IND';
    render(<Header />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value } });
    const searchButton = screen.getByText('Search');
    await userEvent.click(searchButton);
    expect(setSearchParamSpy).toHaveBeenCalledWith({ filter: value });
  });

  it('Navigate to home when search is cleared', async () => {
    const value = '';
    render(<Header />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value } });
    const searchButton = screen.getByText('Search');
    await userEvent.click(searchButton);
    expect(navigationSpy.mock.calls[0][0]).toEqual('/home');
  });
});

import { vi } from 'vitest';

export const navigationSpy = vi.fn();
export const setSearchParamSpy = vi.fn();

vi.mock('react-router-dom', () => ({
  useSearchParams: () => [{ get: vi.fn() }, setSearchParamSpy],
  useNavigate: () => navigationSpy,
}));

export function createFetchResponse(
  jsonPromise = new Promise((resolve) => resolve({})),
  ok = true,
) {
  return { json: () => jsonPromise, ok };
}

export const MOCK_SINGLE_CURRENCY_DATA = [
  {
    symbol: '1ECO-BTC',
    high: '0.000008000000',
    low: '0.000005770000',
    volume: '645.60697917',
    quoteVolume: '0.00438197',
    percentChange: '-27.00',
    updatedAt: '2023-08-02T09:07:55.697Z',
  },
];

export const MOCK_CURRENCIES_DATA = [
  {
    symbol: '1ECO-BTC',
    high: '0.000008000000',
    low: '0.000005770000',
    volume: '645.60697917',
    quoteVolume: '0.00438197',
    percentChange: '-27.00',
    updatedAt: '2023-08-02T09:07:55.697Z',
  },
  {
    symbol: '3ECO-BTC',
    high: '0.000008000000',
    low: '0.000005770000',
    volume: '645.60697917',
    quoteVolume: '0.00438197',
    percentChange: '-27.00',
    updatedAt: '2023-08-02T09:07:55.697Z',
  },
];

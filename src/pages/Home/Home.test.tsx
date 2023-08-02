import { describe, it, vi } from 'vitest';
import {
  MOCK_CURRENCIES_DATA,
  createFetchResponse,
} from '../../test-utils/mocks';
import { CurrencyData } from '../../typedefs';

const getPromise = (data: CurrencyData | CurrencyData[]) =>
  new Promise((resolve) => resolve(data));

describe('HomePage integration testing', () => {
  beforeEach(() => {
    global.fetch = vi
      .fn()
      .mockResolvedValue(createFetchResponse(getPromise(MOCK_CURRENCIES_DATA)));
  });

  afterEach(() => {
    vi.resetAllMocks();
  });
  // TODO: Needs to add integration testing
  it('summary integration', () => {});
});

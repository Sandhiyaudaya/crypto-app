import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { useFetch } from './useFetch';
import { createFetchResponse } from '../test-utils/mocks';

const DEFAULT_DATA = 'Hello';
const DEFAULT_PROMISE = new Promise((resolve) => resolve(DEFAULT_DATA));

describe('useFetch', () => {
  beforeEach(() => {
    global.fetch = vi
      .fn()
      .mockResolvedValue(createFetchResponse(DEFAULT_PROMISE));
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('returns error when status is not ok', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValue(createFetchResponse(DEFAULT_PROMISE, false));
    const { result } = renderHook(() => useFetch('/user'));
    const hookData = result.current;

    await act(async () => {
      await hookData.fetchApi();
    });
    const { isError, error } = result.current;

    expect(isError).toBeTruthy();
    expect(error).toMatchSnapshot();
  });

  it('returns error when data is null', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValue(
        createFetchResponse(new Promise((resolve) => resolve(null))),
      );
    const { result } = renderHook(() => useFetch('/user'));
    const hookData = result.current;

    await act(async () => {
      await hookData.fetchApi();
    });
    const { isError, error } = result.current;

    expect(isError).toBeTruthy();
    expect(error).toMatchSnapshot();
  });

  it('returns error when promise is rejected', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValue(
        createFetchResponse(
          new Promise((_resolve, reject) => reject(new Error('API Error'))),
        ),
      );
    const { result } = renderHook(() => useFetch('/user'));
    const hookData = result.current;

    await act(async () => {
      await hookData.fetchApi();
    });
    const { isError, error } = result.current;

    expect(isError).toBeTruthy();
    expect(error).toMatchSnapshot();
  });

  it('returns data when status is ok', async () => {
    const { result } = renderHook(() => useFetch('/user'));
    const { fetchApi } = result.current;

    await act(async () => {
      await fetchApi();
    });
    const { isError, isSuccess, data } = result.current;

    expect(isError).toBeFalsy();
    expect(isSuccess).toBeTruthy();
    expect(data).toBe(DEFAULT_DATA);
  });

  it('returns loading when api is triggered', async () => {
    const { result } = renderHook(() => useFetch('/user'));
    const { fetchApi } = result.current;

    await act(async () => {
      await fetchApi();
    });
    const { isLoading, data, error } = result.current;

    void waitFor(() => {
      expect(isLoading).toBeTruthy();
      expect(data).toBeUndefined();
      expect(error).toBeUndefined();
    });
  });

  it('calls the fetch with the url passed', async () => {
    const url = 'www.myapi/v3/products';
    global.fetch = vi
      .fn()
      .mockResolvedValue(createFetchResponse(DEFAULT_PROMISE, false));
    const { result } = renderHook(() => useFetch(url));

    await act(async () => {
      await result.current.fetchApi();
    });

    expect(global.fetch).toHaveBeenCalledWith(url);
  });
});

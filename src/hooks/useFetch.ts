import { useCallback, useReducer } from 'react';

enum FetchStatus {
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  ERROR = 'ERROR',
}

interface FetchState<T> {
  data?: T;
  error?: string;
  status?: FetchStatus;
}

export interface FetchStateResult<T> extends FetchState<T> {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  fetchApi: () => Promise<void>;
}

const initalState = {
  data: undefined,
  status: undefined,
  error: undefined,
};

type Action<T> = { type: FetchStatus; payload?: T };

const reducer =
  <T>() =>
  (state: FetchState<T>, action: Action<T>): FetchState<T> => {
    switch (action.type) {
      case FetchStatus.LOADING:
        return { ...initalState, status: FetchStatus.LOADING };
      case FetchStatus.LOADED:
        return {
          ...initalState,
          status: FetchStatus.LOADED,
          data: action.payload,
        };
      case FetchStatus.ERROR:
        return {
          ...initalState,
          status: FetchStatus.ERROR,
          error: 'Something went wrong. Please try again later',
        };
      default:
        return state;
    }
  };

/*
 Example 
 const { data, error, status, fetchApi,...rest} = useFetch<User>("/users")
 const handleSubmit = async () => {
    await fetchApi();
 }
*/
export const useFetch = <T = unknown>(url: string): FetchStateResult<T> => {
  const [state, dispatch] = useReducer(reducer<T>(), initalState);
  const { status } = state;

  const fetchApi = useCallback(async () => {
    dispatch({ type: FetchStatus.LOADING });
    try {
      const response = await fetch(url);
      const responseData = (await response.json()) as T;
      if (!response.ok || !responseData) {
        throw new Error();
      }
      dispatch({ type: FetchStatus.LOADED, payload: responseData });
    } catch (e) {
      console.error(e);
      dispatch({ type: FetchStatus.ERROR });
    }
  }, [url]);

  return {
    ...state,
    isLoading: status === FetchStatus.LOADING,
    isError: status === FetchStatus.ERROR,
    isSuccess: status === FetchStatus.LOADED,
    fetchApi,
  };
};

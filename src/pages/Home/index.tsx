import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useFetch } from '../../hooks/useFetch';
import { CurrencyData } from '../../typedefs';
import { Header, CurrencyTable, Footer } from '../../components/Home';
import { footerContent } from '../../assets/cms';
import Styles from './Home.module.css';

const getUrl = (filterKey?: string | null) => {
  return filterKey
    ? `/v3/markets/${filterKey}/summary`
    : '/v3/markets/summaries';
};

const getData = (data?: CurrencyData | CurrencyData[]) => {
  if (!data) {
    return [];
  }
  return Array.isArray(data) ? data : [data];
};

function Home() {
  const [searchParams] = useSearchParams('');
  const filterPhrase = searchParams.get('filter');

  const { isLoading, isError, data, fetchApi, error } = useFetch<
    CurrencyData | CurrencyData[]
  >(getUrl(filterPhrase));

  useEffect(() => {
    void fetchApi();
  }, [fetchApi, filterPhrase]);

  return (
    <div className={Styles.home}>
      <Header />
      <CurrencyTable
        isError={isError}
        isLoading={isLoading}
        data={getData(data)}
        error={error}
      />
      <Footer footerContent={footerContent} />
    </div>
  );
}

export default Home;

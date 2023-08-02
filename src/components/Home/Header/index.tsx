import { useNavigate, useSearchParams } from 'react-router-dom';
import { Input } from 'antd';
import { useEffect, useState } from 'react';

import Styles from './Header.module.css';
import { appHeading } from '../../../assets/cms';

const { Search } = Input;

export const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams('');
  const navigate = useNavigate();
  const [query, setQuery] = useState(searchParams.get('filter') || '');

  useEffect(() => {
    if (!query) {
      navigate('/home', { replace: true });
    }
  }, [navigate, query]);

  const searchHandler = (value: string) => {
    setSearchParams({ filter: value });
  };

  return (
    <div className={Styles.header}>
      <h4>{appHeading}</h4>
      <Search
        placeholder="Search Currency"
        onSearch={searchHandler}
        allowClear
        enterButton="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

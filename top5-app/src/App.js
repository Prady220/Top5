import './App.css';
import Yelp from './util/yelp.js';
import React, { useState, useEffect } from 'react';
import BusinessView from './components/BusinessView.js';
import SearchBar from './components/SearchBar.js';
import ErrorView from './components/ErrorView';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [businesses, setBusinesses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    searchInYelp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function searchInYelp(term, location, limit) {
    try {
      setError(null);
      setLoading(true);
      const businessesList = await Yelp.searchInYelp(term, location, limit);
      if (businessesList.length > 0) {
        Promise.all(businessesList)
          .then(async values => {
            await setBusinesses(values);
            setLoading(false);
          })
          .catch(error => renderError('Promise not resolved'));
      }
    } catch (error) {
      renderError('Bad request');
    }
  }

  function renderError(error) {
    setError(error);
    setLoading(false);
  }

  let businessesElements = businesses.map((business, i) => (
    <BusinessView key={i} business={business} />
  ));

  const errors = error ? error : null;

  return (
    <div className="App">
      <header className="App-header">
        {errors && <ErrorView errors={errors} />}
        <SearchBar searchInYelp={searchInYelp} />
        {loading ? <h2>Loading...</h2> : [businessesElements]}
      </header>
    </div>
  );
}

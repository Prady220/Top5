import './App.css';
import Yelp from './util/yelp.js'
import React, { useState, useEffect } from 'react';
import BusinessView from './components/BusinessView.js';
import SearchBar from './components/SearchBar.js';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [businesses, setBusinesses] = useState([]);
  const [term, setTerm] = useState('Ice Cream');
  const [location, setLocation] = useState('Alpharetta, GA');
  const [limit, setLimit] = useState(5);
  const [error, setError] = useState(null);

  useEffect(() => {
    searchInYelp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleTermChange(e) {
    setTerm(e.target.value);
  }

  function handleLocationChange(e) {
    setLocation(e.target.value);
  }

  function handleLimitChange(e) {
    const inputLimit = parseInt(e.target.value);
    setLimit(inputLimit > 15 ? 15 : inputLimit);
  }

  async function searchInYelp() {
    try {
      setLoading(true);
      const businessesList = await Yelp.searchInYelp(term, location, limit);
      const businessesResolved = [];
      businessesList.map(async business => await business.then(value => businessesResolved.push(value)));
      setBusinesses(businessesResolved);
      setTimeout(() => {setLoading(false)}, 6000);
    } catch (error) {
      setError("Bad request");
      setLoading(false);
    }
  }

  const isLoading = (loading) ? <h2>Loading...</h2> : null;

  let businessesElements = businesses.map((business, i) => (
    <BusinessView key={i} business={business} />
  ));

  const errors = error ? error : null;

  if (errors) {
    return <h1>{errors}. Please reload!</h1>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <SearchBar searchInYelp={searchInYelp} handleLimitChange={handleLimitChange}
        handleLocationChange={handleLocationChange} handleTermChange={handleTermChange}/>
        {isLoading}
        {errors}
        <h2>Top {limit} places to get {term} in {location}</h2>
        { businessesElements }
      </header>
    </div>
  );
}

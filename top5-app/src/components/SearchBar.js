import React, { useState } from 'react';

export default function SearchBar(props) {
  const [term, setTerm] = useState('Ice Cream');
  const [location, setLocation] = useState('Alpharetta, GA');
  const [limit, setLimit] = useState(5);

  function handleTermChange(e) {
    setTerm(e.target.value);
  }

  function handleLocationChange(e) {
    setLocation(e.target.value);
  }

  function handleLimitChange(e) {
    setLimit(e.target.value);
  }

  function handleSearch(e) {
    props.searchInYelp(term, location, limit);
  }

  return (
    <div>
      <div className="searchBar">
        <div className="searchBar-fields">
          <label htmlFor="term"> Your Favourite? </label>
          <input id="term" placeholder="icecream" onChange={handleTermChange} />
          <label htmlFor="location"> Where? </label>
          <input
            id="location"
            placeholder="alpharetta, GA"
            onChange={handleLocationChange}
          />
          <label htmlFor="limit"> How Many? </label>
          <input
            id="limit"
            placeholder="5 (Max Limit 25)"
            onChange={handleLimitChange}
          />
        </div>

        <div className="searchBar-submit">
          <button onClick={handleSearch}>Let's Go</button>
        </div>
      </div>
      <h2>
        Top {limit} places to get {term} in {location}
      </h2>
    </div>
  );
}

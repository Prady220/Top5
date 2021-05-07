export default function SearchBar(props) {
  function handleTermChange(e) {
    props.handleTermChange(e);
    e.preventDefault();
  }

  function handleLocationChange(e) {
    props.handleLocationChange(e);
    e.preventDefault();
  }

  function handleLimitChange(e) {
    props.handleLimitChange(e);
    e.preventDefault();
  }

  function handleSearch(e) {
    props.searchInYelp();
    e.preventDefault();
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
    </div>
  );
}

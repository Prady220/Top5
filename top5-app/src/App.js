import './App.css';
import Yelp from './util/yelp.js'
import React, { Component } from 'react';
import BusinessView from './components/BusinessView.js';
import SearchBar from './components/SearchBar.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      businesses: [],
      term: 'Ice Cream',
      location: 'Alpharetta, GA',
      limit: 5,
      error: null
    };
    this.searchInYelp = this.searchInYelp.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
  }

  componentDidMount(){
    this.searchInYelp();
    setTimeout(() => {this.setState({loading: false})}, 6000);
  }

  handleTermChange(e) {
    this.setState({
      term: e.target.value
    });
  }

  handleLocationChange(e) {
    this.setState({
      location: e.target.value
    });
  }

  handleLimitChange(e) {
      this.setState({
        limit: parseInt(e.target.value)
      });
  }

  async searchInYelp() {
    try {
      this.setState({loading: true});
      const businessesList = await Yelp.searchInYelp(this.state.term, this.state.location, this.state.limit);
      const businessesResolved = [];
      businessesList.map(async business => await business.then(value => businessesResolved.push(value)));
      this.setState({businesses: businessesResolved});
      setTimeout(() => {this.setState({loading: false})}, 6000);
    } catch (error) {
      this.setState({ error: "Bad request" });
      this.setState({ loading: false });
    }

  }

  render() {
    const loading = (this.state.loading) ? <h2>Loading...</h2> : null;

    let businesses = this.state.businesses.map((business, i) => (
      <BusinessView key={i} business={business} />
    ));

    const errors = (this.state.error) ? this.state.error : null;

    if (errors) {
      return <h1>{errors}. Please reload!</h1>;
    }

    return (
      <div className="App">
        <header className="App-header">
          <SearchBar searchInYelp={this.searchInYelp} handleLimitChange={this.handleLimitChange}
          handleLocationChange={this.handleLocationChange} handleTermChange={this.handleTermChange}/>
          {loading}
          {errors}
          <h2>Top {this.state.limit} places to get {this.state.term} in {this.state.location}</h2>
          <div className="panel-list">{ businesses }</div>
        </header>
      </div>
    );
  };
}

export default App;

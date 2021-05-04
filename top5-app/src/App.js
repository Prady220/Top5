import './App.css';
import Yelp from './util/yelp.js'
import React, { Component } from 'react';
import BusinessView from './BusinessView.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      businesses: []
    };
    this.searchYelp = this.searchYelp.bind(this);
  }

  componentDidMount(){
    this.searchYelp();
    setTimeout(() => {this.setState({loading: false})}, 6000);
    
  }
  
  async searchYelp(term, location, sortBy) {
    try {
      const businessesList = await Yelp.searchYelp(term, location, sortBy);
      console.log(businessesList);
      const businessesResolved = [];
      businessesList.map(async business => await business.then(value => businessesResolved.push(value)));
      this.setState({businesses: businessesResolved});
    } catch (err) {
      this.setState({ loading: false });
    }

  }

  render() {
    const loading = (this.state.loading) ? <h1>Loading...</h1> : null;

    let businesses = this.state.businesses.map((business, i) => (
      <BusinessView key={i} business={business} />
    ));

    return (
      <div className="App">
        <header className="App-header">
          {loading}
          <div className="panel-list">{ businesses }</div>
        </header>
      </div>
    );
  };
}

export default App;

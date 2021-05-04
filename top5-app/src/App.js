import './App.css';
import Yelp from './util/yelp.js'
import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      businesses: []
    };
    this.searchYelp = this.searchYelp.bind(this);
  }

  searchYelp(term, location, sortBy) {
    Yelp.searchYelp(term, location, sortBy)
    .then( (businesses) => {
      this.setState({ businesses: businesses });
      console.log(this.state.businesses);
    })
  }

  render() {
    return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.searchYelp}>
          search
        </button>
      </header>
    </div>
    );
  };
}

export default App;

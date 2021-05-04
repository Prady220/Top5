import { Component } from 'react';

class SearchBar extends Component {

    constructor(props){
        super(props);

        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleLimitChange = this.handleLimitChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleTermChange(e) {
        this.props.handleTermChange(e);
        e.preventDefault();
      }
    
    handleLocationChange(e) {
        this.props.handleLocationChange(e);
        e.preventDefault();
    }

    handleLimitChange(e) {
        this.props.handleLimitChange(e);
        e.preventDefault();
    }
    
    handleSearch(e) {
        this.props.searchInYelp();
        e.preventDefault();
    }

    render() {
        return(
            <div>
                <div className="searchBar">
                    <div className="searchBar-fields">
                        <label for="term"> Your Favourite? </label>
                        <input id="term" placeholder="icecream" onChange={this.handleTermChange}/>
                        <label for="location"> Where? </label>
                        <input id="location" placeholder="alpharetta, GA" onChange={this.handleLocationChange}/>
                        <label for="limit"> How Many? </label>
                        <input id="limit" placeholder="5" onChange={this.handleLimitChange}/>
                    </div>

                    <div className="searchBar-submit">
                        <button onClick={this.handleSearch}>Let's Go</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchBar;
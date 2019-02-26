import React, { PureComponent } from 'react';
import debounce from 'lodash.debounce';
import storeProvider from './StoreProvider';

class SearchBar extends PureComponent {
    state = {
        searchQuery: ''
    };

    doSearch = debounce(() => {
        this.props.store.setSearchQuery(this.state.searchQuery);
    }, 300); 
    
    handleSearch = (event) => {
        this.setState({
            searchQuery: event.target.value
        },this.doSearch);
    }

    render() {
        return (
            <input 
                type="search"
                placeholder="Enter search query"
                value={this.state.searchQuery}
                onChange={this.handleSearch}
            />
        );
    }
}

export default storeProvider()(SearchBar);
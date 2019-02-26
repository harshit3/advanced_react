import React, { Component } from 'react';
import ArticleList from './ArticleList';
import SearchBar from './SearchBar';
import Timestamp from './Timestamp';
import pickBy from 'lodash.pickby';
import PropTypes from 'prop-types';

class App extends Component {
    static childContextTypes = {
        store: PropTypes.object
    };

    getChildContext(){
        return {
            store: this.props.store
        };
    }
    appState = () => {
        const { articles, searchQuery } = this.props.store.getState();
        return { articles, searchQuery };
    }
    state = this.appState();

    onStoreChange = () => {
        this.setState(this.appState());
    }

    componentDidMount(){
        this.subscriptionId = this.props.store.subscribe(this.onStoreChange);
        this.props.store.startClock();
    }

    componentWillUnmount(){
        this.props.store.unsubscribe(this.subscriptionId);
    }

    render() {
        let { searchQuery, articles } = this.state;
        let searchRE = new RegExp(searchQuery, 'i');
        if(searchQuery){
            articles = pickBy(articles, value => {
                return value.title.match(searchRE) || value.body.match(searchRE);
            });
        }
        return (
            <div>
                <Timestamp />
                <SearchBar />
                <ArticleList 
                    articles={articles}
                />
            </div>
        );
    }
}

export default App;
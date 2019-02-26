class StateApi{
    constructor(rawData){
        this.data = {
            articles: this.mapToObject(rawData.articles),
            authors: this.mapToObject(rawData.authors),
            searchQuery: '',
            timestamp: new Date()
        };

        this.subscriptions = {};
        this.subscriptionId = 0;
    }

    mapToObject(arr){
        return arr.reduce((acc, curr) => {
            acc[curr.id] = curr;
            return acc;
        }, {});    
    }

    getState =() => {
        return this.data;
    }

    lookUpAuthor = (authorId) => this.data.authors[authorId];

    notifySubscribers = () => {
        Object.values(this.subscriptions).forEach(cb => cb());
    }

    subscribe = (cb) => {
        this.subscriptionId += 1;
        this.subscriptions[this.subscriptionId] = cb;
        return this.subscriptionId; 
    }

    unsubscribe = (subscriptionId) => {
        delete this.subscriptions[subscriptionId];
    }

    mergeWithState = (stateChange) => {
        this.data = {
            ...this.data,
            ...stateChange
        };
        this.notifySubscribers();
    }

    setSearchQuery = (searchQuery) => {
        this.mergeWithState({
            searchQuery
        });
    }

    startClock = () => {
        setInterval(() => {
            this.mergeWithState({
                timestamp: new Date()
            });
        }, 1000);
    }
}

export default StateApi;
import React, { PureComponent } from 'react';
import storeProvider from './StoreProvider';
import PropTypes from 'prop-types';

const dateDisplay = datestring => {
    return new Date(datestring).toDateString();
};

class Article extends PureComponent {
    static propTypes = {
        article: PropTypes.shape({
            title: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            body: PropTypes.string.isRequired
        })
    };

    render() {
        const { article, author  } = this.props;
        return (
            <div style={{border:'1px solid', padding:'5px', margin:'5px'}}>
                <div>{article.title}</div>
                <div>{dateDisplay(article.date)}</div>
                <div>
                    <a href={author.website}>
                        {author.firstName} {author.lastName}
                    </a>
                </div>
                <div>{article.body}</div>
            </div>
        );
    }
}

function extraProps(store, originalProps){
    return {
        author: store.lookUpAuthor(originalProps.article.authorId)
    };
}

export default storeProvider(extraProps)(Article);
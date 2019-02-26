import React, { PureComponent } from 'react';
import Article from './Article';

class ArticleList extends PureComponent {
    render() {
        return (Object.values(this.props.articles).map(article => {
            return (
                <Article
                    key={article.id}
                    article={article}
                />
            );
        }));
    }
}

export default ArticleList;
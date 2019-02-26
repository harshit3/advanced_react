import StateApi from '../StateApi';
import { data } from '../testData.json';

const api = new StateApi(data);

describe('StateApi', () => {

    it('exposes articles array as object', () => {
        const articles = api.getState().articles;
        const articleId = data.articles[0].id;
        const articleTitle = data.articles[0].title;
        expect(articles).toHaveProperty(articleId);
        expect(articles[articleId].title).toBe(articleTitle);
    });

    it('exposes authors array as object', () => {
        const authors = api.getState().authors;
        const authorId = data.authors[0].id;
        const authorFirstName = data.authors[0].firstName;
        expect(authors).toHaveProperty(authorId);
        expect(authors[authorId].firstName).toBe(authorFirstName);
    });
});
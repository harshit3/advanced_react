import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../components/App';
import StateApi from '../StateApi';
import axios from 'axios';
import config from '../config';

const serverRender = async () => {
    const response = await axios.get(`http://${config.host}:${config.port}/data`);
    const store = new StateApi(response.data);
    return {
        initialMarkup: ReactDOMServer.renderToString(
            <App store={store} />
        ),
        initialData: response.data     
    };
};

export default serverRender;
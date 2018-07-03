import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import store from './state/store';
import '../test/enzyme-setup';

describe('<App/>', () => {
    it('renders without crashing', () => {
        ReactDOM.render(
            <Provider store={store}><App/></Provider>,
            document.createElement('root'));
    });
});

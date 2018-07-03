import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import promiseMiddleware from 'redux-promise-middleware';

// Create a history of your choosing (we're using a browser history in this case)
// export const history = createHistory();

export function configureStore(initialState) {
    // Build the middleware for intercepting and dispatching navigation actions
    //const middleware = routerMiddleware(history);
    const store = createStore(reducers, initialState, applyMiddleware(promiseMiddleware()));
    return store;
}

const store = configureStore();

export default store;

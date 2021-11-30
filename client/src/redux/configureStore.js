import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { reducer } from './reducer';
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const configureStore = () => (
    createStore(reducer, composeEnhancer(applyMiddleware(thunk, logger))
    )
);

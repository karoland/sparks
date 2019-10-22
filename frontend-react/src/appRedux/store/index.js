import {applyMiddleware, compose, createStore} from "redux";
import reducers from "../reducers/index";
import {routerMiddleware} from "react-router-redux";
//import createHistory from "history/createBrowserHistory";
import { createBrowserHistory } from 'history';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';


const history = createBrowserHistory();

const routeMiddleware = routerMiddleware(history);
const middlewares = [thunk, routeMiddleware, promiseMiddleware];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
  const store = createStore(reducers, initialState,
    composeEnhancers(applyMiddleware(...middlewares)));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/index', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
export {history};



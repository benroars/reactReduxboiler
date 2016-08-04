import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import configureStore from './store/configureStore';
import App from './containers/app/appIndex';
import Home from './containers/home/Home';
import Login from './containers/login/Login';
import NotFound from './containers/misc/NotFound';
import Todo from './containers/todo/Todo';
import Todo2 from './containers/todo2/Todo2';


import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';

import './index.css';

//const store = configureStore(loadState());
const store = configureStore();

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="login" component={Login} />
        <Route path="todo(/:filter)" component={Todo} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);

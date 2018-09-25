import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import routes from 'router.jsx';
import base from 'redux/reducer.jsx';
import registerServiceWorker from 'registerServiceWorker';
import 'global.css';

/* eslint-disable no-underscore-dangle */
const store = createStore(base,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
/* eslint-enable */

render(
  <Provider store={store}>
    <Router>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();

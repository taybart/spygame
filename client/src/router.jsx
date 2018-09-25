import React from 'react';
import { Route } from 'react-router-dom';
import App from 'main/app';

const routes = (
  <div>
    <div id="page-content-wrapper">
      <div className="container-fluid">
        <Route exact path="/" component={App} />
      </div>
    </div>
  </div>
);

export default routes;

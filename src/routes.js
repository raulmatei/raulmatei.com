import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Root from './components/root';
import Container from './components/container';

export default (
  <Route path='/' component={Root}>
    <IndexRoute component={Container}/>
    <Route path='/post/:id' component={(props) => <h1 style={{ color: 'white' }}>{props.params.id}</h1>}/>
  </Route>
);
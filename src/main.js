import frux from 'frux';
import React from 'react';
import posts from './modules/posts';
import operations from './modules/operations';
import { browserHistory } from 'react-router';
import { initializeRouter } from './router';

import './styles/application.less';

const data = require('json!./resources/posts.json');

export const { actions, getters } = frux.initialize({
  options: { debug: process.env.NODE_ENV === 'development' },

  // Load modules
  posts,
  operations
});

export function initialize(options) {
  const history = browserHistory;
  const router = initializeRouter({ history });

  actions.posts.loadPosts(data);
  frux.mount(router);
};
import frux from 'frux';

import handlers from './handlers';
import * as actions from './actions';
import * as getters from './getters';


const initialState = {
  data: []
};

const stores = {
  posts: frux.createStore(initialState, handlers)
};

export default frux.createModule({ stores, actions, getters });
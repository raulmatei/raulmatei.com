import { dispatch } from 'frux';

export function loadPosts(data) {
  dispatch({ 
    type: 'LOAD_DATA',
    payload: { data }
  });
}
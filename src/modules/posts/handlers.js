import { toImmutable } from 'nuclear-js';

function handleLoadData(currentState, payload) {
  return currentState.set('data', toImmutable(payload.data));
}

export default {
  'LOAD_DATA': handleLoadData
};
import { dispatch, batch } from 'frux';
import * as ActionTypes from './action-types';

export function sendOperator(id) {
  dispatch({ type: ActionTypes.PLAY_SONG, payload: id });
}

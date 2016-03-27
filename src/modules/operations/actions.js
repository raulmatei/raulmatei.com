import { dispatch, batch } from 'frux';
import * as ActionTypes from './action-types';

export function play(id) {
  dispatch({ type: ActionTypes.PLAY_SONG, payload: id });
}

export function pause(id) {
  dispatch({ type: ActionTypes.PAUSE_SONG, payload: id });
}

export function end(id) {
  dispatch({ type: ActionTypes.END_SONG, payload: id });
}

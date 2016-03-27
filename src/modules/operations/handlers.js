import * as ActionTypes from './action-types';

function handlePlaySong(currentState, id) {
  return currentState.withMutations(
    (state) =>
      state.set('playing', id)
        .set('paused', null)
  );
}

function handlePauseSong(currentState, id) {
  return currentState.withMutations(
    (state) =>
      state.set('paused', id)
        .set('playing', null)
  );
}

function handleEndSong(currentState, id) {
  if (currentState.get('playing') === id) {
    return currentState.set('playing', null);
  }

  return currentState;
}

export default {
  [ActionTypes.PLAY_SONG]: handlePlaySong,
  [ActionTypes.PAUSE_SONG]: handlePauseSong,
  [ActionTypes.END_SONG]: handleEndSong
};

import * as ActionTypes from './action-types';

function handlePlaySong(currentState, id) {
  const ended = currentState.get('ended');
  const isCurrentPlayingInEndedList = ended.contains(id);

  return currentState.withMutations((state) => {
    if (isCurrentPlayingInEndedList) {
      return state.set('ended', ended.remove(id))
        .set('playing', id);
    }

    return state.set('playing', id);
  });
}

function handlePauseSong(currentState, id) {
  return currentState.withMutations(
    (state) =>
      state.set('paused', id)
        .set('playing', null)
  );
}

function handleEndSong(currentState, id) {
  const ended = currentState.get('ended');

  return currentState.withMutations((state) =>
    state.set('playing', null)
      .set('ended', ended.add(id)));
}

export default {
  [ActionTypes.PLAY_SONG]: handlePlaySong,
  [ActionTypes.PAUSE_SONG]: handlePauseSong,
  [ActionTypes.END_SONG]: handleEndSong
};

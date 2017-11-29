import * as ActionTypes from './action-types'

export function play(id) {
  return {
    type: ActionTypes.PLAY_SONG,
    payload: {id},
  }
}

export function pause(id) {
  return {
    type: ActionTypes.PAUSE_SONG,
    payload: {id},
  }
}

export function end(id) {
  return {
    type: ActionTypes.END_SONG,
    payload: {id},
  }
}

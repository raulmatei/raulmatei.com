import * as ActionTypes from './action-types'
import {
  handlePlaySong,
  handlePauseSong,
  handleEndSong,
} from './handlers'

const initialState = {
  playing: null,
  ended: [],
}

export default function operations(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.PLAY_SONG: {
      return handlePlaySong(state, action.payload)
    }

    case ActionTypes.PAUSE_SONG: {
      return handlePauseSong(state, action.payload)
    }

    case ActionTypes.END_SONG: {
      return handleEndSong(state, action.payload)
    }

    default: {
      return state
    }
  }
}
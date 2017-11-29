export function handlePlaySong(state, payload) {
  const {id} = payload
  const ended = [...state.ended]
  const index = ended.indexOf(id)

  if (index > -1) {
    return {
      ...state,
      ended: ended.splice(index, 1),
      playing: id,
    }
  }

  return {
    ...state,
    playing: id,
  }
}

export function handlePauseSong(state, payload) {
  const {id} = payload

  return {
    ...state,
    paused: id,
    playing: null,
  }
}

export function handleEndSong(state, payload) {
  const {id} = payload
  const ended = [...state.ended]

  return {
    ...state,
    playing: null,
    ended: ended.push(id),
  }
}

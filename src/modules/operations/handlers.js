export function handlePlaySong(state, payload) {
  const {id} = payload
  const ended = [...state.ended]
  const paused = [...state.paused]
  const endedIndex = ended.indexOf(id)
  const pausedIndex = paused.indexOf(id)

  if (endedIndex > -1) {
    ended.splice(endedIndex, 1)
  }

  if (pausedIndex > -1) {
    paused.splice(pausedIndex, 1)
  }

  return {
    ...state,
    ended,
    playing: id,
  }
}

export function handlePauseSong(state, payload) {
  const {id} = payload
  const paused = [...state.paused]

  paused.push(id)

  return {
    ...state,
    paused,
    playing: null,
  }
}

export function handleEndSong(state, payload) {
  const {id} = payload
  const ended = [...state.ended]
  const paused = [...state.paused]
  const pausedIndex = paused.indexOf(id)

  ended.push(id)

  if (pausedIndex > -1) {
    paused.splice(pausedIndex, 1)
  }

  return {
    ...state,
    ended,
    paused,
    playing: null,
  }
}

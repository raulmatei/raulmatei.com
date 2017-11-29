const initialState = {
  data: []
}

export default function posts(state = initialState, action) {
  console.log(action);
  const data = action.payload

  return {
    ...state,
    data,
  }
}
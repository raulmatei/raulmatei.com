export function loadPosts(data) {
  return {
    type: 'LOAD_DATA',
    payload: data,
  }
}
export default function isLoggedIn(state) {
  return state.user && Object.keys(state.user).length > 0;
}

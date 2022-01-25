import request, { setUser, destroyToken } from 'utilities/request';
import checkPermission from 'utilities/checkPermission';
import isLoggedIn from 'utilities/isLoggedIn';

export default async function checkLogin({
  state,
  dispatch,
  actions,
  history,
  permission,
  expectLoggedIn,
  isClient,
}) {
  // if login status is already as expected
  if (isLoggedIn(state) === expectLoggedIn) {
    checkPermission({ state, history, permission });
    return true;
  }

  // otherwise, see if token is valid and redirect if necessary
  try {
    const result = await request('get', '/auth/user-info', {});
    console.log(result);
    // token still valid
    if (result.data && result.data === 'OK') {
      // if we did not expect to be logged in, redirect
      if (!expectLoggedIn) {
        history.push('/dashboard');
      }
    } else {
      throw new Error('No user data returned.');
    }
  } catch (error) {
    console.log(error);
    // token no longer valid
    dispatch({ type: actions.SET_USER, payload: {} });
    if (expectLoggedIn) {
      destroyToken();
      history.push('/login', 'Session has expired, please log in again.');
    }
  }

  return false;
}

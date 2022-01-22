import request, { setUser, destroyToken } from 'ui/utilities/request';
import checkPermission from 'ui/utilities/checkPermission';
import isLoggedIn from 'ui/utilities/isLoggedIn';

export default async function checkLogin({
  state,
  dispatch,
  actions,
  history,
  permission,
  expectLoggedIn, // false if we are on /login or /mfa, true otherwise
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

    // token still valid
    if (result.data && result.data.user) {
      dispatch({ type: actions.SET_USER, payload: result.data.user });
      setUser(result.data.user);

      // if we did not expect to be logged in, redirect
      if (!expectLoggedIn) {
        if (isClient || state.workspace?._id) {
          history.push('/dashboard');
        } else {
          history.push('/workspaces');
        }
      }
    } else {
      throw new Error('No user data returned.');
    }
  } catch (error) {
    console.log(error)
    // token no longer valid
    dispatch({ type: actions.SET_USER, payload: {} });
    if (expectLoggedIn) {
      destroyToken();
      history.push('/login', 'Session has expired, please log in again.');
    }
  }

  return false;
}

import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { GlobalStateContext } from 'context/GlobalContext';
import actions from 'context/actions/globalActions';
import request from 'ui/utilities/request';
import checkLogin from 'ui/utilities/checkLogin';
import { LoginForm } from 'containers/Login';

export default function Login() {
  const { dispatch, state } = React.useContext(GlobalStateContext);
  const history = useHistory();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = React.useState(location.state);
  const [showErrorMessage, setShowErrorMessage] = React.useState(true);

  React.useEffect(() => {
    checkLogin({
      state,
      dispatch,
      actions,
      history,
      expectLoggedIn: false,
    });
  }, [dispatch, history, state]);

  async function login({
    username,
    password,
  }) {
    dispatch({ type: actions.SET_LOADING, payload: true });
    setShowErrorMessage(false);
    try {
      const result = await request('post', '/auth/login', { username, password });
      if (!result.data || !result.data.requestId) {
        throw new Error(result);
      }

      dispatch({ type: actions.SET_LOADING, payload: false });
      history.push(`/mfa/${result.data.requestId}${result.data.mfaToken ? `?mfatoken=${result.data.mfaToken}` : ''}`);
    } catch (error) {
      setErrorMessage('Invalid username or password supplied');
      setShowErrorMessage(true);
      dispatch({ type: actions.SET_LOADING, payload: false });
    }
  }

  return (
    <LoginForm
      onSubmit={login}
      errorMessage={errorMessage}
      showErrorMessage={showErrorMessage}
      setShowErrorMessage={setShowErrorMessage}
    />
  );
}

import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { GlobalStateContext } from 'context/GlobalContext';
import actions from 'context/actions/globalActions';
import request, { setToken } from 'utilities/request';
import checkLogin from 'utilities/checkLogin';
import LoginForm from 'containers/Login';

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

  async function login({ symbol }) {
    dispatch({ type: actions.SET_LOADING, payload: true });
    setShowErrorMessage(false);
    try {
      const result = await request('post', '/auth/login', {
        symbol,
      });
      if (!result.data) {
        throw new Error(result);
      }
      console.log('login', result.data);
      dispatch({ type: actions.SET_LOADING, payload: false });
      dispatch({ type: actions.SET_USER, payload: symbol });
      dispatch({ type: actions.SET_TOKEN, payload: result.data });
      setToken(result.data, symbol);
      history.push('/dashboard');
    } catch (error) {
      setErrorMessage(
        'Invalid symbol or did not have positive change. Only we know which of those two.',
      );
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

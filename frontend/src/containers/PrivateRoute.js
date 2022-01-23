import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { GlobalStateContext } from 'context/GlobalContext';
import actions from 'context/actions/globalActions';
import checkLogin from 'utilities/checkLogin';

export default function PrivateRoute({ children, permission, ...rest }) {
  const { state, dispatch } = React.useContext(GlobalStateContext);
  const history = useHistory();

  React.useEffect(() => {
    checkLogin({
      state,
      dispatch,
      actions,
      history,
      permission,
      expectLoggedIn: true,
    });
  }, [dispatch, history, state, permission]);

  return <Route {...rest}>{children}</Route>;
}

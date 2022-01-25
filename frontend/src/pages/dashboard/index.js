import React from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { destroyToken } from 'utilities/request';
import { GlobalStateContext } from 'context/GlobalContext';
import actions from 'context/actions/globalActions';
import Icon from 'components/Icon';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const { state, dispatch } = React.useContext(GlobalStateContext);
  const history = useHistory();

  const showDepth = (orders) =>
    orders.map((o) => (
      <div>
        <div>{o[0]}</div>
        <div>{o[1]}</div>
      </div>
    ));

  const logOut = () => {
    dispatch({ type: actions.SET_USER, payload: {} });
    dispatch({ type: actions.SET_TOKEN, payload: '' });
    dispatch({ type: actions.SET_WORKSPACE, payload: {} });
    destroyToken();
    history.push('/login', 'Session has expired, please log in again.');
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.topBar}>
        <div>{state.selectedSymbol}</div>
        <div onClick={() => logOut()} role="presentation">
          Logout <Icon type="sign-out-alt" />
        </div>
      </div>
      <div className={styles.prices}></div>
      <div>
        <div>{showDepth(state.depth.bid)}</div>
        <div>{showDepth(state.depth.ask)}</div>
      </div>
    </div>
  );
}

import React, { useEffect } from 'react';
import clsx from 'clsx';
import Cookies from 'universal-cookie';
import actions from 'context/actions/globalActions';
import { GlobalStateContext } from 'context/GlobalContext';
import { NotificationsContext } from 'context/NotificationsContext';
import Socket from 'services/socket';
import Loader from 'components/Loader';
import Sidebar from 'containers/Sidebar';
import styles from './Layout.module.css';

const cookies = new Cookies();

export default function Layout({ children }) {
  const { state, dispatch } = React.useContext(GlobalStateContext);
  const { addNotification } = React.useContext(NotificationsContext);

  useEffect(() => {
    const token = cookies.get('authorization');
    Socket.emit('identify', { token });
    Socket.on('notification', (text) => {
      addNotification({ text });
    });
    Socket.on('prices', (prices) => {
      dispatch({ type: actions.APPEND_PRICES, payload: prices });
    });
    Socket.on('depth', (depth) => {
      dispatch({ type: actions.SET_DEPTH, payload: depth });
    });
  }, []);

  function isLoggedIn() {
    return state.user && Object.keys(state.user).length > 0;
  }

  return (
    <div
      className={clsx(styles.pageWrapper, !isLoggedIn() && styles.notLoggedIn)}
    >
      {isLoggedIn() ? (
        <>
          <div className={styles.layoutWrapper}>
            <Sidebar />
            <div
              className={clsx({
                [styles.contentWrapper]: true,
                [styles.expanded]: state.isMenuExpanded,
              })}
            >
              {children}
              <Loader isLoading={state.isLoading} size="large" />
            </div>
          </div>
        </>
      ) : (
        <>
          {children}
          <Loader isLoading={state.isLoading} size="large" />
        </>
      )}
    </div>
  );
}

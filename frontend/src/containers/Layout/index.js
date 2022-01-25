import React, { useEffect } from 'react';
import clsx from 'clsx';
import actions from 'context/actions/globalActions';
import { GlobalStateContext } from 'context/GlobalContext';
import { NotificationsContext } from 'context/NotificationsContext';
import Socket from 'services/socket';
import Loader from 'components/Loader';
import Sidebar from 'containers/Sidebar';
import styles from './Layout.module.css';

export default function Layout({ children }) {
  const { state, dispatch } = React.useContext(GlobalStateContext);
  const { addNotification } = React.useContext(NotificationsContext);

  useEffect(() => {
    Socket.addEventListener('message', (event) => {
      if (!event.data) {
        return;
      }
      try {
        const message = JSON.parse(event.data);
        if (message.event === 'symbols') {
          dispatch({ type: actions.SET_SYMBOLS, payload: message.data });
        } else if (message.event === 'prices') {
          dispatch({ type: actions.APPEND_PRICES, payload: message.data });
        } else if (message.event === 'depth') {
          dispatch({ type: actions.SET_DEPTH, payload: message.data });
        } else if (message.event === 'notification') {
          addNotification({ text: message.data });
        }
      } catch (err) {
        console.error(err);
      }
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
            <div className={styles.contentWrapper}>
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

import React, { useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';
import { GlobalStateContext } from 'context/GlobalContext';
import { NotificationsContext } from 'context/NotificationsContext';
import Socket from 'ui/services/socket';
import Loader from 'ui/components/Loader';
import Header from 'containers/Header';
import Sidebar from 'containers/Sidebar';
import Footer from 'ui/components/Footer';
import clsx from 'clsx';
import actions from 'context/actions/globalActions';
import pageTitles from './pageTitles';
import styles from './Layout.module.css';

const cookies = new Cookies();

export default function Layout({ children }) {
  const { state, dispatch } = React.useContext(GlobalStateContext);
  const { addNotification } = React.useContext(NotificationsContext);
  const history = useHistory();
  const [pageTitle, setPageTitle] = React.useState('');
  const [page, setPage] = React.useState('');

  useEffect(() => {
    const token = cookies.get('authorization');
    Socket.emit('identify', { token, workspace: state.workspace._id });
    Socket.on('alert', () => {
      dispatch({ type: actions.APPEND_ALERT });
    });
    Socket.on('notification', () => {
      dispatch({ type: actions.APPEND_NOTIFICATION });
    });
  }, []);

  function getBasePath(pathname) {
    const parts = pathname.split('/');
    return parts[1] || '/';
  }

  function getPageTitle(basePath) {
    return pageTitles[basePath] || (basePath.charAt(0).toUpperCase() + basePath.slice(1).replace('-', ' '));
  }

  function isLoggedIn() {
    return state.user && Object.keys(state.user).length > 0;
  }

  React.useEffect(() => {
    function handlePageChange(pathname) {
      const basePath = getBasePath(pathname);
      const title = getPageTitle(basePath);
      document.title = title;
      setPage(basePath);
      setPageTitle(title);
    }

    handlePageChange(history.location.pathname);
    history.listen(({ pathname }) => {
      handlePageChange(pathname);
    });
  }, [history, state.user.theme]);

  return (
    <div className={clsx(styles.pageWrapper, !isLoggedIn() && styles.notLoggedIn)}>
      <link id="theme" rel="stylesheet" type="text/css" href={`${process.env.PUBLIC_URL}/themes/${state.user.theme || 'blue-light'}.css`} />
      {isLoggedIn()
        ? (
          <>
            <Header pageTitle={pageTitle} />
            <div className={styles.layoutWrapper}>
              <Sidebar page={page} />
              <div className={clsx({
                [styles.contentWrapper]: true,
                [styles.expanded]: state.isMenuExpanded,
              })}
              >
                {children}
                <Loader isLoading={state.isLoading} size="large" />
              </div>
            </div>
            <Footer />
          </>
        )
        : (
          <>
            {children}
            <Loader isLoading={state.isLoading} size="large" />
          </>
        )}
    </div>
  );
}

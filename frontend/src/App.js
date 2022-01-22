import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from 'containers/PrivateRoute';
import PageLayout from 'containers/Layout';
import LoginPage from 'pages/login';
import HomePage from 'pages/home';
import {
  INITIAL_STATE,
  GlobalStateContext,
  globalReducer,
} from 'context/GlobalContext';
import { NotificationsProvider } from 'context/NotificationsContext';
import 'assets/fonts/roboto.css';
import 'assets/fonts/custom-icons.css';
import 'assets/fonts/fontawesome.all.min.css';

function App() {
  const [globalState, dispatchToGlobal] = React.useReducer(
    globalReducer,
    INITIAL_STATE,
  );

  return (
    <GlobalStateContext.Provider
      value={{ state: globalState, dispatch: dispatchToGlobal }}
    >
      <NotificationsProvider>
        <PageLayout>
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <PrivateRoute path="/dashboard">
              <HomePage />
            </PrivateRoute>
          </Switch>
        </PageLayout>
      </NotificationsProvider>
    </GlobalStateContext.Provider>
  );
}

export default App;

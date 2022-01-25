import React from 'react';
import notificationsActions from 'context/actions/notificationsActions';
import Alert from 'components/Alert';
import Snackbar from 'components/Snackbar';

export const NotificationsContext = React.createContext({
  state: [],
  dispatch: () => {},
  addNotification: () => {},
});

export const notificationsReducer = (state, action) => {
  const { type } = action;
  switch (type) {
    case notificationsActions.ADD:
      return [action.payload, ...state];
    case notificationsActions.REMOVE:
      return [...state].filter(
        (notification) => notification.key !== action.payload.key,
      );
    default:
      return state;
  }
};

export function NotificationsProvider({ children }) {
  const [state, dispatch] = React.useReducer(notificationsReducer, []);

  const expireNotification = React.useCallback((key) => {
    dispatch({ type: notificationsActions.REMOVE, payload: { key } });
  }, []);

  const addNotification = React.useCallback(
    ({ type, text, timeout = 10 }) => {
      const key = Date.now();
      dispatch({
        type: notificationsActions.ADD,
        payload: { key, type, text },
      });
      setTimeout(() => expireNotification(key), timeout * 1000);
    },
    [expireNotification],
  );

  return (
    <NotificationsContext.Provider value={{ addNotification }}>
      {children}
      <Snackbar show>
        {state.map((notification) => (
          <Alert
            variant={notification.type}
            key={notification.key}
            close={() =>
              dispatch({
                type: notificationsActions.REMOVE,
                payload: { key: notification.key },
              })
            }
          >
            {notification.text}
          </Alert>
        ))}
      </Snackbar>
    </NotificationsContext.Provider>
  );
}

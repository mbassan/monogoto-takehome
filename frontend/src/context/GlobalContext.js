import { createContext } from 'react';
import getFromLocalStorage from 'ui/utilities/getFromLocalStorage';
import globalActions from './actions/globalActions';

export const INITIAL_STATE = {
  user: getFromLocalStorage('user', true) || {},
  workspace: getFromLocalStorage('workspace', true) || {},
  isLoading: false,
  isMenuExpanded: getFromLocalStorage('isMenuExpanded', true) || false,
  unseenAlerts: 0,
  unseenNotifications: 0,
};

export const GlobalStateContext = createContext({ state: INITIAL_STATE, dispatch: () => { } });

const setWorkspaceHelper = (state, action) => {
  localStorage.setItem('workspace', JSON.stringify(action.payload));
  return { ...state, workspace: action.payload };
};

const setMenuExpanded = (state, action) => {
  localStorage.setItem('isMenuExpanded', JSON.stringify(action.payload));
  return { ...state, isMenuExpanded: action.payload };
};

const setUserHelper = (state, action) => {
  localStorage.setItem('user', JSON.stringify(action.payload));
  return { ...state, user: action.payload };
};

const setTokenHelper = (state, action) => {
  localStorage.setItem('token', JSON.stringify(action.payload));
  return { ...state, token: action.payload };
};

const setUserThemeHelper = (state, action) => {
  localStorage.setItem('user', JSON.stringify({ ...state.user, theme: action.payload }));
  return { ...state, user: { ...state.user, theme: action.payload } };
};

export const appendNotification = (state) => {
  const currentNum = state.unseenNotifications + 1;
  localStorage.setItem('user', JSON.stringify({ ...state.user, unseenNotifications: currentNum }));
  return { ...state, unseenNotifications: currentNum };
};

export const appendAlert = (state) => {
  const currentNum = state.unseenAlerts + 1;
  localStorage.setItem('user', JSON.stringify({ ...state.user, unseenAlerts: currentNum }));
  return { ...state, unseenAlerts: currentNum };
};

const resetNotifications = (state, action) => {
  const unseenNotifications = action.payload || 0;
  localStorage.setItem('user', JSON.stringify({ ...state.user, unseenNotifications }));
  return { ...state, unseenNotifications };
};

const resetAlerts = (state, action) => {
  const unseenAlerts = action.payload || 0;
  localStorage.setItem('user', JSON.stringify({ ...state.user, unseenAlerts }));
  return { ...state, unseenAlerts };
};

export const globalReducer = (state, action) => {
  const { type } = action;
  switch (type) {
    case globalActions.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case globalActions.SET_MENU_EXPANDED:
      return setMenuExpanded(state, action);
    case globalActions.SET_USER:
      return setUserHelper(state, action);
    case globalActions.SET_TOKEN:
      return setTokenHelper(state, action);
    case globalActions.SET_USER_THEME:
      return setUserThemeHelper(state, action);
    case globalActions.SET_WORKSPACE:
      return setWorkspaceHelper(state, action);
    case globalActions.APPEND_NOTIFICATION:
      return appendNotification(state);
    case globalActions.APPEND_ALERT:
      return appendAlert(state);
    case globalActions.RESET_NOTIFICATIONS:
      return resetNotifications(state, action);
    case globalActions.RESET_ALERTS:
      return resetAlerts(state, action);
    default:
      return state;
  }
};

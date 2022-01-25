import { createContext } from 'react';
import moment from 'moment';
import getFromLocalStorage from 'utilities/getFromLocalStorage';
import globalActions from './actions/globalActions';

export const INITIAL_STATE = {
  user: getFromLocalStorage('user', true) || {},
  symbols: getFromLocalStorage('symbols', true) || [],
  selectedSymbol: getFromLocalStorage('selectedSymbol', true) || 'BTCUSDT',
  prices: getFromLocalStorage('prices', true) || [],
  depth: getFromLocalStorage('depth', true) || { bid: [], ask: [] },
  isLoading: false,
};

export const GlobalStateContext = createContext({
  state: INITIAL_STATE,
  dispatch: () => {},
});

const setUserHelper = (state, action) => {
  localStorage.setItem('user', JSON.stringify(action.payload));
  return { ...state, user: action.payload };
};

const setSymbolsHelper = (state, action) => {
  localStorage.setItem('symbols', JSON.stringify(action.payload));
  return { ...state, symbols: action.payload };
};

const appendPricesHelper = (state, action) => {
  const startTime = moment().valueOf() - 30 * 60 * 1000;
  const prevPrices = state.prices.filter((p) => p.t >= startTime);
  const prices = [
    ...prevPrices,
    { t: action.payload.E, v: parseFloat(action.payload.p) },
  ];
  localStorage.setItem('prices', JSON.stringify(prices));
  return { ...state, prices };
};

export const globalReducer = (state, action) => {
  const { type } = action;
  switch (type) {
    case globalActions.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case globalActions.SET_SELECTED_SYMBOL:
      return { ...state, selectedSymbol: action.payload };
    case globalActions.SET_USER:
      return setUserHelper(state, action);
    case globalActions.SET_SYMBOLS:
      return setSymbolsHelper(state, action);
    case globalActions.APPEND_PRICES:
      return appendPricesHelper(state, action);
    case globalActions.SET_DEPTH:
      return { ...state, depth: action.payload };
    default:
      return state;
  }
};

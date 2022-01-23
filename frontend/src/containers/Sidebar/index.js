import React from 'react';
import clsx from 'clsx';
import Icon from 'components/Icon';
import { GlobalStateContext } from 'context/GlobalContext';
import actions from 'context/actions/globalActions';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const { state, dispatch } = React.useContext(GlobalStateContext);

  const determineColor = (change) => {
    if (!change || change === 0) {
      return '';
    }
    return change > 0 ? 'up' : 'down';
  };

  const determineIcon = (change) => {
    if (!change || change === 0) {
      return 'minus-square';
    }
    return change > 0 ? 'chevron-up' : 'chevron-down';
  };

  const selectSymbol = (symbol) => {
    dispatch({ type: actions.SET_SELECTED_SYMBOL, payload: symbol });
  };

  return (
    <div className={styles.sidebar}>
      {state.symbols.map((symbol) => (
        <div
          className={clsx(
            symbol.symbol === state.selectSymbol && styles.selected,
          )}
          onClick={() => selectSymbol(symbol.symbol)}
          role="presentation"
        >
          <div>{symbol.symbol}</div>
          <div>{symbol.lastPrice}</div>
          <div
            className={`styles.change-${determineColor(
              symbol.priceChangePercent,
            )}`}
          >
            {symbol.priceChangePercent}
          </div>
          <div>
            <Icon
              className={styles.ic}
              type={determineIcon(symbol.priceChangePercent)}
              variant="secondary"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

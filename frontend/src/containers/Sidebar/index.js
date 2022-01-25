import React from 'react';
import clsx from 'clsx';
import TextInput from 'components/TextInput';
import { GlobalStateContext } from 'context/GlobalContext';
import actions from 'context/actions/globalActions';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const [search, setSearch] = React.useState('');
  const { state, dispatch } = React.useContext(GlobalStateContext);

  const determineColor = (change) => {
    if (!change || change === 0) {
      return '';
    }
    return change > 0 ? 'up' : 'down';
  };

  const selectSymbol = (symbol) => {
    dispatch({ type: actions.SET_SELECTED_SYMBOL, payload: symbol });
  };

  const mapSymbols = () =>
    state.symbols
      .filter((symbol) => symbol.symbol.indexOf(search) >= 0)
      .map((symbol) => (
        <div
          key={symbol.symbol}
          className={clsx(
            styles.item,
            symbol.symbol === state.selectSymbol && styles.selected,
          )}
          onClick={() => selectSymbol(symbol.symbol)}
          role="presentation"
        >
          <div>{symbol.symbol}</div>
          <div>{symbol.lastPrice}</div>
          <div
            className={
              styles[`change-${determineColor(symbol.priceChangePercent)}`]
            }
          >
            {Math.abs(symbol.priceChangePercent)}
          </div>
        </div>
      ));

  return (
    <div className={styles.sidebar}>
      <div className={styles.search}>
        <TextInput
          placeholder="Search symbol..."
          value={search}
          onChange={(e) => setSearch(e.target.value.toUpperCase())}
          size="medium"
          display="block"
          variant="search"
        />
      </div>
      {mapSymbols()}
      {state.symbols.length === 0 && (
        <div className={styles.empty}>Loading symbols...</div>
      )}
    </div>
  );
}

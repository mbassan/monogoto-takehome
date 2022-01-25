import React from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { destroyToken } from 'utilities/request';
import { GlobalStateContext } from 'context/GlobalContext';
import actions from 'context/actions/globalActions';
import Icon from 'components/Icon';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const { state, dispatch } = React.useContext(GlobalStateContext);
  const history = useHistory();

  const showDepth = (orders) => {
    if (!orders || orders.length === 0) {
      return <div>Loading orders...</div>;
    }
    return orders.map((o) => (
      <div>
        <div>{o[0]}</div>
        <div>{o[1]}</div>
      </div>
    ));
  };

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
      <div className={styles.prices}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={state.prices}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="t"
              tickFormatter={(timeStr) => moment(timeStr).format('HH:mm')}
              name="Date"
              domain={[
                moment().subtract(30, 'minutes').valueOf(),
                moment().valueOf(),
              ]}
            />
            <YAxis dataKey="v" name="Value" />
            <Tooltip />
            <Area type="monotone" dataKey="v" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.orderBook}>
        <div>{showDepth(state.depth.bid)}</div>
        <div>{showDepth(state.depth.ask)}</div>
      </div>
    </div>
  );
}

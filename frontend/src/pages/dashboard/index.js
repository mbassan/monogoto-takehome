import React from 'react';
import moment from 'moment';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { GlobalStateContext } from 'context/GlobalContext';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const { state } = React.useContext(GlobalStateContext);

  const showDepth = (orders) =>
    orders.map((o) => (
      <div>
        <div>{o[0]}</div>
        <div>{o[1]}</div>
      </div>
    ));

  return (
    <>
      <div className={styles.prices}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
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
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div>
        <div>{showDepth(state.depth.bid)}</div>
        <div>{showDepth(state.depth.ask)}</div>
      </div>
    </>
  );
}

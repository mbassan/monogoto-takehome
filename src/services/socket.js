const SERVER_URL =
  process.env.REACT_APP_SOCKET_URL || 'ws://localhost:1880/ws/publishMessage';

const socket = new WebSocket(SERVER_URL);

export default socket;

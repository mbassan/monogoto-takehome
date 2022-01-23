import io from 'socket.io-client';

const SERVER_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:4000';

const socket = io(SERVER_URL);

export default socket;

import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

let opts = {
  apiUrl: '',
  headers: null,
};

export const setOptions = (newOpts) => {
  opts = { ...opts, ...newOpts };
};

export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const destroyUser = () => {
  localStorage.removeItem('user');
};

export const setToken = (token, user, isClient) => {
  setUser(user, isClient);
  opts.headers = {
    authorization: token,
  };
  cookies.set('authorization', token, {
    path: '/',
    /*httpOnly: true,*/
  });
};

export const destroyToken = (isClient) => {
  destroyUser(isClient);
  cookies.remove('authorization');
};

function expiredSession(response) {
  if (response && response.status === 401) {
    destroyToken();
    window.location = `${window.location.protocol}//${window.location.host}/#/login`;
  }
}

function setHeaders(file) {
  if (!opts.headers || !opts.headers.authorization) {
    const token = cookies.get('authorization');
    opts.headers = {};
    opts.headers.authorization = token;
  }
  if (file) {
    opts.headers['Content-Type'] = 'multipart/form-data';
  }
}

function setData(method, dataObj, file) {
  let params = {};
  let data = {};
  if (method.toLowerCase() === 'get') {
    params = dataObj;
  } else if (typeof file === 'object') {
    const formData = new FormData();
    Object.keys(dataObj).forEach((key) => {
      formData.append(key, JSON.stringify(dataObj[key]));
    });
    formData.append('file', file);
    data = formData;
  } else {
    data = dataObj;
  }
  return { params, data };
}

export default async function request(method, endpoint, dataObj, file) {
  setHeaders(file);
  const { params, data } = setData(method, dataObj, file);
  const response = await axios({
    method,
    url: `${opts.apiUrl}${endpoint}`,
    data,
    params,
    // headers: opts.headers,
    withCredentials: true,
    secure: !!opts.apiUrl,
  }).catch((error) => {
    expiredSession(error.response);
    throw error.response || error;
  });
  expiredSession(response);
  return response;
}

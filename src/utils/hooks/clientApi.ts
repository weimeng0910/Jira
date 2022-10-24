//import axios from 'axios';

//import { API_KEY, lang, API_URL, AUTH_URL } from '../config';
//import * as authJira from './authJiraProvider';

//// use 'sleep' to simulate long calls to an api
//// const sleep = t => new Promise(resolve => setTimeout(resolve, t))

//const clientApi = async (endpoint:string )=> {
//  const page = 1;
//  const startChar = endpoint.includes('?') ? '&' : '?';
//  const keyLang = `${startChar}api_key=${API_KEY}&language=${lang}&page=${page}`;

//  return axios.get(`${API_URL}/${endpoint}${keyLang}`).catch(error => {
//    if (error.response) {
//      const err = {
//        ...error.response,
//        message: error.response?.data?.status_message,
//      };
//      throw err;
//    }
//    throw error;

//  });
//};

//const clientAuth = async (endpoint, { token, data } = {}) => {
//  const config = {
//    headers: {
//      Authorization: token ? `Bearer ${token}` : undefined,
//      'Content-Type': data ? 'application/json' : undefined,
//    },
//  };

//  return data
//    ? axios.post(`${AUTH_URL}/${endpoint}`, JSON.stringify(data), config)
//    : axios.get(`${AUTH_URL}/${endpoint}`, config);
//};

//const clientNetFlix = async (endpoint, { token, data, method = 'GET' } = {}) => {
//  const config = {
//    method,
//    url: `${AUTH_URL}/${endpoint}`,
//    data: JSON.stringify(data),
//    headers: {
//      Authorization: token ? `Bearer ${token}` : undefined,
//      'Content-Type': data ? 'application/json' : undefined,
//    },
//  };

//  return axios(config)
//    .then(response => response.data)
//    .catch(error => {
//      if (error?.response?.status === 401) {
//        authJira.logout();
//        throw { message: 'Authentification incorrecte' };
//      }
//      if (error.response) {
//        throw error.response.data;
//      }
//      throw error;

//    });
//};

//export { clientApi, clientAuth, clientNetFlix };

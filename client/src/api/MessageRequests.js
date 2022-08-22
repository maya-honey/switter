import axios from 'axios'


const API = axios.create({ baseURL: 'https://switter-maya.herokuapp.com' });
//const API = axios.create({ baseURL: 'http://localhost:3001' });

export const getMessages = (id) => API.get(`/message/${id}`);

export const addMessage = (data) => API.post('/message/', data);
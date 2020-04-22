import axios from 'axios';

/*
axios.defaults.baseURL = 'http://Dominio';
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
headers: {'X-Custom-Header': 'foobar'}
*/
/*
const api = axios.create({
    baseURL: 'http://localhost:3333'
});
*/
/*
const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {'Content-Type':'application/json;charset=utf-8', 'Access-Control-Allow-Origin': '*', 'X-Requested-With': 'XMLHttpRequest'}
});
*/
const api = axios.create({
    baseURL: 'http://localhost:3333'
});

export default api;
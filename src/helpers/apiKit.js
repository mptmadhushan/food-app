import axios from 'axios';

// Create axios client, pre-configured with baseURL
let APIKit = axios.create({
  baseURL: 'https://restaurant-ml-app.herokuapp.com/api/v1.0/',
  timeout: 10000,
});
APIKit.interceptors.request.use(request => {
  console.log('Starting Request', JSON.stringify(request, null, 2));
  return request;
});
APIKit.interceptors.response.use(function (response) {
  return response;
});

export const setClientToken = token => {
  console.log('Setting token...', token);
  APIKit.interceptors.request.use(
    function (config) {
      config.headers.Authorization = `JWT ${token}`;
      return config;
    },
    null,
    {synchronous: true},
  );
};

export default APIKit;

import axios from 'axios';

let APIKit = axios.create({
  baseURL: 'https://restaurant-ml-app.herokuapp.com/api/v1.0/',
  timeout: 10000,
  headers: {
    Authorization:
      "'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ4MjY4MTY4LCJqdGkiOiJmMzYxZDM3ZDJmZGM0NzU4YjEyYjRhZmE1MTg3Njg2YSIsInVzZXJfaWQiOjJ9.sz2ltE0H9jeMbPCNsboY4qQKgjfrWyLG7Uj4FW-opuo",
    'Content-Type': 'application/json',
  },
});

// APIKit.interceptors.response.use(function (response) {
//   return response.data;
// });

// export const setClientToken = token => {
//   console.log('Setting token...', token);
//   APIKit.interceptors.request.use(
//     function (config) {
//       // config.headers.Authorization = `JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ2NDMzMDk4LCJqdGkiOiIyNDAxMjgzNTNiMzA0ZDYxYjBhNTg3YzJkMDM5YzRhZiIsInVzZXJfaWQiOjJ9.OGppE4MSoSGF72Clzgv7K_rF0hs9otUKGhbc5nIVfdk`;
//       config.headers.Authorization = `JWT ${token.refresh}`;
//       return config;
//     },
//     null,
//     {synchronous: true},
//   );
// };
export default APIKit;

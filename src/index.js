import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRouter from './router/AppRouter'
import * as serviceWorker from './serviceWorker';


// 引入Approuter路由

ReactDOM.render(
  <React.StrictMode>
    <AppRouter/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

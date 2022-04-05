import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import App from './app/layout/App';
import './app/layout/styles.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserHistory } from "history";
import { Provider } from 'react-redux';
import { store } from './app/store/configureStore';
import { fetchProductsAsync } from './feature/catalog/catalogSlice';

export const history = createBrowserHistory();

store.dispatch(fetchProductsAsync());

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
        <Provider store={store}>
          <App />
        </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

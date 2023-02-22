import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Routes, Route } from 'react-router-dom';

import { store } from "./redux/store"
import { Provider } from "react-redux";
import setupInterceptors from './common/setupInterceptors';
import history from './common/history';
import CustomRouter from './components/CustomRouter';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>

    <CustomRouter history={history}>

      <Routes>
        <Route path='/*' element={<App />} />
      </Routes>
    </CustomRouter>
  </Provider>
);


setupInterceptors(store);
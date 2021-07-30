import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';

import App from './App';
import Modal from './components/Modal';
import configureStore from './store';
import Errors from './components/Errors';
import csrfetch from './store/csrfetch';
import { SetMooring } from './store/modal';

import './index.css';
import findCookie from './utils/findCookie';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.dispatch = store.dispatch;
  window.csrfetch = csrfetch;
  window.findCookie = findCookie;
}

function Root () {
  const dispatch = useDispatch();
  const mooringRef = useRef(null);

  useEffect(() => {
    dispatch(SetMooring(mooringRef.current));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Errors />
      <App />
      <Modal />
      <div ref={mooringRef} id='modal' />
    </BrowserRouter>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

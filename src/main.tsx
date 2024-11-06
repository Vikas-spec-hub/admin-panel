import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';

import App from './App';
import store from './redux/store';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <SnackbarProvider
    maxSnack={3}
    autoHideDuration={3000}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </SnackbarProvider>,
);

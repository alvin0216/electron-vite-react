import '@unocss/reset/normalize.css';
import './index.css';
import 'uno.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>

  <App />
);

postMessage({ payload: 'removeLoading' }, '*');

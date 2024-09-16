import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { LocalStorageProvider } from './context/LocalStorageContext';
import App from './containers/App';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocalStorageProvider>
      <App />
      <ToastContainer />
    </LocalStorageProvider>
  </StrictMode>
);

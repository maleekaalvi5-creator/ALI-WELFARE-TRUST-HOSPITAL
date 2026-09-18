import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { HospitalContentProvider } from './context/HospitalContentContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HospitalContentProvider>
      <App />
    </HospitalContentProvider>
  </StrictMode>,
);

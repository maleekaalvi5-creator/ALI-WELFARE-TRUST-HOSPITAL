import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { HospitalContentProvider } from './context/HospitalContentContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  duration: 800,
  once: true,
  easing: 'ease-out',
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HospitalContentProvider>
      <App />
    </HospitalContentProvider>
  </StrictMode>,
);

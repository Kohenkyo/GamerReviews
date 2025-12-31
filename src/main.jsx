import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './reset.css';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './components/login/AuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';
import { XCircle, CheckCircle, Loader } from 'lucide-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          error: {
            icon: <XCircle size={18} className="text-red-500" />,
          },
          success: {
            icon: <CheckCircle size={18} className="text-green-500" />,
          },
          loading: {
            icon: <Loader size={18} className="text-blue-500 animate-spin" />,
          },
        }}
      />
    </ThemeProvider>
  </React.StrictMode>
);
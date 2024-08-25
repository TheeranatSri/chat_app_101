import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Use createRoot for React 18 and later
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

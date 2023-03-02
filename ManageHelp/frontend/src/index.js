import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WorkspaceContextProvider } from './context/WorkspaceContext';
import { EmployeeContextProvider } from './context/EmployeeContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkspaceContextProvider>
        <EmployeeContextProvider>
          <App />
        </EmployeeContextProvider>
      </WorkspaceContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
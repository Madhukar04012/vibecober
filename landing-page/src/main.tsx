import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import VibeCober from './VibeCober';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider>
            <VibeCober />
        </AuthProvider>
    </React.StrictMode>
);

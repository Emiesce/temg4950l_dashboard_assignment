import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import { HashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'

import App from './App';

// Hook React App to "root" div
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
        <App />
    </HashRouter>
)

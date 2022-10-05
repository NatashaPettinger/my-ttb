import React from 'react';
import { createRoot } from 'react-dom/client';
import './assets/main.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';


const root = createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
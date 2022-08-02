import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import './index.css';
import './css/style.css';
import './css/lessStyle.less';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);
root.render(
    <div className="container">
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </div>
);

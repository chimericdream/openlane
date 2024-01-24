import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './app.tsx';

import './assets.tsx';
import { ProfileProvider } from './components/profile-context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ProfileProvider>
            <App />
        </ProfileProvider>
    </React.StrictMode>
);

import { Container, CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { App } from './app.tsx';

import './assets.tsx';
import { ProfileProvider } from './components/profile-context.tsx';

const defaultTheme = createTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Container component="main" maxWidth="sm">
                <ProfileProvider>
                    <App />
                </ProfileProvider>
            </Container>
        </ThemeProvider>
    </React.StrictMode>
);

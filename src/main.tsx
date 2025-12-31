import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@/app/providers/theme-provider.tsx';
import { router } from '@/app/routing/router';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="caddy-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);

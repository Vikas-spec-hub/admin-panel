import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import '@/App.css';

import Work from './pages/Work';
import JuicerFeed from './pages/JuicerFeed';
import Dashboard from './pages/Dashboard';
import AuthWrapper from './components/authGuard';
import { AuthProvider } from './context/AuthContext';
import NotFound from './pages/404';
import User from './pages/User';
import Offer from './pages/Offer';
import Game from './pages/Game';
import Quize from './pages/Quiz';
import Event from './pages/Event';
import MainLayout from './layouts/mainLayout';
import SignIn from './pages/SignIn';
import { ModalProvider } from './hooks/useModal';
import ErrorBoundary from './components/ErrorBoundary';

/**
 * Main entry point of our app
 * @returns {JSX.Element}
 */
const App: React.FC = (): JSX.Element => {
  // Authenticated routes with layout
  const authenticatedRoutes = [
    {
      path: '/',
      element: (
        <AuthWrapper>
          <ErrorBoundary fallback={<p>Something went wrong.</p>}>
            <MainLayout />
          </ErrorBoundary>
        </AuthWrapper>
      ),
      children: [
        { path: '/', element: <Dashboard /> },
        { path: '/user', element: <User /> },
        { path: '/offer', element: <Offer /> },
        { path: '/game', element: <Game /> },
        { path: '/quiz', element: <Quize /> },
        { path: '/event', element: <Event /> },
        { path: '/work', element: <Work /> },
        { path: '/juicerfeed', element: <JuicerFeed /> },
      ],
    },
  ];

  // Unauthenticated routes without layout
  const unauthenticatedRoutes = [{ path: '/signin', element: <SignIn /> }];

  // 404 route (outside Layout)
  const notFoundRoute = { path: '*', element: <NotFound /> };

  // Combine routes
  const routes = [
    ...authenticatedRoutes,
    ...unauthenticatedRoutes,
    notFoundRoute,
  ];

  // Create browser router
  const router = createBrowserRouter(routes);

  return (
    <ModalProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ModalProvider>
  );
};

export default App;

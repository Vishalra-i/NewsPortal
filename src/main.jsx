import { RouterProvider } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import './index.css';
import { createBrowserRouter } from 'react-router-dom';
import Auth from './Auth/Auth.jsx';
import Home from './Pages/Home.jsx';
import ArticlePage from './Pages/ArticlePage.jsx';
import TrendingPage from './Pages/TrendingPage.jsx';
import ErrorBoundary from './Pages/ErrorBoundary.jsx';
import App from './App.jsx';
import Astrology from './Pages/Astrology.jsx';
import SearchPage from './Pages/SearchPage.jsx';

const router = createBrowserRouter([
  // Public Routes
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: '/trending',
        element: <TrendingPage />,
      },
      {
        path: '/article/:url',
        element: <ArticlePage />,
      },
      {
        path: '/astrology',
        element: <Astrology />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
    ],
  },
  // Auth Route
  {
    path: '/auth',
    element: <Auth />,
    children: [
      {
        path: '/auth/login',
        element: <div>Login</div>,
      },
      {
        path: '/auth/register',
        element: <div>Register</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

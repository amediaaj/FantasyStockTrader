import { createBrowserRouter, Navigate } from 'react-router';
import App from '../layout/App';
import HomePage from '../../features/home/HomePage';
import TimeSeriesDashboard from '../../features/timeSeries/dashboard/TimeSeriesDashboard';
import Counter from '../../features/counter/Counter';
import TimeSeriesTrade from '../../features/form/TimeSeriesTrade';
import TestErrors from '../../features/errors/TestErrors';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/account/LoginForm';
import RequireAuth from './RequireAuth';
import RegisterForm from '../../features/account/RegisterForm';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: 'timeseries', element: <TimeSeriesDashboard /> },
          { path: 'trade/:ticker', element: <TimeSeriesTrade /> },
          { path: 'trade', element: <TimeSeriesTrade key="create" /> },
        ],
      },
      { path: '', element: <HomePage /> },
      { path: 'counter', element: <Counter /> },
      { path: 'not-found', element: <NotFound /> },
      { path: 'errors', element: <TestErrors /> },
      { path: 'server-error', element: <ServerError /> },
      { path: 'login', element: <LoginForm /> },
      { path: 'register', element: <RegisterForm /> },
      { path: '*', element: <Navigate replace to="/not-found" /> },
    ],
  },
]);

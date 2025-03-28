import { createBrowserRouter, Navigate } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import TimeSeriesDashboard from "../../features/timeSeries/dashboard/TimeSeriesDashboard";
import Counter from "../../features/counter/Counter";
import TimeSeriesTrade from "../../features/form/TimeSeriesTrade";
import TestErrors from "../../features/errors/TestErrors";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage />},
            {path: 'timeseries', element: <TimeSeriesDashboard />},
            {path: 'trade/:ticker', element: <TimeSeriesTrade />},
            {path: 'trade', element: <TimeSeriesTrade key='create'/>},
            {path: 'counter', element: <Counter />},
            {path: 'not-found', element: <NotFound />},
            {path: 'errors', element: <TestErrors />},
            {path: 'server-error', element: <ServerError />},
            {path: '*', element: <Navigate replace to='/not-found' />}

        ]
    }
])
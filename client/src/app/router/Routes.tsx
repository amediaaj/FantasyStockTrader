import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import TimeSeriesDashboard from "../../features/timeSeries/dashboard/TimeSeriesDashboard";
import TickerSearch from "../../features/form/TickerSearch";
import TimeSeriesDetailPage from "../../features/timeSeries/details/TimeSeriesDetailPage";
import Counter from "../../features/counter/Counter";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage />},
            {path: 'timeseries', element: <TimeSeriesDashboard />},
            {path: 'timeseries/:id', element: <TimeSeriesDetailPage />},
            {path: 'trade', element: <TickerSearch key='create'/>},
            {path: 'trade/:id', element: <TickerSearch />},
            {path: 'counter', element: <Counter/>},
        ]
    }
])
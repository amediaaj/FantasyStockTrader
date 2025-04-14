import { useQuery } from '@tanstack/react-query';
import agent from '../api/agent';
import { TimeSeries } from '../types';
import { useStore } from './useStore';

export const useTimeSeries = (ticker?: string) => {
  const { uiStore } = useStore();

  const { data: timeSeries, isPending } = useQuery({
    queryKey: ['timeSeries', ticker],
    queryFn: async () => {
      if (!ticker) return; // Prevents the API call
      const timeSeriesResponse = await agent.get<TimeSeries>(
        `${
          import.meta.env.VITE_STOCKS_URL
        }function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${
          import.meta.env.VITE_API_KEY
        }`,
        { withCredentials: false }
      );
      if (!timeSeriesResponse.data) throw new Error('No data returned');
      uiStore.setTicker(timeSeriesResponse.data['Meta Data']['2. Symbol']);
      return timeSeriesResponse.data;
    },
    enabled: !!ticker, // Ensures query runs only when ticker is defined
  });

  return { timeSeries, isPending };
};

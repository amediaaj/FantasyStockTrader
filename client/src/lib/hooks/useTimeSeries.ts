import axios from "axios";
import { TimeSeries, UserTimeSeries } from "../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

const url = (timeSeriesDetail: UserTimeSeries) => {
  return import.meta.env.VITE_STOCKS_URL + 
      `function=${timeSeriesDetail.function}&` +
      `symbol=${timeSeriesDetail.tickerSymbol}&apikey=${import.meta.env.VITE_API_KEY}`
  }

export const useTimeSeries = (id?: string) => {
  const queryClient = useQueryClient();

  const {data: timeSeriesList, isPending} = useQuery({
      queryKey: ['timeSeriesList'],
      queryFn: async () => {
        try {
          const userTimeSeriesResponse = 
          await agent.get<UserTimeSeries[]>('/usertimeseries');
          
          const timeSeriesResponse = await Promise.all(
            userTimeSeriesResponse.data.map((timeSeriesDetail: UserTimeSeries) =>
              axios.get<TimeSeries>(url(timeSeriesDetail))))
  
          return timeSeriesResponse.map((item) => {
            //TODO: Refactor adding the Id from UserTimeSeries to TimeSeries
            item.data.id = userTimeSeriesResponse.data.find(
              x => x.tickerSymbol === item.data["Meta Data"]["2. Symbol"])!.id;
            return item.data;
          })
        } catch(error) {
          console.error('Promise rejected with error: ' + error);
        }  
      }
    })

    const {data: timeSeries, isLoading: isLoadingTimeSeries} = useQuery({
      queryKey: ['timeSeries', id],
      queryFn: async () => {
        const response = await agent.get<UserTimeSeries>(`/usertimeseries/${id}`)
        return response.data;
      },
      enabled: !!id
    })

  const updateUserTimeSeries = useMutation({
    mutationFn: async (userTimeSeries: UserTimeSeries) => {
      await agent.put('/userTimeSeries', userTimeSeries)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['timeSeriesList']
      })
    }
  })

  const createUserTimeSeries = useMutation({
    mutationFn: async (userTimeSeries: UserTimeSeries) => {
      const response = await agent.post('/userTimeSeries', userTimeSeries);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['timeSeriesList']
      })
    }
  })

  const deleteUserTimeSeries = useMutation({
    //TODO: Related to above TODO. Refactor so that id does not need to be possibly undefined
    mutationFn: async (id: string | undefined) => {
      await agent.delete(`/userTimeSeries/${id}`)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['timeSeriesList']
      })
    }
  })

  return {
    timeSeriesList, 
    isPending,
    updateUserTimeSeries,
    createUserTimeSeries,
    deleteUserTimeSeries,
    timeSeries,
    isLoadingTimeSeries
  }
}
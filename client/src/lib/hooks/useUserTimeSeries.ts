import { UserTimeSeries } from "../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
// import { useLocation } from "react-router";

export const useUserTimeSeries = (id?: string) => {
  const queryClient = useQueryClient();
  // const location = useLocation()

  const {data: userTimeSeries, isPending} = useQuery({
      queryKey: ['userTimeSeriesList'],
      queryFn: async () => {
        try {
          const userTimeSeriesResponse = 
          await agent.get<UserTimeSeries[]>('/usertimeseries');
          return userTimeSeriesResponse.data
        } catch(error) {
          console.error('Promise rejected with error: ' + error);
        }  
      },
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
    userTimeSeries, 
    isPending,
    
    updateUserTimeSeries,
    createUserTimeSeries,
    deleteUserTimeSeries,
    timeSeries,
    isLoadingTimeSeries
  }
}
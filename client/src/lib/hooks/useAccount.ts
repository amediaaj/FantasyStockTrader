import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import agent from '../api/agent';
import { LoginSchema } from '../schemas/loginSchema';
import { User } from '../types';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export const useAccount = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const loginUser = useMutation({
    mutationFn: async (creds: LoginSchema) => {
      await agent.post('/login?useCookies=true', creds);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['user'],
      });
      await navigate('/timeseries');
    },
  });

  const logoutUser = useMutation({
    mutationFn: async () => {
      await agent.post('/account/logout');
    },
    onSuccess: () => {
      queryClient.clear();
      toast.success('Logged out successfully!');
      navigate('/');
    },
    onError: () => {
      toast.error('Failed to log out. Please try again.');
    },
  });

  // Called by onSuccess when logging in. See above.
  const { data: currentUser } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await agent.get<User>('account/user-info');
      return response.data;
    },
    enabled: !queryClient.getQueryData(['user']),
  });

  return {
    loginUser,
    currentUser,
    logoutUser,
  };
};

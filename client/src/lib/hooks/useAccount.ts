import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import agent from '../api/agent';
import { LoginSchema } from '../schemas/loginSchema';
import { User } from '../types';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { RegisterSchema } from '../schemas/registerSchema';

export const useAccount = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const loginUser = useMutation({
    mutationFn: async (creds: LoginSchema) => {
      await agent.post('/login?useCookies=true', creds);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['user'],
      });
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

  const registerUser = useMutation({
    mutationFn: async (creds: RegisterSchema) => {
      await agent.post('/account/register', creds);
    },
    onSuccess: () => {
      toast.success('Registeration successful - you may login');
      navigate('/login');
    },
  });

  // Called by onSuccess when logging in. See above.
  const { data: currentUser, isLoading: loadingUserInfo } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await agent.get<User>('account/user-info');
      return response.data;
    },
    enabled:
      !queryClient.getQueryData(['user']) &&
      location.pathname !== '/login' &&
      location.pathname !== '/register',
  });

  return {
    loginUser,
    currentUser,
    logoutUser,
    loadingUserInfo,
    registerUser,
  };
};

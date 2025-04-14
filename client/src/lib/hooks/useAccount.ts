import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import agent from '../api/agent';
import { LoginSchema } from '../schemas/loginSchema';
import { User } from '../types';

export const useAccount = () => {
  const queryClient = useQueryClient();

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

  // Called by onSuccess when logging in. See above.
  const { data: currentUser } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await agent.get<User>('account/user-info');
      return response.data;
    },
  });

  return {
    loginUser,
    currentUser,
  };
};

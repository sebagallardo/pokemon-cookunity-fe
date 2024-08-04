import { useSnackbar } from 'notistack';
import { useCallback, useEffect } from 'react';
import { UseMutateFunction, useQueryClient, useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getUser, removeUser, saveUser } from './user';

export interface User {
  accessToken: string;
  email: string;
  id: string;
}

async function signUp(email: string, username: string, password: string): Promise<User> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, username, password }),
  });
  if (!response.ok) throw new Error('Failed on sign up request');

  return await response.json();
}

async function logIn(email: string, password: string): Promise<User> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error('Failed on sign in request');

  return await response.json();
}

async function fetchUser(user: User | null | undefined): Promise<User | null> {
  if (!user) return null;
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });
  if (!response.ok) throw new Error('Failed on get user request');

  return await response.json();
}

type IUseSignUp = UseMutateFunction<
  User,
  unknown,
  {
    email: string;
    username: string;
    password: string;
  },
  unknown
>;

export function useSignUp(): IUseSignUp {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: signUpMutation } = useMutation<
    User,
    unknown,
    { email: string; username: string; password: string },
    unknown
  >(({ email, username, password }) => signUp(email, username, password), {
    onSuccess: () => {
      enqueueSnackbar('User created succesfuly!', {
        variant: 'info',
      });

      navigate('/');
    },
    onError: () => {
      enqueueSnackbar("Oops.. something's wrong. Please try again!", {
        variant: 'error',
      });
    },
  });

  return signUpMutation;
}

type IUseLogIn = UseMutateFunction<
  User,
  unknown,
  {
    email: string;
    password: string;
  },
  unknown
>;

export function useLogIn(): IUseLogIn {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: logInMutation } = useMutation<User, unknown, { email: string; password: string }, unknown>(
    ({ email, password }) => logIn(email, password),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['user'], data);
        navigate('/');
      },
      onError: () => {
        enqueueSnackbar("Oops.. something's wrong. Please try again!", {
          variant: 'error',
        });
      },
    },
  );

  return logInMutation;
}

interface IUseUser {
  user: User | null;
}

export function useUser(): IUseUser {
  const { data: user } = useQuery<User | null>(['user'], async (): Promise<User | null> => fetchUser(user), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: getUser,
    onError: () => {
      removeUser();
    },
  });

  useEffect(() => {
    if (!user) removeUser();
    else saveUser(user);
  }, [user]);

  return {
    user: user ?? null,
  };
}

type IUseSignOut = () => void;

export function useSignOut(): IUseSignOut {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onSignOut = useCallback(() => {
    queryClient.setQueryData(['user'], null);
    navigate('/login');
  }, [navigate, queryClient]);

  return onSignOut;
}

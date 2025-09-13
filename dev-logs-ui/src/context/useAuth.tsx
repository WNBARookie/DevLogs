import { createContext, useEffect, useState } from 'react';
import type { AuthenticateUserRequestBody, CreateUserRequestBody } from '../types';
import { useNavigate } from 'react-router-dom';
import { loginAPI, registerAPI } from '../services/AuthService';
import { toast } from 'react-toastify';
import React from 'react';
import axios from 'axios';

type UserContextType = {
  //   user: UserInfo | null;
  token: string | null;
  registerUser: (requestBody: CreateUserRequestBody) => void;
  loginUser: (requestBody: AuthenticateUserRequestBody) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type UserContextProps = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: UserContextProps) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setToken(token);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }

    setIsReady(true);
  }, [isReady]);

  const registerUser = async (requestBody: CreateUserRequestBody) => {
    await registerAPI(requestBody)
      .then((res) => {
        if (res && res?.data.status === 200) {
          toast.success(res.data.details);
          navigate('/login');
        } else if (res && res?.data.status === 400) {
          toast.error(res.data.details);
        }
      })
      .catch((e) => {
        console.error(e);
        toast.warning('Server error occured.');
      });
  };

  const loginUser = async (requestBody: AuthenticateUserRequestBody) => {
    await loginAPI(requestBody)
      .then((res) => {
        if (res && res?.data.token) {
          localStorage.setItem('token', res.data.token);
          setToken(res.data.token);
          toast.success(res.data.details);
          setIsReady(false);
          navigate('/');
        }
      })
      .catch((e) => {
        console.error(e);
        toast.warning('Server error occured.');
      });
  };

  const isLoggedIn = () => {
    return !!token;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/login');
  };

  return <UserContext.Provider value={{ loginUser, token, logout, isLoggedIn, registerUser }}>{isReady ? children : null}</UserContext.Provider>;
};

export const useAuth = () => React.useContext(UserContext);

/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthService } from '@/api/user-access/services/auth.service';
import { LoginUserDto } from '@/api/user-access/dto/login-user.dto';
import { RegisterUserDto } from '@/api/user-access/dto/register-user.dto';
import { LocalStorageService } from '@/services/local-storage.service';
import {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { IResponse } from '@/api/common/interfaces/response.interface';
import { IAuthResult } from '@/api/user-access/interfaces/auth-result.interface';
import { UserModel } from '@/api/user-access/entities/user.entity';

export interface IAction {
  type: 'loginOrRegister' | 'logout';
  payload?: IAuthResult;
}
export type Dispatch = (action: IAction) => void;
export interface IState {
  user?: UserModel;
  token?: string;
}
export interface IProviderProps {
  children: ReactNode;
}
export interface IUseAuthMethodReturn {
  success: boolean;
  message: string;
}
export interface IUseAuthState {
  login: (loginUserDto: LoginUserDto) => Promise<IUseAuthMethodReturn>;
  register: (registerUserDto: RegisterUserDto) => Promise<IUseAuthMethodReturn>;
  logout: (userEmail: string) => Promise<IUseAuthMethodReturn>;
  state: IState;
}
const USER_KEY = 'USER_KEY';
export const USER_ACCESS_TOKEN_KEY = 'TOKEN_KEY';

const AuthStateContext = createContext<
  { state: IState; dispatch: Dispatch } | undefined
>(undefined);

function authReducer(state: IState, action: IAction) {
  switch (action.type) {
    case 'loginOrRegister': {
      return { ...state, ...action.payload };
    }
    case 'logout': {
      return { ...state, user: undefined, token: undefined };
    }
    default: {
      throw new Error(`AuthContext: Unhandled action type`);
    }
  }
}
export function AuthProvider({ children }: Readonly<IProviderProps>) {
  const localStorageUser: string | undefined =
    LocalStorageService.get(USER_KEY);
  const localStorageToken: string | undefined = LocalStorageService.get(
    USER_ACCESS_TOKEN_KEY,
  );
  const [state, dispatch]: [IState, Dispatch] = useReducer(authReducer, {
    user: localStorageUser
      ? (JSON.parse(
          JSON.parse(localStorageUser ?? '{}') as string,
        ) as UserModel)
      : undefined,
    token: localStorageToken,
  });
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return (
    <AuthStateContext.Provider value={value}>
      {children}
    </AuthStateContext.Provider>
  );
}

export function useAuthState(): IUseAuthState {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }
  const login = async (
    loginUserDto: LoginUserDto,
  ): Promise<IUseAuthMethodReturn> => {
    const response: IResponse<IAuthResult> | undefined =
      await AuthService.login(loginUserDto);
    if (!response?.success || response.statusCode >= 400)
      return {
        success: false,
        message: response?.message ?? 'Ha ocurrido un error al iniciar sesión',
      };
    context.dispatch({
      type: 'loginOrRegister',
      payload: response.data,
    });
    LocalStorageService.setMany({
      [USER_KEY]: JSON.stringify(response.data?.user),
      [USER_ACCESS_TOKEN_KEY]: JSON.stringify(response.data?.token),
    });
    return { success: true, message: response.message };
  };

  const register = async (
    registerCredentials: RegisterUserDto,
  ): Promise<IUseAuthMethodReturn> => {
    const response: IResponse<IAuthResult> | undefined =
      await AuthService.register(registerCredentials);
    if (!response?.success || response.statusCode >= 400)
      return {
        success: false,
        message: response?.message ?? 'Ha ocurrido un error al registrar',
      };
    context.dispatch({
      type: 'loginOrRegister',
      payload: response.data,
    });
    LocalStorageService.setMany({
      [USER_KEY]: JSON.stringify(response.data?.user),
      [USER_ACCESS_TOKEN_KEY]: JSON.stringify(response.data?.token),
    });
    return { success: true, message: response.message };
  };

  const logout = async (userEmail: string): Promise<IUseAuthMethodReturn> => {
    const response: IResponse<IAuthResult> | undefined =
      await AuthService.logout(userEmail);
    if (!response?.success || response.statusCode >= 400)
      return {
        success: false,
        message: response?.message ?? 'Ha ocurrido un error al cerrar sesión',
      };
    context.dispatch({
      type: 'loginOrRegister',
      payload: response.data,
    });
    LocalStorageService.setMany({
      [USER_KEY]: JSON.stringify(response.data?.user),
      [USER_ACCESS_TOKEN_KEY]: JSON.stringify(response.data?.token),
    });
    context.dispatch({ type: 'logout' });
    LocalStorageService.removeMany(USER_KEY, USER_ACCESS_TOKEN_KEY);
    return { success: true, message: 'Sesión cerrada' };
  };

  return {
    state: context.state,
    login,
    register,
    logout,
  };
}

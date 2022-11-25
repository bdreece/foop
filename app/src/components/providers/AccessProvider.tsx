import type { FC } from 'react';
import type { ChildrenProps } from '../../types/children';
import { createContext, useContext } from 'react';
import { gql, useQuery } from '@apollo/client';

export type AccessContext = {
  accessToken?: string;
  expiresIn?: number;
};

export type AccessProviderProps = ChildrenProps;

const context = createContext<AccessContext>({});

export const useAccess = () => useContext(context);

const REFRESH_USER = gql`
  query {
    refreshUser {
      accessToken
      expiresIn
    }
  }
`;

const AccessProvider: FC<AccessProviderProps> = ({ children }) => {
  const { data } = useQuery<AccessContext>(REFRESH_USER);
  return <context.Provider value={{ ...data }}>{children}</context.Provider>;
};

export default AccessProvider;

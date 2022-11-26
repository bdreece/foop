import type { FC } from 'react';
import type { ChildrenProps } from '../../types/children';

import { createContext, useContext } from 'react';
import { gql, useApolloClient, useQuery } from '@apollo/client';

export type AccessContext = {
  accessToken?: string;
  expiresIn?: number;
};

export type AccessProviderProps = ChildrenProps;

const context = createContext<AccessContext>({});

export const useAccess = () => useContext(context);

const AccessProvider: FC<AccessProviderProps> = ({ children }) => {
  const client = useApolloClient();
  const { data } = useQuery<{ refreshUser: AccessContext }>(
    gql`
      query RefreshUser {
        refreshUser {
          accessToken
          expiresIn
        }
      }
    `,
    {
      onCompleted: ({ refreshUser }) => {
        sessionStorage.setItem('AccessToken', JSON.stringify(refreshUser));
        client.refetchQueries({ include: ['Self'] });
      },
    },
  );

  return (
    <context.Provider
      value={{
        accessToken: data?.refreshUser?.accessToken,
        expiresIn: data?.refreshUser?.expiresIn,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default AccessProvider;

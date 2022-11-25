import type { FC } from 'react';
import type { ChildrenProps } from '../../types/children';

import { createContext, useContext } from 'react';
import { gql, useQuery } from '@apollo/client';

import { useAccess } from './AccessProvider';

export type ProfileContext = {
  id?: number;
  phone?: string;
};

export type ProfileProviderProps = ChildrenProps;

const context = createContext<ProfileContext>({});

export const useProfile = () => useContext(context);

const PROFILE = (accessToken: string) => gql`
  {
    profile(accessToken: ${accessToken}) {
      id
      phone
    }
  }
`;

const ProfileProvider: FC<ProfileProviderProps> = ({ children }) => {
  const { accessToken } = useAccess();
  const { data } = useQuery<ProfileContext>(PROFILE(accessToken));

  return (
    <context.Provider value={{ ...data }}>
      {children}
    </context.Provider>
  );
}


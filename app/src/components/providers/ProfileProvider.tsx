import type { FC } from 'react';
import type { ChildrenProps } from '../../types/children';

import { createContext, useContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useAccess } from './AccessProvider';

export type ProfileContext =
  | {
      id: number;
      firstName: string;
      lastName: string;
      phone: string;
    }
  | undefined;

export type ProfileProviderProps = ChildrenProps;

const context = createContext<ProfileContext>(undefined);

export const useProfile = () => useContext(context);

const ProfileProvider: FC<ProfileProviderProps> = ({ children }) => {
  const { accessToken } = useAccess();
  const { data } = useQuery<{ self: ProfileContext }>(
    gql`
      query Self {
        self {
          id
          firstName
          lastName
          phone
        }
      }
    `,
    {
      skip: !accessToken,
    },
  );

  return <context.Provider value={data?.self}>{children}</context.Provider>;
};

export default ProfileProvider;

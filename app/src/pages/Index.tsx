import type { FC } from 'react';
import Layout from '../components/layout';
import Dashboard from '../components/partials/Dashboard';
import Landing from '../components/partials/Landing';
import { useProfile } from '../components/providers/ProfileProvider';

const Index: FC = () => {
  const profile = useProfile();
  return <Layout>{profile ? <Dashboard /> : <Landing />}</Layout>;
};

export default Index;

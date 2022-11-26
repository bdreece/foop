import type { FC } from 'react';
import Layout from '../components/layout';
import LoginForm from '../components/partials/LoginForm';
import RegisterForm from '../components/partials/RegisterForm';

import styles from '../styles/Auth.module.scss';

const Auth: FC = () => {
  return (
    <div className={styles.auth}>
      <LoginForm />
      <RegisterForm />
    </div>
  );
};

export default Auth;

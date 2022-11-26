import type { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProfile } from '../components/providers/ProfileProvider';

import styles from '../styles/Landing.module.scss';

const Landing: FC = () => {
  const profile = useProfile();
  const navigate = useNavigate();

  if (profile) navigate('/dashboard');

  return (
    <div className={styles.landing}>
      <h3>Browse recipes by the ingredients you already have!</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed officia
        obcaecati odit esse blanditiis. Odio veniam dicta adipisci deleniti,
        excepturi nihil sed. Deleniti repudiandae molestiae accusamus temporibus
        pariatur consequatur libero?
      </p>
      <Link to='/auth'>Get Started</Link>
    </div>
  );
};

export default Landing;

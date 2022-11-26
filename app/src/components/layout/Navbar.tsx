import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { useProfile } from '../providers/ProfileProvider';
import styles from '../../styles/Navbar.module.scss';

const Navbar: FC = () => {
  const profile = useProfile();
  return (
    <nav className={styles.navbar}>
      <h1>
        <Link to={profile ? '/dashboard' : '/'}>foop</Link>
      </h1>
      <ul>
        <li>
          <Link to={profile ? '/dashboard/' : '/'}>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        {profile ? (
          <li>
            <Link to='/profile'>{`${profile.firstName} ${profile.lastName}`}</Link>
          </li>
        ) : (
          <li>
            <Link to='/auth'>Get Started</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

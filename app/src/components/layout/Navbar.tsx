import type { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/Navbar.module.scss';

const Navbar: FC = () => (
  <nav className={styles.navbar}>
    <h1>
      <Link to='/'>foop</Link>
    </h1>
    <ul>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/about'>About</Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;

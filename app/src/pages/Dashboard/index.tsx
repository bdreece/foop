import type { FC } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import styles from '../../styles/Dashboard.module.scss';

export { default as Overview } from './Overview';
export { default as Recipes } from './Recipes';
export { default as Search } from './Search';

const Dashboard: FC = () => (
  <div className={styles.dashboard}>
    <aside>
      <ul>
        <li>
          <NavLink to='/dashboard/search'>Search for Recipes</NavLink>
        </li>
        <li>
          <NavLink to='/dashboard/recipes'>My Recipes</NavLink>
        </li>
      </ul>
    </aside>
    <article>
      <Outlet />
    </article>
  </div>
);

export default Dashboard;

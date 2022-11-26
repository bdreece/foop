import type { FC } from 'react';
import type { ChildrenProps } from '../../types/children';
import Content from './Content';
import Footer from './Footer';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

import styles from '../../styles/Layout.module.scss';

const Layout: FC = () => (
  <div className={styles.layout}>
    <Navbar />
    <Content>
      <Outlet />
    </Content>
    <Footer />
  </div>
);

export default Layout;

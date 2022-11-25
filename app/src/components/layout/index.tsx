import type { FC } from 'react';
import type { ChildrenProps } from '../../types/children';
import Content from './Content';
import Footer from './Footer';
import Navbar from './Navbar';

import styles from '../../styles/Layout.module.scss';

export type LayoutProps = ChildrenProps;

const Layout: FC<LayoutProps> = ({ children }) => (
  <div className={styles.layout}>
    <Navbar />
    <Content>{children}</Content>
    <Footer />
  </div>
);

export default Layout;

import type { FC } from 'react';
import type { ChildrenProps } from '../../types/children';
import styles from '../../styles/Content.module.scss';

export type ContentProps = ChildrenProps;

const Content: FC<ContentProps> = ({ children }) => (
  <main className={`${styles.content} spacer`}>{children}</main>
);

export default Content;

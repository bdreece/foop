import type { EventHandler, FormEvent, FC } from 'react';

import styles from '../../styles/Field.module.scss';

type InputEventHandler = EventHandler<FormEvent<HTMLInputElement>>;

export type FieldProps = {
  id: string;
  label: string;
  name: string;
  value: string;
  error: any;
  touched: any;
  onChange: InputEventHandler;
  onBlur: InputEventHandler;
};

const Field: FC<FieldProps> = ({ id, label, touched, error, ...field }) => (
  <div className={styles.field}>
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      {...field}
    />
    {touched && error && <label htmlFor={id}>{error}</label>}
  </div>
);

export default Field;

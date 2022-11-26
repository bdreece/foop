import { useMemo } from 'react';
import type { FormikConfig } from 'formik';
import type { FieldProps } from './Field';

import _ from 'lodash';
import { useId } from 'react';
import { useFormik } from 'formik';

import Field from './Field';
import styles from '../../styles/Form.module.scss';

export type FormProps<TFormValues> = FormikConfig<TFormValues> & {
  title: string;
  submitText: string;
  labels: {
    [key: string]: string;
  };
};

const Form = <TFormValues extends object>({
  title,
  submitText,
  labels: labelProps,
  ...config
}: FormProps<TFormValues>) => {
  const f = useFormik(config);

  const values = _.chain(f.values)
    .toPairs()
    .map(([name, value]) => ({ name, value }))
    .keyBy(({ name }) => name)
    .value();

  const errors = _.chain(f.errors)
    .toPairs()
    .map(([name, error]) => ({ name, error }))
    .keyBy(({ name }) => name)
    .value();

  const touched = _.chain(f.touched)
    .toPairs()
    .map(([name, touched]) => ({ name, touched }))
    .keyBy(({ name }) => name)
    .value();

  const labels = _.chain(labelProps)
    .toPairs()
    .map(([name, label]) => ({ name, label }))
    .keyBy(({ name }) => name)
    .value();

  const merged = _.merge(values, errors, touched, labels);
  const fields: FieldProps[] = _.values(merged).map(field => ({
    ...field,
    id: useId(),
    onChange: f.handleChange,
    onBlur: f.handleBlur,
  }));

  return (
    <form
      className={styles.form}
      onSubmit={f.handleSubmit}
    >
      <h3>{title}</h3>
      {fields.map((field, i) => (
        <Field
          key={i}
          {...field}
        />
      ))}
      <button type='submit'>{submitText}</button>
    </form>
  );
};

export default Form;

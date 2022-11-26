import type { FC } from 'react';
import type { FormProps } from '../form';
import type { ProfileContext } from '../providers/ProfileProvider';

import * as y from 'yup';
import Form from '../form';
import { gql, useMutation } from '@apollo/client';

const schema = y.object({
  firstName: y.string().required(),
  lastName: y.string().required(),
  phone: y.string().min(7).max(13).required(),
  password: y.string().min(8),
});

type FormValues = y.InferType<typeof schema>;

const RegisterForm: FC = () => {
  const [register] = useMutation<ProfileContext, { input: FormValues }>(gql`
    mutation RegisterUser($input: RegisterUserInput!) {
      registerUser(input: $input) {
        id
      }
    }
  `);
  const form: FormProps<FormValues> = {
    initialValues: {
      firstName: '',
      lastName: '',
      phone: '',
      password: '',
    },
    labels: {
      firstName: 'First Name',
      lastName: 'Last Name',
      phone: 'Phone Number',
      password: 'Password',
    },
    title: 'Register',
    submitText: 'Register',
    validateOnBlur: true,
    validationSchema: schema,
    onSubmit: form => register({ variables: { input: form } }),
  };

  return <Form {...form} />;
};

export default RegisterForm;

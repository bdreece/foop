import type { FC } from 'react';
import type { AccessContext } from '../providers/AccessProvider';
import type { FormProps } from '../form';

import * as y from 'yup';
import { gql, useApolloClient, useMutation } from '@apollo/client';
import Form from '../form';

const schema = y.object({
  phone: y
    .string()
    .min(7, 'Phone number must be at least 7 characters')
    .max(13, 'Phone number must be at most 13 characters')
    .required('Phone number is required'),
  password: y
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

type FormValues = y.InferType<typeof schema>;

const LoginForm: FC = () => {
  const client = useApolloClient();
  const [login] = useMutation<
    { loginUser: AccessContext },
    { input: FormValues }
  >(
    gql`
      mutation Login($input: LoginUserInput!) {
        loginUser(input: $input) {
          accessToken
          expiresIn
        }
      }
    `,
    {
      onCompleted: ({ loginUser }) => {
        sessionStorage.setItem('AccessToken', JSON.stringify(loginUser));
        client.refetchQueries({
          include: ['RefreshUser', 'Self'],
        });
      },
    },
  );

  const form: FormProps<FormValues> = {
    initialValues: {
      phone: '',
      password: '',
    },
    labels: {
      phone: 'Phone Number',
      password: 'Password',
    },
    title: 'Login',
    submitText: 'Login',
    validationSchema: schema,
    validateOnBlur: true,
    onSubmit: form => login({ variables: { input: form } }),
  };

  return <Form {...form} />;
};

export default LoginForm;

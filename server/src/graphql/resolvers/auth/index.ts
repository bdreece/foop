import LoginResolver from './login';
import LogoutResolver from './logout';
import RegisterResolver from './register';
import RefreshResolver from './refresh';
import SelfResolver from './self';

const authResolvers = [
  LoginResolver,
  LogoutResolver,
  RegisterResolver,
  RefreshResolver,
  SelfResolver,
];

export default authResolvers;

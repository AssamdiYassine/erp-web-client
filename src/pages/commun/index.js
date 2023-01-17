import Register from './auth/register';
import Login from './auth/login';
import ForgotPassword from './auth/forgot_password';
import NewPassword from './auth/new_password';
import Welcome from './auth/check_email';
import ErrorPage from './error';

const Commun = {
  Register, 
  Login, 
  ForgotPassword,
  NewPassword,
  ErrorPage,
  Welcome
}

export default Commun;
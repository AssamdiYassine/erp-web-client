//Requires
import axios from "axios";


//Base Url
export const HOST_URL = 'http://localhost:3902/v1/api';

//Auth
export const LOGIN_URL = HOST_URL+"/auth/login";
export const REGISTER_URL = HOST_URL+"/auth/register";
export const GOOGLE_LOGIN_URL = HOST_URL+"/auth/google/login";
export const GOOGLE_SIGNUP_URL = HOST_URL+"/auth/google/signup";
export const AUTH_AUTHORIZED = HOST_URL+"/users/authorized";
export const REQUEST_PASSWORD_URL = HOST_URL+"/users/forgot-password";
export const RESET_PASSWORD_URL = HOST_URL+"/users/reset-password";

//Auth Funcs
export function LoginFunc(values) {
  return axios.post(LOGIN_URL, values);
}

export function GoogleSigninFunc(access_token) {
  return axios.post(GOOGLE_LOGIN_URL, { access_token });
}

export function GoogleSignupFunc(access_token, country) {
  return axios.post(GOOGLE_SIGNUP_URL, { access_token, country });
}

export function RegisterFunc(fullname, email, password, country) {
  return axios.post(REGISTER_URL, { email, fullname, password, country });
}

export function AutorizedFunc(token) {
  return axios.get(AUTH_AUTHORIZED, { 
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': token }
  });
}

export function ForgotPswFunc(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function UpdatePswFunc(password, token) {
  return axios.post(RESET_PASSWORD_URL, { password }, { 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    }
  });
}

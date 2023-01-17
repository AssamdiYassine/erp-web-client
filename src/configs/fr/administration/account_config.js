//Requires
import axios from "axios";

//Base Url
import { HOST_URL } from "../constants";

//Siret Routes
export const SIRET_INFO_URL = HOST_URL+"/users/siret-info";

//Update Account infos Routes
export const UPDATE_ACCOUNT_URL = HOST_URL+"/users/update-account";
export const CANCEL_EMAIL_URL = HOST_URL+"/users/cancel-email";
export const UPDATE_EMAIL_URL = HOST_URL+"/users/verify-code-email";
export const UPDATE_PASSWORD_URL = HOST_URL+"/users/update-password";

//Upload Routes
export const UPLOAD_URL = "http://localhost:4001/api/upload"

//Siret Funcs
export function addSiretInfoFunc(token, params) {
  return axios.post(SIRET_INFO_URL, params, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    }
  });
}

//Update Account Personal Infos
export function updateAccountFunc(data, token) {
  return axios.post(UPDATE_ACCOUNT_URL, data, { 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    }
  });
}

//Cancel Email
export function cancelEmailFunc(token) {
  
  return axios.post(CANCEL_EMAIL_URL, {}, { 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    }
  });
}

//Update Email
export function updateEmailFunc(code, token) {
  
  return axios.post(UPDATE_EMAIL_URL, {code}, { 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    }
  });
}

//Upload Files
export function uploadFile(token, formData) {
  return axios.post(UPLOAD_URL, formData, {
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": token
    }
  })
}

//Update Password
export function updatePasswordFunc(data, token) {
  
  return axios.post(UPDATE_PASSWORD_URL, data, { 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    }
  });
}
